import { Navigate, Outlet } from "react-router-dom"

function IsLoggedIn() {
    return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/" />
}

export default IsLoggedIn
