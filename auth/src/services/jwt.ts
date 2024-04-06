import jwt from "jsonwebtoken";

export interface UserPayload {
  email: string;
  id: string;
}

export const signData = (payload: UserPayload) => {
  return jwt.sign(payload, process.env.JWT_KEY!);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_KEY!) as UserPayload;
};
