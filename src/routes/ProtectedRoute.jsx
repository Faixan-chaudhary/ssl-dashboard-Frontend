// routes/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { clearAuthData } from "../utils/authHandler";

const ProtectedRoute = () => {
  const token = Cookies.get("token");

  // If no token, clear any remaining auth data and redirect to login page
  if (!token) {
    // Clear any remaining auth data
    clearAuthData();
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
