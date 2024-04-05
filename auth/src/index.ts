import { json } from "body-parser";
import { debuglog } from "util";
import express from "express";
import "express-async-errors";
import { config } from "dotenv";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { currentUserRouter } from "./routes/current-user";
import { errorHandler } from "./middlewares.ts/errorhandler";
import { NotFoundError } from "./errors/NotFoundError";

config();

const logger = debuglog("app");
const APPLICATION_PORT = process.env.APPLICATION_PORT || 4000;
const app = express();

app.use(json());

app.use(signupRouter);
app.use(signinRouter);
app.use(currentUserRouter);
app.use("*", (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);
app.listen(APPLICATION_PORT, () => {
  logger("Listening on port", APPLICATION_PORT);
});
