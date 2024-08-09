//To manage routes/paths to productController

//1.import express
import express from "express";
import ProductController from "./product.controller.js";
import {upload} from '../../middleware/fileupload.middleware.js'

//2.routes
const productRouter = express.Router();

const productController=new ProductController();

//all the paths to the controller method
//localhpst/api/products
productRouter.get('/filter',productController.filterProducts);
productRouter.get('/',productController.getAllProducts);
productRouter.post('/', upload.single('imageUrl'), productController.addProduct);
productRouter.get('/:id',productController.getOneProduct);
productRouter.put('/:id',productController.updateProduct);
productRouter.delete('/:id',productController.deleteProduct);
productRouter.post('/rate',productController.rateProduct);

export default productRouter;