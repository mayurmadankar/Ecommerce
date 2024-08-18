import { ApplicationError } from "../../middleware/applicantionError.middleware.js";
import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";

export class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async signUp(req, res, next) {
    try {
      const { name, email, password, type } = req.body;
      // Check if the user is already registered
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        return res.status(400).send("User already registered.");
      }
      // Proceed with creating a new user
      const newUser = new UserModel(name, email, password, type);
      await this.userRepository.signUp(newUser);

      res.status(201).json({ success: newUser });
    } catch (err) {
      console.log(err);
      next(new ApplicationError("Something is wrong in sign up", 500));
    }
  }

  async signIn(req, res, next) {
    const { email, password } = req.body;
    try {
      const result = await this.userRepository.signIn(email, password);
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
        return res.status(200).json({ token: token });
      }
    } catch (err) {
      console.log(err);
      next(new ApplicationError("Problem With sign In", 400));
    }
  }
}
