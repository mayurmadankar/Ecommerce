import UserModel from "../user/user.model.js";
import { ApplicationError } from "../../middleware/applicantionError.middleware.js";

class ProductModel {
  constructor(name, desc, price, imageUrl, category, sizes, id) {
    this._id = id;
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.imageUrl = imageUrl;
    this.category = category;
    this.sizes = sizes;
  }

  static getAll() {
    return products;
  }

  static add(product) {
    product.id = products.length + 1;
    products.push(product);
    return product;
  }

  static get(id) {
    const product = products.find((i) => i.id == id);
    return product;
  }

  static filter(minPrice, maxPrice, category) {
    const result = products.filter((product) => {
      return (
        (!minPrice || product.price >= parseFloat(minPrice)) &&
        (!maxPrice || product.price <= parseFloat(maxPrice)) &&
        (!category || product.category === category)
      );
    });
    return result;
  }
  static update(id, data) {
    const product = ProductModel.get(id);
    if (product) {
      Object.assign(product, data);
      return product;
    } else {
      return null;
    }
  }
  static delete(id) {
    const index = products.findIndex((i) => i.id == id);
    if (index != -1) {
      products.splice(index, 1);
    }
  }
  static rateProduct(userID, productID, rating) {
    // Find and validate user
    const user = UserModel.getAll().find((u) => u.id == userID);
    if (!user) {
      //user defined error
      throw new ApplicationError("User not Found", 404);
    }
    // Find the product
    const product = products.find((p) => p.id == productID);
    if (!product) {
      throw new ApplicationError("Product not Found", 400);
    }
    // Initialize the rating array if it doesn't exist
    if (!product.rating) {
      product.rating = [];
    }
    // Check if the user has already rated the product
    const existingRatingIndex = product.rating.findIndex(
      (r) => r.userID == userID
    );
    if (existingRatingIndex >= 0) {
      // Update the existing rating
      product.rating[existingRatingIndex].rating = rating;
    } else {
      // Add a new rating
      product.rating.push({ userID: userID, rating: rating });
    }
    return "Rating submitted successfully";
  }
}

const products = [
  new ProductModel(
    1,
    "Product 1",
    "Description for Product 1",
    19.99,
    "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg",
    "category1",
    ["S", "M", "L"]
  ),
  new ProductModel(
    2,
    "Product 2",
    "Description for Product 2",
    29.99,
    "https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg",
    "category2",
    ["S", "M", "XL"]
  ),
  new ProductModel(
    3,
    "Product 3",
    "Description for Product 3",
    39.99,
    "https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg",
    "category3",
    ["S", "M", "XL"]
  )
];

export default ProductModel;
