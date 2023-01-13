import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Login } from "../pages/index"
import { inputs } from "../helpers/inputs"
import { BrowserRouter as Router } from "react-router-dom"

const validateInputs = (email = "", password = "") => {
    if (email.includes("@") && password.length >= 6) return true
    return false
}

describe("Login", () => {
    test("should login page be rendred", () => {
        render(
            <Router>
                <Login inputs={inputs} />
            </Router>
        )
        const emailInput = screen.getByTestId("emailInput")
        const pwdInput = screen.getByTestId("pwdInput")
        const submitBtn = screen.getByRole("button")
        expect(emailInput).toBeInTheDocument()
        expect(pwdInput).toBeInTheDocument()
        expect(submitBtn).toBeInTheDocument()
    })

    describe("validate inputs", () => {
        test("success", () => {
            let data = {
                email: "test@test.com",
                password: "123456",
            }
            expect(validateInputs(data.email, data.password)).toBe(true)
        })

        test("error", () => {
            let data = {
                email: "",
                password: "",
            }
            expect(validateInputs(data.email, data.password)).toBe(false)
        })
    })
})
