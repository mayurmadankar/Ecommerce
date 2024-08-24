import "./env.js";

//1.import expres (third party import)
import express, { application } from "express";
import swagger from "swagger-ui-express";
import cors from "cors";

//internal import
import productRouter from "./src/features/product/product.routes.js";
import bodyParser from "body-parser";
import userRouter from "./src/features/user/user.routes.js";
//jwtAuth for whenever user want information they want to login through token
import jwtAuth from "./src/middleware/jwt.middleware.js";
import cartRouter from "./src/features/cart/cartitems.router.js";

import apiDocs from "./swagger.json" assert { type: "json" };

import loggerMiddleware from "./src/middleware/logger.middleware.js";
import { errorHandlerMiddleware } from "./src/middleware/applicantionError.middleware.js";

//import connectionn to the database
import { connectToMOngoDB } from "./src/config/mongodb.js";
import OrderRouter from "./src/features/order/order.routes.js";

//2.create serv`er
const server = express();

//CORS Policy Configuration
var corsOptions = {
  origin: "http://localhost:5500"
};

server.use(cors(corsOptions));

server.use(express.json());
//to parse the data from JSON format to req.body
server.use(bodyParser.json());

//swagger to render the API Documentation
server.use("/api-docs", swagger.serve, swagger.setup(apiDocs)); // here swagger.serve create the API

//middleware to log the data
server.use(loggerMiddleware);

//for all APIs of product,redirect to product productRouter
server.use("/api/products", jwtAuth, productRouter);
//for all APIs of cartItems are go from this cartRouter
server.use("/api/cartItems", jwtAuth, cartRouter);
//for all APIs of users,redirect to or from userRouter
server.use("/api/users", userRouter);
//for all APIs of OrderRouter,redirect from OrderRouter
server.use("/api/orders", jwtAuth, OrderRouter);

//3.Default request handler
server.get("/", (req, res) => {
  res.send("Welcome to Ecommerce APIs");
});

//Error Handling Middleware in Application Level
server.use(errorHandlerMiddleware); // from applicationError.middleware.js

//if any one routes or api not found from above then it runs -> 4.middleware
//4.Middleware to hande 404 requests
server.use((req, res) => {
  res
    .status(404)
    .send(
      "API IS NOT FOUND , Please check our API Documentation for more information at localhost:3000/api-docs"
    );
});

//5.specify port
server.listen(3000, () => {
  console.log("server is listening at port 3000");
  connectToMOngoDB();
});
