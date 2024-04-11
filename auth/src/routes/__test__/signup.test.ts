import { signupUser } from "../../test/helpers";
describe("Signup", () => {
  const validData = { email: "kaskidsky@gmail.com", password: "Mobile*5star1" };
  it("creates a user if a valid email and password is given", async () => {
    const response = await signupUser(validData);
    expect(response.status).toBe(201);
    expect(response.body.data.email).toEqual(validData.email);
  });
  describe("validations", () => {
    it("should return 400 error if an invalid email is given", async () => {
      const response = await signupUser({
        email: "kaskidsky",
        password: validData.password,
      });
      expect(response.status).toBe(400);
      expect(response.body.errors).toHaveLength(1);
    });
    it("should return 400 error if a strong password is not given", async () => {
      const response = await signupUser({
        email: validData.email,
        password: "password",
      });
      expect(response.status).toBe(400);
      expect(response.body.errors).toHaveLength(1);
    });
    it("should return 400 if either the email or password is not passed in ", async () => {
      const response1 = await signupUser({
        email: validData.email,
        password: "",
      });
      const response2 = await signupUser({
        email: "",
        password: validData.password,
      });
      const response3 = await signupUser({
        email: "",
        password: "",
      });

      expect(response1.status).toBe(400);
      expect(response2.status).toBe(400);
      expect(response3.status).toBe(400);
      expect(response1.body.errors).toHaveLength(1);
      expect(response2.body.errors).toHaveLength(1);
      expect(response3.body.errors).toHaveLength(2);
    });

    it("should return 400 for already existing user", async () => {
      await signupUser();
      const response = await signupUser();
      expect(response.status).toBe(400);
    });
  });
  it("gives set a cookie after a successful signup", async () => {
    const response = await signupUser();
    expect(response.get("Set-Cookie")).toBeDefined();
  });
});
