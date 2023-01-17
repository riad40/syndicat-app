const request = require("supertest")
const app = require("../server")

describe("POST /api/auth/login", () => {
    let body = {
        email: "",
        password: "",
    }

    describe("given all registration credintials", () => {
        test("success", async () => {
            body = {
                email: "syndicat@gmail.com",
                password: "syndic123",
            }
            const response = await request(app)
                .post("/api/auth/login")
                .send(body)
            expect(response.statusCode).toBe(200)
        })

        test("error", async () => {
            body = {
                email: "syndicat@gmail.com",
                password: "kgiygluglulg",
            }
            const response = await request(app)
                .post("/api/auth/login")
                .send(body)
            expect(response.statusCode).toBe(400)
        })
    })

    describe("all or some of registration credintials is null", () => {
        test("error", async () => {
            body = {
                email: "",
                password: "",
            }
            const response = await request(app)
                .post("/api/auth/login")
                .send(body)
            expect(response.statusCode).toBe(400)
        })
    })
})
