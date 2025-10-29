// src/App.jsx
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import EmployeesPage from "./features/employees/EmployeesPage";
import AddEmployeePage from "./features/employees/AddEmployeePage";
import DepartmentsPage from "./features/departments/DepartmentsPage";
import LeavesPage from "./features/leaves/LeavesPage";
import AttendancePage from "./features/attendance/AttendancePage";
import LoginPage from "./features/auth/LoginPage";
import Profile from "./pages/Profile";
import RequestLeavePage from "./features/leaves/RequestLeavePage";
import ViewReportsPage from "./features/reports/ViewReportsPage";
import { loginSuccess } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();

  // ✅ Keep user logged in on page reload
  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      dispatch(loginSuccess({ user: JSON.parse(user), token }));
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "manager", "employee"]}>
              <div className="flex">
                <Sidebar />
                <div className="flex-1 ml-64">
                  <Navbar pageTitle="Dashboard" />
                  <Dashboard />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <div className="flex">
                <Sidebar />
                <div className="flex-1 ml-64">
                  <Navbar pageTitle="Employees" />
                  <EmployeesPage />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees/add"
          element={
            <ProtectedRoute allowedRoles={["admin", "manager"]}>
              <div className="flex">
                <Sidebar />
                <div className="flex-1 ml-64">
                  <Navbar pageTitle="Add Employee" />
                  <AddEmployeePage />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/departments"
          element={
            <ProtectedRoute allowedRoles={["admin", "manager"]}>
              <div className="flex">
                <Sidebar />
                <div className="flex-1 ml-64">
                  <Navbar pageTitle="Departments" />
                  <DepartmentsPage />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/leaves"
          element={
            <ProtectedRoute allowedRoles={["admin", "manager", "employee"]}>
              <div className="flex">
                <Sidebar />
                <div className="flex-1 ml-64">
                  <Navbar pageTitle="Leaves" />
                  <LeavesPage />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/leaves/request"
          element={
            <ProtectedRoute allowedRoles={["admin", "manager", "employee"]}>
              <div className="flex">
                <Sidebar />
                <div className="flex-1 ml-64">
                  <Navbar pageTitle="Request Leave" />
                  <RequestLeavePage />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance"
          element={
            <ProtectedRoute allowedRoles={["admin", "manager", "employee"]}>
              <div className="flex">
                <Sidebar />
                <div className="flex-1 ml-64">
                  <Navbar pageTitle="Attendance" />
                  <AttendancePage />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute allowedRoles={["admin", "manager"]}>
              <div className="flex">
                <Sidebar />
                <div className="flex-1 ml-64">
                  <Navbar pageTitle="Reports" />
                  <ViewReportsPage />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["admin", "manager", "employee"]}>
              <div className="flex">
                <Sidebar />
                <div className="flex-1 ml-64">
                  <Navbar pageTitle="Profile Settings" />
                  <Profile />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
