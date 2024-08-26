import mongoose from "mongoose";

export const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  description: String,
  inStock: Number
});
