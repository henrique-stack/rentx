import { app } from "@shared/infra/http/app";
import request from "supertest";

describe("Create User", () => {
    it("POST /users", async () => {
        const user = request(app)
        .post("/users")
        .send({
            name: "fake@.com",
            description: "1231"
        });

        const { token } = (await user).headers;

        user.set({
            Authorization: `${token}`
        });

        expect(user).toBe(201);
    });
});