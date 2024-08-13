import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  // 1. Read the token from the 'Authorization' header
  const token = req.headers["authorization"];

  // 2. If no token, return an error
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  // 3. Check if the token is valid
  try {
    const payload = jwt.verify(token, "Np1feZQmW6aIC44XK4KFRBFoSbbwG4tL");
    console.log(payload);

    // Attach the payload to the request object for use in the next middleware
    req.userID = payload.userID; // <- this is best way to secure your application

    // 5. Call next middleware
    next();
  } catch (err) {
    // 4. Return error
    console.error("Invalid token", err);
    res.status(401).send("Unauthorized");
  }
};

export default jwtAuth;
