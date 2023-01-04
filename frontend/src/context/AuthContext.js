import { createContext, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { api } from "../helpers/api"

const AuthContext = createContext({})

const AuthProvider = ({ children }) => {

    const navigate = useNavigate()

    const [isAuth, setIsAuth] = useState(false)

    const token = localStorage.getItem('token')

    // if(token) {
    //     api.get('/auth/isloggedin', {  headers: { Authorization: 'Bearer ' + token } })
    //         .then((response) => {
    //             console.log(response)
    //             response.data.loggedIn === true ? setIsAuth(true) : setIsAuth(false)
    //             navigate("/dashboard")
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //             setIsAuth(false)
    //         })
    // }

    return (
        <AuthContext.Provider value={{ isAuth }}> { children } </AuthContext.Provider>
    )
}

export { AuthProvider }

export default AuthContext