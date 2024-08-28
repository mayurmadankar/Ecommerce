import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    match: [/.+\@.+\../, "Please enter the valid email"]
  },
  password: {
    type: String,
    validate: {
      validator: function (value) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        );
      },
      message:
        "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character."
    }
  },
  type: { type: String, enum: ["Customer", "Seller"] }
});
