import { Router, Request, Response } from "express";
import { currentUserHandler } from "../middlewares/currentUserHandler";
import { loggedInHandler } from "../middlewares/loggedInHandler";

const router = Router();

router.get(
  "/api/users/signout",
  currentUserHandler,
  loggedInHandler,
  async (req: Request, res: Response) => {
    req.session = null;
    return res.status(204).json({ data: {} });
  }
);

export { router as signoutRouter };
