import express from "express";
import OrderController from "./order.controller.js";

//initialize the express Router
const OrderRouter = express.Router();
//create the instance of the ordercontroller
const ordercontroller = new OrderController();

OrderRouter.post("/", (req, res, next) => {
  ordercontroller.placeOrder(req, res, next);
});

export default OrderRouter;
