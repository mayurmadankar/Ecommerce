import { CartItemController } from "./cartitems.controller.js";
import express from "express";

//create the cartROuter
const cartRouter = express.Router();

//creating the instance of the class
const cartItemController = new CartItemController();

//Adding Routes
cartRouter.post("/", (req, res, next) => {
  cartItemController.add(req, res, next);
});
cartRouter.get("/", (req, res, next) => {
  cartItemController.get(req, res, next);
});
cartRouter.delete("/:id", (req, res, next) => {
  cartItemController.delete(req, res, next);
});

export default cartRouter;
