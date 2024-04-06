import { RequestHandler } from "express";
import { UserPayload, verifyToken } from "../services/jwt";
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}
export const currentUserHandler: RequestHandler = (req, res, next) => {
  if (!req.session?.jwt) {
    next();
  }
  try {
    const payload = verifyToken(req.session?.jwt!);
    req.currentUser = payload;
  } catch (err) {}

  next();
};
