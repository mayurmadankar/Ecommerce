import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";

export default class OrderRepository {
  constructor() {
    this.collection = "orders";
  }
  async placeOrder(userId) {
    //1. Get cartItems and calculate the total amounnt.
    await this.getTotalAmount(userId);
    //2. create an order record.
    //3. Reduce the stock.
    //4. Clear the cart Items.
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
  }
}
