import request from "supertest";
import app from "../index.js";

describe("Books API", () => {
  let token;
  let bookId;

  beforeAll(async () => {
    await request(app)
      .post("/register")
      .send({ email: "bookuser@example.com", password: "bookpass" });
    const res = await request(app)
      .post("/login")
      .send({ email: "bookuser@example.com", password: "bookpass" });
    token = res.body.token;
  });

  it("should not allow unauthenticated access", async () => {
    const res = await request(app).get("/books");
    expect(res.statusCode).toBe(401);
  });

  it("should create a book", async () => {
    const res = await request(app)
      .post("/books")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Book",
        author: "Test Author",
        genre: "Test Genre",
        publishedYear: 2024,
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    bookId = res.body.id;
  });

  it("should list books with pagination", async () => {
    const res = await request(app)
      .get("/books?page=1&limit=2")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("books");
    expect(Array.isArray(res.body.books)).toBe(true);
  });

  it("should get a book by ID", async () => {
    const res = await request(app)
      .get(`/books/${bookId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", bookId);
  });

  it("should update a book by ID", async () => {
    const res = await request(app)
      .put(`/books/${bookId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Updated Title" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("title", "Updated Title");
  });

  it("should delete a book by ID", async () => {
    const res = await request(app)
      .delete(`/books/${bookId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Book deleted.");
  });
});
