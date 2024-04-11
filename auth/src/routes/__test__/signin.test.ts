import request from "supertest";
import { signinUser, signupUser, validUser } from "../../test/helpers";
import app from "../../app";

describe("SignIn", () => {
  it("logged in existing user that provided valid credentials", async () => {
    await signupUser(validUser);
    const response = await request(app)
      .post("/api/users/signin")
      .send(validUser);
    expect(response.status).toBe(200);
  });
  describe("validations", () => {
    beforeEach(async () => {
      await signinUser(validUser);
    });
    it("returns 400 if the email is not a valid email", async () => {
      const response1 = await request(app)
        .post("/api/users/signin")
        .send({ password: validUser.password, email: "" });
      const response2 = await request(app)
        .post("/api/users/signin")
        .send({ password: validUser.password, email: "kaskidsky" });

      expect(response1.status).toBe(400);
      expect(response1.body.errors).toBeDefined();
      expect(response2.status).toBe(400);
      expect(response2.body.errors).toBeDefined();
    });
    it("returns 400 if the password is not a valid password", async () => {
      const response1 = await request(app)
        .post("/api/users/signin")
        .send({ email: validUser.email, password: "" });
      const response2 = await request(app)
        .post("/api/users/signin")
        .send({ email: validUser.email, password: "kaskidsky" });

      expect(response1.status).toBe(400);
      expect(response1.body.errors).toBeDefined();
      expect(response2.status).toBe(400);
      expect(response2.body.errors).toBeDefined();
    });

    it("returns 400 if an incorrect email or password is sent", async () => {
      const response1 = await request(app)
        .post("/api/users/signin")
        .send({ email: validUser.email, password: "Mobile*6star1" });
      const response2 = await request(app)
        .post("/api/users/signin")
        .send({ email: "mali@gmail.com", password: validUser.password });

      expect(response1.status).toBe(400);
      expect(response1.body.errors).toBeDefined();
      expect(response2.status).toBe(400);
      expect(response2.body.errors).toBeDefined();
    });
  });
  it("successfully logged in user should be given jwt via cookie", async () => {
    const response = await signinUser();
    expect(response.get("Set-Cookie")).toBeDefined();
  });
});
