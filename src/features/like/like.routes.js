import express from "express";
import { LikeController } from "./like.controller.js";

const LikeRouter = express.Router();

const likecontroller = new LikeController();

LikeRouter.post("/", (req, res, next) => {
  likecontroller.likeItems(req, res, next);
});

export default LikeRouter;
