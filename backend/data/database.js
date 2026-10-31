import { MongoClient } from "mongodb";
import mongoose from "mongoose";

const url = process.env.DATABASE;
let database;

async function connectToMongoDB() {
  if (mongoose.connection.readyState === 1) {
    console.log("Using existing Mongoose connection");
    return;
  }
  try {
    database = await mongoose.connect(url, {
      serverSelectionTimeoutMS: 5000,
      retryWrites: true,
    });
    console.log("Connected to Mongoose successfully");
  } catch (error) {
    console.log(error);
  }
}

export { connectToMongoDB };
