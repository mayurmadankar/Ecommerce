import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";

export class UserController {
  signUp(req, res) {
    const { name, email, password, type } = req.body;
    const newUser = UserModel.signUp(name, email, password, type);
    if (!newUser) {
      return res.status(400).send("user not exist");
    }
    res.status(201).send("success");
  }

  signIn(req, res) {
    const { email, password } = req.body;
    const result = UserModel.signIn(email, password);
    if (!result) {
      return res.status(400).send("Invalid Credentials");
    } else {
      //1.create the token
      const token = jwt.sign(
        { userID: result.id, email: result.email },
        "Np1feZQmW6aIC44XK4KFRBFoSbbwG4tL",
        { expiresIn: "1h" }
      );
      //2.return token to client
      return res.status(200).send(token);
    }
  }
}
