// src/features/auth/logout.js
import { jsx } from "react/jsx-runtime";
import { logout } from "./authSlice";


export const handleLogout = (dispatch, navigate) => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");

  dispatch(logout());
    
  navigate("/login");
};

