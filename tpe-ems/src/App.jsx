// src/App.jsx
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "./components/MainLayout";
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
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // ✅ Keep user logged in on page reload
  useEffect(() => {
    const user = localStorage.getItem("tpe_user");
    const token = localStorage.getItem("tpe_token");

    if (user && token) {
      dispatch(loginSuccess({ user: JSON.parse(user), token }));
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout collapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed((v) => !v)} />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/employees"
            element={
              <ProtectedRoute allowedRoles={["superadmin", "admin"]}>
                <EmployeesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees/add"
            element={
              <ProtectedRoute allowedRoles={["superadmin", "admin", "manager"]}>
                <AddEmployeePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/departments"
            element={
              <ProtectedRoute allowedRoles={["superadmin", "admin", "manager"]}>
                <DepartmentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaves"
            element={
              <ProtectedRoute allowedRoles={["superadmin", "admin", "manager", "employee"]}>
                <LeavesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaves/request"
            element={
              <ProtectedRoute allowedRoles={["superadmin", "admin", "manager", "employee"]}>
                <RequestLeavePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendance"
            element={
              <ProtectedRoute allowedRoles={["superadmin", "admin", "manager", "employee"]}>
                <AttendancePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute allowedRoles={["superadmin", "admin", "manager"]}>
                <ViewReportsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["superadmin", "admin", "manager", "employee"]}>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
