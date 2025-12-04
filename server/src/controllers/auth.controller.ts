import { NextFunction, Request, Response } from "express";
import AuthService from "../services/auth.service";
import { ResponseError } from "../middlewares/error.middleware";

class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      // const {username, email, password, confirm_password} = req.body

      const data = await AuthService.register(req.body);

      return res.status(201).json({
        status: "success",
        message: "Register successfully",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AuthService.login(req.body);

      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true, // Wajib: Agar JS tidak bisa baca
        secure: false, // Wajib: Hanya HTTPS (false jika di localhost dev)
        sameSite: "strict", // Anti CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Hari
      });

      return res.status(200).json({
        status: "success",
        message: "Login successfully",
        user: data.user,
        accessToken: data.accessToken,
      });
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        throw new ResponseError(400, "Refresh Token is required");
      }
      await AuthService.logout(refreshToken);

      return res.status(200).json({
        status: "success",
        message: "Logout successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        throw new ResponseError(400, "Refresh Token Required!");
      }

      const tokens = await AuthService.refreshToken(refreshToken);

      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true, // Wajib: Agar JS tidak bisa baca
        secure: false, // Wajib: Hanya HTTPS (false jika di localhost dev)
        sameSite: "strict", // Anti CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Hari
      });

      return res.status(200).json({
        status: "success",
        message: "New accessToken retrieved successfully",
        accessToken: tokens.accessToken,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
