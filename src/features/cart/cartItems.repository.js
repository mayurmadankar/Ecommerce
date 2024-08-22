import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../middleware/applicantionError.middleware.js";

export default class CartItemsRepository {
  constructor() {
    this.collection = "CartItems";
  }
  //add cartItems to db
  async add(productID, userID, quantity) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const query = {
        productID: new ObjectId(productID),
        userID: new ObjectId(userID)
      };
      const update = { $inc: { quantity: quantity } };
      const options = { upsert: true };
      await collection.updateOne(query, update, options);
    } catch (err) {
      console.log(err);
      throw new ApplicationError(
        "Something went wrong in add cartIem database",
        500
      );
    }
  }
  async get(userID) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const result = await collection
        .find({ userID: new ObjectId(userID) })
        .toArray();
      return result;
    } catch (err) {
      console.log(err);
      throw new ApplicationError(
        "Something went wrong in get cartIem database",
        500
      );
    }
  }
  async delete(userID, cartItemId) {
    const db = getDB();
    const collection = db.collection(this.collection);
    const result = await collection.deleteOne({
      _id: new ObjectId(cartItemId),
      userID: new ObjectId(userID)
    });
    return result.deletedCount > 0;
  }
  catch(err) {
    console.log(err);
    throw new ApplicationError("Something went wrong in delete items", 500);
  }
}
