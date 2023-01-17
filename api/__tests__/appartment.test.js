const request = require("supertest")
const app = require("../server")

describe("appartement", () => {
    test("Creaete appartement", async () => {
        const response = await request(app).post("/api/appartements").send({
            appartementOwner: "Test",
            appartementNumber: "2",
            floorNumber: "1",
        })

        expect(response.status).toBe(200)
    })

    test("update appartement", async () => {
        const response = await request(app)
            .put("/api/appartements/63c5f68adf143715b8030ad3")
            .send({
                appartementOwner: "Test",
                appartementNumber: "2",
                floorNumber: "1",
            })

        expect(response.status).toBe(200)
    })

    test("send data null", async () => {
        const response = await request(app).post("/api/appartements").send({
            appartementOwner: "",
            appartementNumber: "",
            floorNumber: "",
        })

        expect(response.status).toBe(400)
    })

    test("Delete Appartment", async () => {
        const response = await request(app).delete("/api/appartements")

        expect(response.status).toBe(200)
    })

    test("Get Appartment", async () => {
        const response = await request(app).get(
            "/api/appartements/63c5f63cdf143715b8030abe"
        )

        expect(response.status).toBe(200)
    })
})
