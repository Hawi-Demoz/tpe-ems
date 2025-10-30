// src/App.jsx
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import MainLayout from "./components/MainLayout";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Keep user logged in on page reload
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
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute
              allowedRoles={["admin", "manager", "employee"]}
            >
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/employees"
            element={<ProtectedRoute allowedRoles={["admin"]}><EmployeesPage /></ProtectedRoute>}
          />
          <Route
            path="/employees/add"
            element={<ProtectedRoute allowedRoles={["admin", "manager"]}><AddEmployeePage /></ProtectedRoute>}
          />
          <Route
            path="/departments"
            element={<ProtectedRoute allowedRoles={["admin", "manager"]}><DepartmentsPage /></ProtectedRoute>}
          />
          <Route path="/leaves" element={<LeavesPage />} />
          <Route path="/leaves/request" element={<RequestLeavePage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route
            path="/reports"
            element={<ProtectedRoute allowedRoles={["admin", "manager"]}><ViewReportsPage /></ProtectedRoute>}
          />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
