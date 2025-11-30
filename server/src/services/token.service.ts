import prisma from "../applications/database";
import { JwtPayload } from "../types/auth.type";
import TokenUtil from "../utils/token.util";

class TokenService {
  static async saveRefreshToken(
    username: string,
    token: string
  ): Promise<void> {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await prisma.refreshToken.create({
      data: {
        token: token,
        userId: username,
        expiresAt: expiresAt,
      },
    });
  }

  static async deleteRefreshToken(refreshToken: string): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: { token: refreshToken },
    });
  }

  static async findRefreshToken(refreshToken: string) {
    return prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });
  }

  static async deleteRefreshTokens(username: string): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: { userId: username },
    });
  }

  static async generateTokenPair(payload: JwtPayload) {
    const accessToken = TokenUtil.generateAccessToken(payload);
    const refreshToken = TokenUtil.generateRefreshToken(payload);

    await this.saveRefreshToken(payload.username, refreshToken);

    return { accessToken, refreshToken };
  }
}

export default TokenService;
