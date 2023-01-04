import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

function IsLoggedIn() {

    const { isAuth } = useContext(AuthContext)

    return localStorage.getItem('token') ? <Outlet /> : <Navigate to="/" />

}

export default IsLoggedIn