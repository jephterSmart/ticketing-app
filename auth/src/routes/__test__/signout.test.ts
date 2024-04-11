import request from "supertest";
import { signinUser } from "../../test/helpers";
import app from "../../app";

describe("Signout", () => {
  it("invalidates the token after signout", async () => {
    const resp = await signinUser();
    const response = await request(app)
      .get("/api/users/signout")
      .set("Cookie", resp.get("Set-Cookie") as any)
      .send();
    expect(response.status).toBe(204);
    expect(response.get("Set-Cookie")?.at(0)).toContain(
      "Thu, 01 Jan 1970 00:00:00 GMT;" // Means it is empty/invalidated
    );
  });
  it("only allows logged in user to call this endpoint", async () => {
    const response = await request(app).get("/api/users/signout").send();
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});
