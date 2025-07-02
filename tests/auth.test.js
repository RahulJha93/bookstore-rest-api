import request from "supertest";
import app from "../index.js";

describe("Auth API", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/register")
      .send({ email: "testuser@example.com", password: "testpass123" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("email", "testuser@example.com");
  });

  it("should not register duplicate user", async () => {
    await request(app)
      .post("/register")
      .send({ email: "dupe@example.com", password: "pass" });
    const res = await request(app)
      .post("/register")
      .send({ email: "dupe@example.com", password: "pass" });
    expect(res.statusCode).toBe(409);
  });

  it("should login with correct credentials", async () => {
    await request(app)
      .post("/register")
      .send({ email: "login@example.com", password: "loginpass" });
    const res = await request(app)
      .post("/login")
      .send({ email: "login@example.com", password: "loginpass" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should not login with wrong credentials", async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "wrong@example.com", password: "wrongpass" });
    expect(res.statusCode).toBe(401);
  });
});
