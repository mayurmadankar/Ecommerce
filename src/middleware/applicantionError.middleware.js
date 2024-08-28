import mongoose from "mongoose";

export class ApplicationError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}
export const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).send(err.message);
  }
  if (err instanceof ApplicationError) {
    return res.status(err.code).json({ error: err.message });
  } else {
    res.status(500).send("oops! something went wrong...Try again later!");
  }
  next();
};
