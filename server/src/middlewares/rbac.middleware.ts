import { Role } from "@prisma/client";
import { AuthRequest } from "../types/auth.type";
import { NextFunction, Response } from "express";
import { ResponseError } from "./error.middleware";

const authorize = (allowedRoles: Role[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) throw new ResponseError(401, "Authentication Required");

    if (!allowedRoles.includes(req.user.role)) {
      throw new ResponseError(403, "Insufficient permissions");
    }

    next();
  };
};

export default authorize;
