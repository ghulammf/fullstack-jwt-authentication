import { Request } from "express";
import bcrypt from "bcrypt";
import validation from "../validations";
import { registerValidation } from "../validations/auth.validation";
import prisma from "../applications/database";
import { ResponseError } from "../middlewares/error.middleware";

const AuthServices = {
  register: async function (request: Request) {
    const user = validation(registerValidation, request);

    const isUserExist = await prisma.user.count({
      where: { username: user.username },
    });

    const isEmailExist = await prisma.user.count({
      where: { email: user.email },
    });

    if (isUserExist === 1)
      throw new ResponseError(400, "Username already available");
    if (isEmailExist === 1) throw new ResponseError(400, "Email already exist");

    const hashedPassword = await bcrypt.hash(user.password, 12);

    return prisma.user.create({
      data: {
        username: user.username,
        email: user.email,
        password: hashedPassword,
      },
    });
  },
};

export default AuthServices;
