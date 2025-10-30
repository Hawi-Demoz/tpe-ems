// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('tpe_user')) || null, // restore user from storage
  token: localStorage.getItem('tpe_token') || null,           // restore token
  isAuthenticated: !!localStorage.getItem('tpe_token'),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login process started
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    // Login success — store user & token
    loginSuccess: (state, action) => {
      const { user, token } = action.payload;
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = user;
      state.token = token;
      state.error = null;

      // Save to localStorage for persistence
      localStorage.setItem('tpe_token', token);
      localStorage.setItem('tpe_user', JSON.stringify(user));
    },

    // Login failure
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;

      // Cleanup storage
      localStorage.removeItem('tpe_token');
      localStorage.removeItem('tpe_user');
    },

    // Logout user
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;

      // Clear storage
      localStorage.removeItem('tpe_token');
      localStorage.removeItem('tpe_user');
    },

    // Clear only the error message
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;
export default authSlice.reducer;


