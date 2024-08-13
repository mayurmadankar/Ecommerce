import fs from "fs";

const fsPromises = fs.promises;

async function log(logData) {
  try {
    logData = `\n\n${new Date().toString()} - ${logData}`;
    await fsPromises.appendFile("log.txt", logData);
  } catch (err) {
    console.log(err);
  }
}
const loggerMiddleware = async (req, res, next) => {
  //1.log request body
  if (!req.url.includes("signin")) {
    const logData = `${req.url} - ${JSON.stringify(req.body)}`;
    await log(logData);
  }
  next();
};
export default loggerMiddleware;
