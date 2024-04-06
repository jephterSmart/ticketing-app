import { debuglog } from "util";
import { Express } from "express";
import mongoose from "mongoose";

import app from "./app";

const logger = debuglog("app");
const APPLICATION_PORT = process.env.APPLICATION_PORT || 4000;
async function start(app: Express) {
  if (!process.env.JWT_KEY) {
    throw new Error("Kindly provide JWT_KEY as environment variable");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    logger("Database Up");
  } catch (err) {
    console.error(err);
  }
  app.listen(APPLICATION_PORT, () => {
    logger("Listening on port", APPLICATION_PORT);
  });
}

start(app);
