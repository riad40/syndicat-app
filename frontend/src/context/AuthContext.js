import { createContext, useState } from "react"

const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
    const [usr, setUsr] = useState("")

    return (
        <AuthContext.Provider value={{ usr, setUsr }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider }

export default AuthContext
