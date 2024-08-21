import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../middleware/applicantionError.middleware.js";
// import { parse } from "dotenv";

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
  async filter(minPrice, maxPrice, category) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      let filterExpression = {};
      if (minPrice) {
        filterExpression.price = { $gte: parseFloat(minPrice) };
      }
      if (maxPrice) {
        filterExpression.price = {
          ...filterExpression.price,
          $lte: parseFloat(maxPrice)
        };
      }
      if (category) {
        filterExpression.category = category;
      }
      return collection.find(filterExpression).toArray();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
  // async rateProduct(userID, productID, rating) {
  //   try {
  //     const db = getDB();
  //     const collection = db.collection(this.collection);
  //     //1.find the product
  //     const product = await collection.findOne({
  //       _id: new ObjectId(productID)
  //     });
  //     //2.find the ratings
  //     const userRating = product?.ratings?.find((r) => r.userID == userID);
  //     if (userRating) {
  //       await collection.updateOne(
  //         {
  //           _id: new ObjectId(productID),
  //           "ratings.userID": new ObjectId(userID)
  //         },
  //         { $set: { "ratings.$.rating": rating } }
  //       );
  //     } else {
  //       await collection.updateOne(
  //         { _id: new ObjectId(productID) },
  //         { $push: { ratings: { userID: new ObjectId(userID), rating } } }
  //       );
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     throw new ApplicationError("Something went wrong with database", 500);
  //   }
  // }

  // rate the product it is easy way
  async rateProduct(userID, productID, rating) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      //pull existing rating and update them
      await collection.updateOne(
        {
          _id: new ObjectId(productID)
        },
        {
          $pull: { ratings: { userID: new ObjectId(userID) } }
        }
      );
      //push the rating if there is no one
      await collection.updateOne(
        { _id: new ObjectId(productID) },
        { $push: { ratings: { userID: new ObjectId(userID), rating } } }
      );
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
}
