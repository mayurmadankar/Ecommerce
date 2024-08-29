import { LikeRepository } from "./like.repository.js";

export class LikeController {
  constructor() {
    this.likeRepository = new LikeRepository();
  }
  async likeItems(req, res, next) {
    try {
      const { id, type } = req.body;
      const userId = req.userID;
      if (type != "Product" && type != "User") {
        return res.status(400).send("Invalid Type");
      }
      if (type == "Product") {
        this.likeRepository.likeProduct(userId, id);
      } else {
        this.likeRepository.likeCategory(userId, id);
      }
    } catch (err) {
      console.log(err);
      return res.status(400).send("Something went wrong");
    }
  }
}
