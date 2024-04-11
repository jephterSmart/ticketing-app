import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { validationHandler } from "../middlewares/validationHandler";
import { User } from "../models/user";
import { BadRequestError } from "../errors/BadRequestError";
import { signData } from "../services/jwt";
import { compare } from "../services/password";

const router = Router();

router.post(
  "/api/users/signin",
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
  validationHandler,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Email or password incorrect");
    }
    const passwordMatch = await compare(existingUser.password, password);

    if (!passwordMatch) {
      throw new BadRequestError("Email or password incorrect");
    }

    const jwt = signData({ email: existingUser.email, id: existingUser.id });
    req.session = {
      ...(req.session || {}),
      jwt,
    };
    return res.status(200).json({ data: existingUser });
  }
);

export { router as signinRouter };
