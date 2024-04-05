import { Router, Request, Response } from "express";

const router = Router();

router.get(
  "/api/users/current-user",

  (req: Request, res: Response) => {
    res.send("Hi, I am a user");
  }
);

export { router as currentUserRouter };
