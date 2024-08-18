import express from "express";
import { UserController } from "./user.controller.js";

const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/signup", (req, res, next) => {
  userController.signUp(req, res, next);
});
userRouter.post("/signin", (req, res, next) => {
  userController.signIn(req, res, next);
});

export default userRouter;
