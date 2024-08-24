import OrderRepository from "./order.repository.js";

export default class OrderController {
  constructor() {
    this.OrderRepository = new OrderRepository();
  }
  async placeOrder(req, res, next) {
    try {
      const userId = req.userID;
      await this.OrderRepository.placeOrder(userId);
      res.status(201).send("Order is Created");
    } catch (err) {
      console.log(err);
      return res.status(400).send("Something went wrong in the placeOrder");
    }
  }
}
