import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/ecomdb";

let client;

export const connectToMOngoDB = () => {
  MongoClient.connect(url)
    .then((clientInstance) => {
      client = clientInstance;
      console.log("Connecting to the MongoDB.....!");
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getDB = () => {
  return client.db();
};
