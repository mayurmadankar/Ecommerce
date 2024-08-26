import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const url = process.env.DB_URL;

export const connectUsingMongoose = () => {
  try {
    mongoose
      .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log("MongoDB connected using mongoose");
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};
