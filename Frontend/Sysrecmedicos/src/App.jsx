import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path ='/' element={<h1>Home Page</h1>} />
                <Route path ='/login' element={<LoginPage/>} />
                <Route path ='/register' element={<Register/>} />
                <Route path ='/records' element={<h1>Records Page</h1>} />
                <Route path ='/add-record' element={<h1>New Record</h1>} />
                <Route path ='/records/:id' element={<h1>Update Record</h1>} />
                <Route path ='/profile' element={<h1>Profile</h1>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App 