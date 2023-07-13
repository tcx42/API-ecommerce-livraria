import supertest from "supertest";
import { describe, mock } from "node:test";
import api from "../../../infra/api/api";
import Jwtoken from "../../../core/utils/jwtoken";
jest.mock("../../../repositories/user/user.repository");

describe("Admin User Routes", () => {
  const token = Jwtoken.generateToken({
    id: 1,
    name: "Alice",
    email: "alice@email.com",
    role: "admin",
  });
  const refreshToken = Jwtoken.generateRefreshToken("alice@email.com");
  test("Admin Signin", async () => {
    const res = await supertest(api).post("/admin/register").set("Cookie", [
      `jsonwebtoken=${token}`,
      `refreshtoken=${refreshToken}`,
    ]).set("content-type", "application/json").send({
      name: "Ademir",
      email: "ademir@email.com",
      password: "asdf1234",
    });
    expect(res.status).toBe(201);
  });
  test("Admin Signin no token", async () => {
    const res = await supertest(api).post("/admin/register").set(
      "content-type",
      "application/json",
    ).send({
      name: "Ademir",
      email: "ademir@email.com",
      password: "asdf1234",
    });
    expect(res.status).toBe(401);
  });
  test("Admin Signin wrong body", async () => {
    const res = await supertest(api).post("/admin/register").set("Cookie", [
      `jsonwebtoken=${token}`,
      `refreshtoken=${refreshToken}`,
    ]).set("content-type", "application/json").send({
      name: "Ademir",
      password: "asdf1234",
    });
    expect(res.status).toBe(400);
  });
  test("User data", async () => {
    const id = 1;
    const res = await supertest(api).get(`/admin/user/${id}`).set("Cookie", [
      `jsonwebtoken=${token}`,
      `refreshtoken=${refreshToken}`,
    ]);
    expect(res.status).toBe(200);
  });
});
