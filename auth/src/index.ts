import { json } from "body-parser";
import { debuglog } from "util";
import express from "express";
import { config } from "dotenv";

config();

const logger = debuglog("app");
const APPLICATION_PORT = process.env.APPLICATION_PORT || 4000;
const app = express();

app.use(json());

app.get("/api/users/current-user", (req, res) => {
  console.log("Got Here1");
  res.send("Hi, I am a user");
});

app.listen(APPLICATION_PORT, () => {
  logger("Listening on port", APPLICATION_PORT);
});
