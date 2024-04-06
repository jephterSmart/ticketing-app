import { ErrorRequestHandler } from "express";
import { CustomError } from "../errors/CustomError";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ errors: err.serializeError() });
  }
  console.error(err);
  res.status(500).send("Something went wrong!");
};
