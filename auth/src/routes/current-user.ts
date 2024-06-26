import { Router, Request, Response } from "express";
import { currentUserHandler } from "../middlewares/currentUserHandler";
import { loggedInHandler } from "../middlewares/loggedInHandler";
import { User } from "../models/user";

const router = Router();

router.get(
  "/api/users/current-user",
  currentUserHandler,
  loggedInHandler,
  async (req: Request, res: Response) => {
    const { currentUser } = req;
    const user = await User.findOne({ email: currentUser?.email });
    res.status(200).json({ data: user });
  }
);

export { router as currentUserRouter };
