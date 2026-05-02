import mongoose from "mongoose";
import { env } from "./config.js";

let connectionPromise = null;

export async function connectToDatabase() {
  if (!env.mongoUri) {
    const error = new Error("MONGODB_URI is not configured in .env.");
    error.statusCode = 503;
    throw error;
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(env.mongoUri, {
        serverSelectionTimeoutMS: 5000,
      })
      .catch((error) => {
        connectionPromise = null;
        throw error;
      });
  }

  await connectionPromise;
  return mongoose.connection;
}
