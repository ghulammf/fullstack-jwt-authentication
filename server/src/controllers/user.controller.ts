import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";

class UserController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getAll();
      return res.status(200).json({
        status: "success",
        message: "Users data have been successfully retrieved",
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const username: string = req.params.username;
      await UserService.delete(username);
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
