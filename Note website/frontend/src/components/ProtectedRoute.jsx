import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from "../api";
import { jwtDecode } from "jwt-decode";

// Your other code

import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [thisError, setThisError] = useState(null);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await auth();
      } catch (error) {
        setIsAuthenticated(false);
        setThisError("Authentication Failed");
        alert(thisError);
      }
    };
    verifyAuth();
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const resp = await api.post("api/token/refresh/", {
        refresh: refreshToken,
      });
      if (resp.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, resp.data.access);

      }
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsAuthenticated(false);
      setThisError("Invalid token. Please log in again");
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration - 60 < now) {
      await refreshToken();
    } else {
      setIsAuthenticated(true);
    }
  };

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login/" />;
}
export default ProtectedRoute;
