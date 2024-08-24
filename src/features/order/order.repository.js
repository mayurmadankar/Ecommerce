import { ObjectId, Timestamp } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import OrderModel from "./order.model.js";
import { ApplicationError } from "../../middleware/applicantionError.middleware.js";

export default class OrderRepository {
  constructor() {
    this.collection = "orders";
  }
  async placeOrder(userId) {
    try {
      const db = getDB();

      //1. Get cartItems and calculate the total amounnt.
      const items = await this.getTotalAmount(userId);
      console.log(items);
      const finalTotalAmount = items.reduce(
        (acc, item) => acc + item.totalAmount,
        0
      );
      console.log(finalTotalAmount);

      //2. create an order record.
      const newOrder = new OrderModel(
        new ObjectId(userId),
        finalTotalAmount,
        new Date()
      );
      db.collection(this.collection).insertOne(newOrder);

      //3. Reduce the stock.(means reduce stock from products)
      for (let item of items) {
        await db
          .collection("products")
          .updateOne(
            { _id: item.productID },
            { $inc: { stock: -item.quantity } }
          );
      }

      //4. Clear the cart Items.
      await db.collection("cartItems").deleteMany({
        userId: new ObjectId(userId)
      });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong in placeOrder", 500);
    }
  }
  async getTotalAmount(userId) {
    const db = getDB();
    const items = await db
      .collection("cartItems")
      .aggregate([
        //1.Get cart items for the user
        {
          $match: { userID: new ObjectId(userId) }
        },
        //2.Get the product from products collection based on the productID from cartItems collections
        {
          $lookup: {
            from: "products",
            localField: "productID",
            foreignField: "_id",
            as: "productInfo"
          }
        },
        //3.unwind the productInfo
        {
          $unwind: "$productInfo"
        },
        //4.calculate totalAmount for each cartItems.
        //adding the addField into the cartitems document
        {
          $addFields: {
            totalAmount: { $multiply: ["$productInfo.price", "$quantity"] }
          }
        }
      ])
      .toArray();
    console.log(items);
    return items;
  }
}
