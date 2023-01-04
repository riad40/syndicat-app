import Home  from './pages/Home'
import Dashboard from './pages/Dashboard'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import IsLoggedIn from './components/isLoggedin'

function App() {

  return (

    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route element={ <IsLoggedIn /> } >
            <Route path="/dashboard" element={ <Dashboard /> } />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>  
      
  )

}

export default App
