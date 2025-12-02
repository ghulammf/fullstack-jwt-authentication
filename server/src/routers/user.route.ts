import { Router } from "express";
import UserController from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/api/users/", UserController.getAll);
userRouter.delete("/api/users/username", UserController.delete);

export default userRouter;
