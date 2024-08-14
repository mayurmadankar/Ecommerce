export class ApplicationError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}
export const errorHandlerMiddleware = (err, req, res, next) => {
  // Write your code here
  if (err instanceof ApplicationError) {
    res.status(err.code).send(err.message);
  } else {
    res.status(500).send("oops! something went wrong...Try again later!");
  }
  next();
};
