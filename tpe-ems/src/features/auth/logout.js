// src/features/auth/logout.js
import { jsx } from "react/jsx-runtime";
import { logout } from "./authSlice";


export const handleLogout = (dispatch, navigate) => {
  // Remove user & token from localStorage
  localStorage.removeItem("user");
  localStorage.removeItem("token");

  // Clear Redux state
  dispatch(logout());
    
  // Redirect to login
  navigate("/login");
};
