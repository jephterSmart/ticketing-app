import request from "supertest";
import app from "../app";

export const validUser = {
  email: "kaskidsky@gmail.com",
  password: "Mobile*5star1",
};
export const signupUser = (
  user = { email: "kaskidsky@gmail.com", password: "Mobile*5star1" }
) => {
  return request(app).post("/api/users/signup").send(user);
};

export const signinUser = async (
  user = { email: "kaskidsky@gmail.com", password: "Mobile*5star1" }
) => {
  await signupUser(user);
  return request(app).post("/api/users/signin").send(user);
};
