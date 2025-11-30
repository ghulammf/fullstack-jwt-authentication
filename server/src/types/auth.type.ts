import { Role } from "@prisma/client";
import { Request } from "express";
// import { Role } from "./user.type";

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface RegisterResponse {
  username: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  user: {
    username: string;
    email: string;
    role: Role;
  };
  accessToken: string;
  refreshToken: string;
}

interface JwtPayload {
  username: string;
  email: string;
  role: Role;
}

interface AuthRequest extends Request {
  user?: JwtPayload;
}

export {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  JwtPayload,
  AuthRequest,
};
