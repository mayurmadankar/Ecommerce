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
productRouter.get("/filter", productController.filterProducts);
productRouter.get("/", (req, res) => {
  productController.getAllProducts(req, res);
});
productRouter.post("/", upload.single("imageUrl"), (req, res) => {
  productController.addProduct(req, res);
});
productRouter.get("/:id", (req, res) => {
  productController.getOneProduct(res, res);
});
productRouter.put("/:id", productController.updateProduct);
productRouter.delete("/:id", productController.deleteProduct);
productRouter.post("/rate", productController.rateProduct);

export default productRouter;
