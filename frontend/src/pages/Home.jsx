import "./home.css"
import { useState, useContext } from "react"
import { api } from "../helpers/api"
import { Navigate } from "react-router-dom"
import AuthContext from "../context/AuthContext"

function Home() {
    const [user, setUser] = useState({})

    const [err, setErr] = useState()

    const [noErr, setNoErr] = useState(false)

    const { setUsr } = useContext(AuthContext)

    const inputHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const login = (e) => {
        e.preventDefault()

        api.post("/auth/login", user, { withCredentials: true })
            .then((response) => {
                localStorage.setItem("token", response.data.token)
                setNoErr(true)
                localStorage.setItem("usr", response.data.user)
                setUsr(response.data.user)
            })
            .catch((err) => {
                setErr(err.response?.data?.message)
                setNoErr(false)
                console.log(err)
            })
    }

    return (
        <>
            <section className="flex justify-center items-center h-screen">
                <div className="max-w-md w-full bg-gray-900 rounded p-6 space-y-4">
                    <div className="mb-4">
                        <h2 className="text-xl font-bold text-white text-center">
                            Sign In
                        </h2>
                        <p className="text-center text-red-300">
                            {err &&
                                err.map((er) => er.msg + " " + er.param + " ")}
                        </p>
                    </div>
                    <form onSubmit={login}>
                        <div>
                            <input
                                className="w-full p-4 my-3 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={inputHandler}
                            />
                        </div>
                        <div>
                            <input
                                className="w-full p-4 mb-3 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={inputHandler}
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
                {noErr && <Navigate to="/dashboard" />}
            </section>
        </>
    )
}

export default Home
