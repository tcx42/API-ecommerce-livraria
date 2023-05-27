import supertest from "supertest";
import { describe } from "node:test";
import api from "../infra/api/api";

describe("Health check Route", () => {
    test("request /health", async () => {
        const res = await supertest(api).get("/health");
        expect(res.status).toBe(200);
    });
});
