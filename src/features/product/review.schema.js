import mongoose from "mongoose";

export const reviewSchema = new mongoose.Schema({
  Product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  rating: Number
});
