import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../middleware/applicantionError.middleware.js";
import mongoose from "mongoose";
import { productSchema } from "./product.schema.js";
import { reviewSchema } from "./review.schema.js";

const ProductModel = mongoose.model("Product", productSchema);
const ReviewModel = mongoose.model("Review", reviewSchema);

export default class ProductRepository {
  constructor() {
    this.collection = "products";
  }
  async add(newProduct) {
    try {
      //1.Get the DB
      const db = getDB();
      const collection = db.collection(this.collection);
      await collection.insertOne(newProduct);
      return newProduct;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
  async getAll() {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.find().toArray();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
  async get(id) {
    try {
      console.log(id);
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.findOne({ _id: new ObjectId(id) });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
  async filter(minPrice, categories) {
    try {
      const db = getDB();
      const collection = await db.collection(this.collection);
      let filterExpression = {};
      if (minPrice) {
        filterExpression.price = { $gte: parseFloat(minPrice) };
      }
      // if (maxPrice) {
      //   filterExpression.price = {
      //     ...filterExpression.price,
      //     $lte: parseFloat(maxPrice)
      //   };
      // }
      if (categories) {
        filterExpression = {
          $and: [{ categories: { $in: categories } }, filterExpression]
        };
        // filterExpression.category = category;
      }
      return collection
        .find(filterExpression)
        .project({ name: 1, price: 1, _id: 0, sizes: { $slice: 1 } })
        .toArray();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
  // rate the product it is easy way
  // async rateProduct(userID, productID, rating) {
  //   try {
  //     const db = getDB();
  //     const collection = db.collection(this.collection);
  //     //pull existing rating and update them
  //     await collection.updateOne(
  //       {
  //         _id: new ObjectId(productID)
  //       },
  //       {
  //         $pull: { ratings: { userID: new ObjectId(userID) } }
  //       }
  //     );
  //     //push the rating if there is no one
  //     await collection.updateOne(
  //       { _id: new ObjectId(productID) },
  //       { $push: { ratings: { userID: new ObjectId(userID), rating } } }
  //     );
  //   } catch (err) {
  //     console.log(err);
  //     throw new ApplicationError("Something went wrong with database", 500);
  //   }
  // }
  async rate(userID, productID, rating) {
    try {
      //1.check if product exists
      const productToUpdate = await ProductModel.findById(productID);
      if (!productToUpdate) {
        throw new Error("Product not found");
      }
      //2.Get the existing review
      const userReview = await ReviewModel.findOne({
        product: new ObjectId(productID),
        user: new ObjectId(userID)
      });
      if (userReview) {
        userReview.rating = rating;
        await userReview.save();
      } else {
        const newReview = new ReviewModel({
          product: new ObjectId(productID),
          user: new ObjectId(userID),
          rating: rating
        });
        newReview.save();
      }
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
  async averageProductPricePerCategory() {
    try {
      const db = getDB();
      await db
        .collection(this.collection)
        .aggregate([
          {
            //stage 1 : Get average price per category
            $group: { _id: "category", averagePrice: { $avg: "$price" } }
          }
        ])
        .toArray();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
}
