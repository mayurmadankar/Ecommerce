import { ApplicationError } from "../../middleware/applicantionError.middleware.js";
import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";

//hash the password npm i bcrypt
import bcrypt from "bcrypt";

export class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async signUp(req, res, next) {
    try {
      const { name, email, password, type } = req.body;

      //hash the password before sending the data
      const hashPassword = await bcrypt.hash(password, 12);

      // Check if the user is already registered
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        return res.status(400).send("User already registered.");
      }
      // Proceed with creating a new user
      const newUser = new UserModel(name, email, hashPassword, type);
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
      //1. find user by email
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        return res.status(400).send("Invalid Credentials");
      } else {
        //2. Compare user password with bcrypt password
        const result = await bcrypt.compare(password, user.password);
        if (result) {
          //3.create the token
          const token = jwt.sign(
            { userID: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          //4.return token to client
          return res.status(200).json({ token: token });
        } else {
          return res.status(400).send("Invalid Credentials");
        }
      }
    } catch (err) {
      console.log(err);
      next(new ApplicationError("Problem With sign In", 400));
    }
  }
}
