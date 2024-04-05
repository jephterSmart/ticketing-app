import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const router = Router();

router.post(
  "/api/users/sigin",
  [
    body("email").trim().isEmail().withMessage("Email is not valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .isStrongPassword()
      .withMessage(
        "Password is not strong enough, must contain number, lower and uppercase letters, and special characters"
      ),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    console.log(errors);
  }
);

export { router as signinRouter };
