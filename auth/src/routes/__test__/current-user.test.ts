import request from "supertest";
import { signinUser, validUser } from "../../test/helpers";
import app from "../../app";

describe("Logged In User", () => {
  it("Get the user it details", async () => {
    const resp = await signinUser(validUser);
    const response = await request(app)
      .get("/api/users/current-user")
      .set("Cookie", resp.get("Set-Cookie") as any)
      .send();
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty("email");
  });

  it("returns 401 if user is not logged in", async () => {
    const response = await request(app).get("/api/users/current-user").send();
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});
