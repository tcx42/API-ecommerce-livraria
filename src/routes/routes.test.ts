import supertest from "supertest";
import { describe } from "node:test";
import api from "../infra/api/api";

describe("Example initial test", () => {
    test("request /", async () => {
        const res = await supertest(api).get("/");
        expect(res.status).toBe(200);
    });
});
