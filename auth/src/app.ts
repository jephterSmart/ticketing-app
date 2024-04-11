import { json } from "body-parser";
import express from "express";
import "express-async-errors";
import { config } from "dotenv";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { currentUserRouter } from "./routes/current-user";
import { errorHandler } from "./middlewares/errorHandler";
import { NotFoundError } from "./errors/NotFoundError";
import cookieSession from "cookie-session";
import { signoutRouter } from "./routes/signout";

config();

const app = express();
app.set("trust proxy", true);

app.use(
  cookieSession({
    secure: process.env.NODE_ENV !== "test",
    signed: false,
  })
);
app.use(json());

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);
app.all("*", (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export default app;
