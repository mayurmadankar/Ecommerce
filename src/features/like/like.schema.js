import mongoose, { mongo } from "mongoose";

export const likeSchema = mongoose
  .Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    likeable: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "types"
    },
    types: {
      type: String,
      enum: ["Product", "Category"]
    }
  })
  .pre("save", (next) => {
    console.log("New Like is Coming in");
    next();
  })
  .post("save", (doc) => {
    console.log("Like is Saved");
    console.log(doc);
  })
  .pre("find", (next) => {
    console.log("Retriving Likes");
    next();
  })
  .post("find", (docs) => {
    console.log("Find is completed");
    console.log(docs);
  });
