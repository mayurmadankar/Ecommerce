import { MongoClient } from "mongodb";

let client;
export const connectToMOngoDB = () => {
  MongoClient.connect(process.env.DB_URL)
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
