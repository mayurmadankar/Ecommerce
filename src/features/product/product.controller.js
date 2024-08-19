import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }
  async getAllProducts(req, res) {
    try {
      const products = await this.productRepository.getAll();
      res.status(200).send(products);
    } catch (err) {
      return res.status(200).send("Sommthing  went Wrong");
    }
  }

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
  rateProduct(req, res, next) {
    try {
      const { userID, productID, rating } = req.query;
      try {
        ProductModel.rateProduct(userID, productID, rating);
      } catch (err) {
        return res.status(400).send(err.message);
      }
      return res.status(200).send("Rating as been added");
    } catch (err) {
      console.log("passing error to middleware");
      next(err);
    }
  }
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

  filterProducts(req, res) {
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const category = req.query.category;
    const result = ProductModel.filter(minPrice, maxPrice, category);
    res.status(200).send(result);
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
