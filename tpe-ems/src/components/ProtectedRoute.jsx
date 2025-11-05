// src/components/ProtectedRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  // ✅ Use the correct keys from authSlice
  const token = localStorage.getItem("tpe_token");
  const storedUser = localStorage.getItem("tpe_user")
    ? JSON.parse(localStorage.getItem("tpe_user"))
    : null;

  const activeUser = user || storedUser;
  const normalizedRole = activeUser?.role
    ? String(activeUser.role).toLowerCase().replace(/\s|_/g, "")
    : null;

  // 🔐 If no token or user, redirect to login
  if (!token || !activeUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ⚙️ Role-based access control
  // Always allow admin and superadmin full access
  if (normalizedRole === "admin" || normalizedRole === "superadmin") {
    return children;
  }

  if (allowedRoles.length > 0) {
    const normalizedAllowed = allowedRoles.map((r) => String(r).toLowerCase().replace(/\s|_/g, ""));
    if (!normalizedRole || !normalizedAllowed.includes(normalizedRole)) {
      // 🛑 User's role is not allowed, redirect to a safe page
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }

  // ✅ Allow rendering if authenticated and role matches
  return children;
};

export default ProtectedRoute;
