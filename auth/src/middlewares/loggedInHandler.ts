import { RequestHandler } from "express";
import { NotAuthorizedError } from "../errors/NotAuthorizedError";

export const loggedInHandler: RequestHandler = (req, res, next) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }
  next();
};
