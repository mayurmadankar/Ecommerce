import UserModel from "../features/user/user.model.js";

const basicAuthorizer = (req, res, next) => {
  //1. Check if authorization header is empty.
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    // status code 404 means request is unauthorized
    return res.status(401).send("No authorization details found");
  }
  console.log(authHeader);

  //2.Extract Credentials. [Basic fghjklhhgfxcghgjh]
  const base64Credentials = authHeader.replace("Basic", "");
  console.log(base64Credentials);

  //3.Decoding the Credentials
  const decodedCreds = Buffer.from(base64Credentials, "base64").toString(
    "utf8"
  );
  console.log(decodedCreds); //[username:password]
  //creds contains the
  const creds = decodedCreds.split(":");

  // checking that is present for not
  const user = UserModel.getAll().find(
    (u) => u.email == creds[0] && u.password == creds[1]
  );
  if (user) {
    next();
  } else {
    return res.status(401).send("Incorrect Credentials");
  }
};

export default basicAuthorizer;
