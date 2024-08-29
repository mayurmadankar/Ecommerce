import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";
import { ObjectId } from "mongodb";
import { ApplicationError } from "../../middleware/applicantionError.middleware.js";

const LikeModel = mongoose.model("Like", likeSchema);

export class LikeRepository {
  async likeProduct(userId, productId) {
    try {
      const newLike = new LikeModel({
        user: new ObjectId(userId),
        likeable: new ObjectId(productId),
        types: "Product"
      });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong in Database", 500);
    }
  }
  async likeCategory(userId, CategoryId) {
    try {
      const newLike = new LikeModel({
        user: new ObjectId(userId),
        likeable: new ObjectId(CategoryId),
        types: "Category"
      });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong in Database", 500);
    }
  }
}
