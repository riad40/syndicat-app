import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import IsLoggedIn from "./components/isLoggedin"
import Wrapper from "./components/common/Wrapper"
import Appartment from "./pages/apartments/Appartment"
import Payment from "./pages/payments/Payment"

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route element={<IsLoggedIn />}>
                        <Route element={<Wrapper />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route
                                path="/appartments"
                                element={<Appartment />}
                            />
                            <Route path="/payments" element={<Payment />} />
                        </Route>
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default App
