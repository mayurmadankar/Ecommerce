import { CartItemController } from "./cartitems.controller.js";
import express from "express";

//create the cartROuter
const cartRouter=express.Router();

//creating the instance of the class
const cartItemController =new CartItemController();

//Adding Routes
cartRouter.post('/',cartItemController.add);
cartRouter.get('/',cartItemController.get);
cartRouter.delete('/:id',cartItemController.delete);

export default cartRouter;