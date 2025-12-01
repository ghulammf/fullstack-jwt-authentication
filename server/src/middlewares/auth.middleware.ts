import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/auth.type";
import { ResponseError } from "./error.middleware";
import TokenUtil from "../utils/token.util";

const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer

    if (!token) throw new ResponseError(401, "Access token required");

    const decoded = TokenUtil.verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;
