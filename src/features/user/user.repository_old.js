import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../middleware/applicantionError.middleware.js";

class UserRepository {
  constructor() {
    this.collection = "users";
  }
  //to check the existing user
  async findByEmail(email) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const user = await collection.findOne({ email });
      return user;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Error while checking email in database", 500);
    }
  }
  //to push the sign up data in database
  async signUp(newUser) {
    try {
      // 1. Get the database
      const db = getDB();
      // 2. Get the collection
      const collection = db.collection(this.collection);
      // 3. Insert the document into the collection
      await collection.insertOne(newUser);
      return newUser;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
  //to sign in the user
  async signIn(email, password) {
    try {
      // 1. Get the database
      const db = getDB();
      // 2. Get the collection
      const collection = db.collection(this.collection);
      // 3. Insert the document into the collection
      return await collection.findOne({ email, password });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Error during sign in", 500);
    }
  }
}
export default UserRepository;
