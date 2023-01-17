const request = require("supertest")
const app = require("../server")

describe("payment", () => {
    test("Creaete payment", async () => {
        const res = await request(app).post("/api/payments").send({
            paymentId: "444",
            paymentAmount: "200",
            monthsPayed: "2023-01-13",
            appartement: "2",
        })

        expect(res.status).toBe(200)
    })

    test("update payment", async () => {
        const res = await request(app)
            .put("/api/payments/63c5f68adf143715b8030ad3")
            .send({
                paymentId: "444",
                paymentAmount: "200",
                monthsPayed: "2023-01-13",
                appartement: "2",
            })

        expect(res.status).toBe(200)
    })

    test("send data null", async () => {
        const res = await request(app).post("/api/payments").send({
            paymentId: "",
            paymentAmount: "",
            monthsPayed: "",
            appartement: "",
        })

        expect(res.status).toBe(400)
    })
})
