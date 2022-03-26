import { app } from "@shared/infra/http/app";
import request from "supertest";

describe("Authenticate User", () => {
    it("should be able authenticate user", async () => {
        const generateToken = await request(app)
        .post("/api/v1/sessions")
        .send({
            name: "auth",
            email: "auth@.com"
        })
        const { token, refresh_token } = generateToken.body;

        const response = await request(app)
        .post("/api/v1/sessions")
        .set({
            name: "auth",
            email: "auth@.com",
            authorization: `bearer: ${token}`,
            refresh_token: `refresh_token: ${refresh_token}`
        });

        expect(response).toBe(201);
    });

        it("should be received a token in header and return information from user authenticated", async () => {
            const headerToken = await request(app)
            .get("/api/v1/profile")

            const { token } = headerToken.header

            const response = request(app)
            .get("/api/v1/profile")
            .send({
                email: "guy@.com",
                name: "guy"
            })
            .set({
                authorization: `bearer: ${token}`
            });
            expect(response).toBe(201);
        });
    });