import supertest from "supertest";
import { describe } from "node:test";
import api from "../../../infra/api/api";
import Jwtoken from "../../../core/utils/jwtoken";

describe("Admin User Routes", () => {
  test("Admin Signin", async () => {
    const token = Jwtoken.generateToken({
      id: 1,
      name: "Alice",
      email: "alice@email.com",
      role: "admin",
    });
    const res = await supertest(api).post("/admin/register").set(
      "Authorization",
      `Bearer ${token}`,
    ).set("content-type", "application/json").send({
      name: "Ademir",
      email: "ademir@email.com",
      password: "asdf1234",
    });
    expect(res.status).toBe(201);
  });
});
