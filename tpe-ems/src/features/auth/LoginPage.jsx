// src/features/auth/LoginPage.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginStart, loginSuccess, clearError } from './authSlice';
import ThemeToggle from '../../components/ThemeToggle';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const { isLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Invalid email format';
    if (!password.trim()) errors.password = 'Password is required';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFieldErrors(errors);

    if (Object.keys(errors).length === 0) {
      dispatch(loginStart());

      setTimeout(() => {
        const userData = {
          name: 'Demo User',
          email,
          role: email.includes('manager')
            ? 'manager'
            : email.includes('employee')
            ? 'employee'
            : 'admin',
        };
        dispatch(loginSuccess(userData));
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/dashboard');
      }, 1000);
    }
  };

  const handleInputChange = (field, value) => {
    if (fieldErrors[field]) setFieldErrors({ ...fieldErrors, [field]: null });
    if (error) dispatch(clearError());
    if (field === 'email') setEmail(value);
    else if (field === 'password') setPassword(value);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white dark:bg-gray-900 transition-all duration-500 font-inter relative">
      {/* Theme Toggle */}
      <div className="fixed top-5 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Header */}
      <div className="text-center mb-10 space-y-2">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white tracking-tight">
          TPE EMS
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Sign in to your workspace
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-6 text-left"
      >
        {/* Email Input */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border ${
              fieldErrors.email
                ? 'border-red-500 dark:border-red-400'
                : 'border-gray-300 dark:border-gray-700'
            } text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#3B378C] focus:outline-none transition-all duration-200`}
            placeholder="you@example.com"
          />
          {fieldErrors.email && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">
              {fieldErrors.email}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border ${
              fieldErrors.password
                ? 'border-red-500 dark:border-red-400'
                : 'border-gray-300 dark:border-gray-700'
            } text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#3B378C] focus:outline-none transition-all duration-200`}
            placeholder="••••••••"
          />
          {fieldErrors.password && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">
              {fieldErrors.password}
            </p>
          )}
        </div>

        {/* Forgot Password */}
        <div className="text-right">
          <button
            type="button"
            className="text-sm text-[#3B378C] hover:underline font-medium"
          >
            Forgot password?
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg border border-red-200 dark:border-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Sign In Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#3B378C] hover:bg-[#332f7a] text-white py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-[#3B378C] focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 disabled:opacity-50"
        >
          {isLoading ? (
            <span className="flex items-center justify-center space-x-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"
                />
              </svg>
              <span>Signing in...</span>
            </span>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      {/* Demo Info */}
      <div className="mt-10 text-sm text-gray-600 dark:text-gray-400 text-center space-y-1">
        <p className="font-medium text-gray-700 dark:text-gray-300">Demo Accounts</p>
        <p>Admin: admin@example.com</p>
        <p>Manager: manager@example.com</p>
        <p>Employee: employee@example.com</p>
        <p className="text-xs text-gray-500 dark:text-gray-500">Password: any</p>
      </div>

      {/* Footer */}
      <div className="mt-10 text-xs text-gray-400 dark:text-gray-500">
        © {new Date().getFullYear()} TPE Employee Management System
      </div>
    </div>
  );
};

export default LoginPage;
