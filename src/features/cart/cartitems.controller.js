import CartItemsRepository from "./cartItems.repository.js";

export class CartItemController {
  constructor() {
    this.cartItemRepositoy = new CartItemsRepository();
  }
  async add(req, res) {
    try {
      const { productID, quantity } = req.body;
      //userID is comming form jwt Middleware
      const userID = req.userID;
      await this.cartItemRepositoy.add(productID, userID, quantity);
      res.status(201).send("Cart is updated");
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong in add items");
    }
  }
  async get(req, res) {
    try {
      const userID = req.userID;
      const items = await this.cartItemRepositoy.get(userID);
      return res.status(200).send(items);
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong in the get items");
    }
  }
  async delete(req, res) {
    const userID = req.userID;
    const cartItemID = req.params.id;
    const isDeleted = await this.cartItemRepositoy.delete(userID, cartItemID);
    if (!isDeleted) {
      return res.status(404).send("Item is not found");
    }
    return res.status(200).send("cart items is removed");
  }
}
