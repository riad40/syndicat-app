import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import IsLoggedIn from "./components/isLoggedin"
import Wrapper from "./components/common/Wrapper"
import {
    Appartment,
    CreateAppartment,
    UpdateAppartment,
    Payment,
    CreatePayment,
    UpdatePayment,
    Dashboard,
    Home,
} from "./pages/index"

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
                            <Route
                                path="/appartments/create"
                                element={<CreateAppartment />}
                            />
                            <Route
                                path="/appartments/edit/:appartment_id"
                                element={<UpdateAppartment />}
                            />
                            <Route path="/payments" element={<Payment />} />
                            <Route
                                path="/payments/create"
                                element={<CreatePayment />}
                            />
                            <Route
                                path="/payments/edit"
                                element={<UpdatePayment />}
                            />
                        </Route>
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default App
