import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../middleware/applicantionError.middleware.js";

export default class UserModel {
  constructor(name, email, password, type, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
    this._id = id;
  }

  static getAll() {
    return users;
  }
}
let users = [
  {
    id: 1,
    name: "Seller user",
    email: "seller@com.com",
    password: "Password1",
    type: "seller"
  },
  {
    id: 2,
    name: "Customer user",
    email: "customer@com.com",
    password: "Password2",
    type: "customer"
  }
];
