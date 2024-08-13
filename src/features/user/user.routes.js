import express from "express";
import { UserController } from "./user.controller.js";

const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/signup", userController.signUp);
userRouter.post("/signin", userController.signIn);

export default userRouter;
