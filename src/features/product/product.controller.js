import ProductRepository from "./product.repository.js";
import ProductModel from "./product.model.js";
class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }
  //integrated with mongodb and product.repository.js
  async getAllProducts(req, res) {
    try {
      const products = await this.productRepository.getAll();
      res.status(200).send(products);
    } catch (err) {
      return res.status(200).send("Sommthing  went Wrong");
    }
  }
  //integrated with mongodb and product.repository.js
  async addProduct(req, res) {
    try {
      const { name, price, sizes } = req.body;
      const newProduct = new ProductModel(
        name,
        null,
        parseFloat(price),
        req.file.filename,
        null,
        sizes.split(",")
      );
      const createdProduct = await this.productRepository.add(newProduct);
      res.status(201).send(createdProduct);
    } catch (err) {
      console.log(err);
      res.status(400).send("Something went wrong");
    }
  }
  async rateProduct(req, res, next) {
    try {
      // const { userID, productID, rating } = req.query;
      const userID = req.userID;
      const productID = req.body.productID;
      const rating = req.body.rating;

      await this.productRepository.rate(userID, productID, rating);
      return res.status(200).send("Rating as been added");
    } catch (err) {
      console.log("passing error to middleware");
      next(err);
    }
  }
  //integrated with mongodb and product.repository.js
  async getOneProduct(req, res) {
    try {
      const id = req.params.id;
      const product = await this.productRepository.get(id);
      if (!product) {
        res.status(404).send("Product not found");
      } else {
        return res.status(200).send(product);
      }
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }
  //integrated with mongodb and product.repository.js
  async filterProducts(req, res) {
    try {
      const minPrice = req.query.minPrice;
      // const maxPrice = req.query.maxPrice;
      const categories = req.query.categories;
      const result = await this.productRepository.filter(
        minPrice,
        // maxPrice,
        categories
      );
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }
  async averagePrice(req, res, next) {
    try {
      const result =
        await this.productRepository.averageProductPricePerCategory();
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      return res.status(400).send("Something went wrong in the average Proce ");
    }
  }

  updateProduct(req, res) {
    const updated = ProductModel.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).send("Product not Found for Update Operation");
    } else {
      res.status(201).send(updated);
    }
  }
  deleteProduct(req, res) {
    ProductModel.delete(req.params.id);
    res.status(201).send("Product Deleted");
  }
}

export default ProductController;
