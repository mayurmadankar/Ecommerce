import mongoose from "mongoose";
import { userSchema } from "./user.Schema.js";
import { ApplicationError } from "../../middleware/applicantionError.middleware.js";

//creating the model from schema
const UserModel = mongoose.model("User", userSchema);

export default class UserRepository {
  async signUp(user) {
    try {
      //create the instance of the userModel
      const newUser = new UserModel(user);
      await newUser.save();
      return newUser;
    } catch (err) {
      console.log(err);
      if (err instanceof mongoose.Error.ValidationError) {
        throw err;
      } else {
        throw new ApplicationError("Something went wrong with database", 500);
      }
    }
  }
  async signIn(email, password) {
    try {
      return await UserModel.findOne(email, password);
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
  async findByEmail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Error while checking email in database", 500);
    }
  }
  async resetPassword(newPassword, userID) {
    try {
      let user = await UserModel.findById(userID);
      if (user) {
        user.password = newPassword;
        user.save();
      } else {
        throw new Error("User not found");
      }
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Error while checking email in database", 500);
    }
  }
}
