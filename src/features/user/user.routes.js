import express from "express";
import { UserController } from "./user.controller.js";
import loggerMiddleware from "../../middleware/logger.middleware.js"; // Import the logger middleware

const userRouter = express.Router();
const userController = new UserController();

// Apply the logger middleware and then proceed to the controller methods
userRouter.post("/signup", loggerMiddleware, (req, res, next) => {
  userController.signUp(req, res, next);
});

userRouter.post("/signin", loggerMiddleware, (req, res, next) => {
  userController.signIn(req, res, next);
});

export default userRouter;
