import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import RecordPage from "./pages/RecordPage";
import RecordFormPage from "./pages/RecordFormPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
 <AuthProvider>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage />} />
      
      {/* <Route element={<ProtectedRoute/>}> */}
        <Route path="/record" element={<RecordPage/>} />
        <Route path="/add-record" element={<RecordFormPage/>} />
        <Route path="/record/:id" element={<RecordFormPage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
      {/* </Route> */}


      </Routes>
    </BrowserRouter>
 </AuthProvider>
  );
}

export default App;