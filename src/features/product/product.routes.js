//To manage routes/paths to productController

//1.import express
import express from "express";
import ProductController from "./product.controller.js";
import { upload } from "../../middleware/fileupload.middleware.js";

//2.routes
const productRouter = express.Router();

const productController = new ProductController();

//all the paths to the controller method
//localhost/api/products
productRouter.get("/filter", (req, res) => {
  productController.filterProducts(req, res);
});
productRouter.post("/rate", (req, res) => {
  productController.rateProduct(req, res);
});
productRouter.get("/", (req, res) => {
  productController.getAllProducts(req, res);
});
productRouter.post("/", upload.single("imageUrl"), (req, res) => {
  productController.addProduct(req, res);
});
productRouter.get("/averagePrice", (req, res, next) => {
  productController.averagePrice(req, res, next);
});
productRouter.get("/:id", (req, res) => {
  productController.getOneProduct(res, res);
});
productRouter.put("/:id", productController.updateProduct);
productRouter.delete("/:id", productController.deleteProduct);

export default productRouter;
