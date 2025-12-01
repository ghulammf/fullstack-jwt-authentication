import validation from "../validations";
import {
  loginValidation,
  registerValidation,
} from "../validations/auth.validation";
import prisma from "../applications/database";
import { ResponseError } from "../middlewares/error.middleware";
import {
  AuthTokens,
  JwtPayload,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../types/auth.type";
import PasswordUtil from "../utils/password.util";
import TokenService from "./token.service";

class AuthService {
  static async register(userData: RegisterRequest): Promise<RegisterResponse> {
    const user: RegisterRequest = validation(registerValidation, userData);

    const isUserExist = await prisma.user.count({
      where: { username: user.username },
    });

    const isEmailExist = await prisma.user.count({
      where: { email: user.email },
    });

    if (isUserExist === 1)
      throw new ResponseError(400, "Username already exist");
    if (isEmailExist === 1) throw new ResponseError(400, "Email already exist");

    const hashedPassword = await PasswordUtil.hash(user.password);

    return await prisma.user.create({
      data: {
        username: user.username,
        email: user.email,
        password: hashedPassword,
      },
      select: {
        username: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  static async login(userData: LoginRequest): Promise<LoginResponse> {
    const user: LoginRequest = validation(loginValidation, userData);

    const userInDb = await prisma.user.findUnique({
      where: { username: user.username },
    });
    if (!userInDb)
      throw new ResponseError(400, "Username or Password is wrong!");

    const validPassword: boolean = await PasswordUtil.compare(
      user.password,
      userInDb.password
    );
    if (!validPassword)
      throw new ResponseError(400, "Username or Password is wrong!");

    const payload: JwtPayload = {
      username: userInDb.username,
      email: userInDb.email,
      role: userInDb.role,
    };

    const { accessToken, refreshToken } = await TokenService.generateTokenPair(
      payload
    );

    return {
      user: {
        username: userInDb.username,
        email: userInDb.email,
        role: userInDb.role,
      },
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  static async logout(refreshToken: string): Promise<void> {
    await TokenService.deleteRefreshToken(refreshToken);
  }

  static async refreshToken(refreshToken: string): Promise<AuthTokens> {
    const tokenInDb = await TokenService.findRefreshToken(refreshToken);

    if (!tokenInDb || new Date() > tokenInDb.expiresAt) {
      throw new ResponseError(401, "Invalid or expired refresh token");
    }

    await TokenService.deleteRefreshToken(refreshToken);

    const payload: JwtPayload = {
      username: tokenInDb.user.username,
      email: tokenInDb.user.email,
      role: tokenInDb.user.role,
    };

    return TokenService.generateTokenPair(payload);
  }
}

export default AuthService;
