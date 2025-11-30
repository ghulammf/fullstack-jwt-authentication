import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/auth.type";
import { jwtConfig } from "../configs/jwt.config";

class TokenUtil {
  static generateAccessToken(payload: JwtPayload): string {
    return jwt.sign(payload, jwtConfig.access.secret, {
      expiresIn: jwtConfig.access.expiresIn,
    });
  }

  static generateRefreshToken(payload: JwtPayload): string {
    return jwt.sign(payload, jwtConfig.refresh.secret, {
      expiresIn: jwtConfig.refresh.expiresIn,
    });
  }

  static verifyAccessToken(token: string): JwtPayload {
    return jwt.verify(token, jwtConfig.access.secret) as JwtPayload;
  }

  static verifyRefreshToken(token: string): JwtPayload {
    return jwt.verify(token, jwtConfig.refresh.secret) as JwtPayload;
  }

  static decodeToken(token: string): JwtPayload | null {
    try {
      return jwt.decode(token) as JwtPayload;
    } catch {
      return null;
    }
  }
}

export default TokenUtil;
