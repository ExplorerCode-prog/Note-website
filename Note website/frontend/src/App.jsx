import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

function Logout() {
  const navigate = useNavigate();

  React.useEffect(() => {
    localStorage.clear();
    navigate("/login");
  }, [navigate]);

  return null;
}

function RegisterAndLogout() {

  React.useEffect(() => {
    localStorage.clear();
    
  }, []);

  return <Register/>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
