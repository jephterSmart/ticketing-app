import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import { BadRequestError } from "../errors/BadRequestError";
import { validationHandler } from "../middlewares/validationHandler";
import { signData } from "../services/jwt";

const router = Router();

router.post(
  "/api/users/signup",
  [
    body("email").trim().isEmail().withMessage("Email is not valid"),
    body("password")
      .trim()
      .bail()
      .isStrongPassword()
      .withMessage(
        "Password is not strong enough, must contain number, lower and uppercase letters, and special characters"
      ),
  ],
  validationHandler,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("Email already exist on platform");
    }
    const newUser = User.build({ email, password });
    await newUser.save();
    const jwt = signData({ email: newUser.email, id: newUser.id });
    req.session = {
      ...(req.session || {}),
      jwt,
    };
    return res.status(201).json({ data: newUser });
  }
);

export { router as signupRouter };
