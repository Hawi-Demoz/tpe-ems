import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import EmployeesList from "./features/employees/EmployeesList";
import DepartmentsPage from "./features/departments/DepartmentsPage";
import LeavesPage from "./features/leaves/LeavesPage";
import AttendancePage from "./features/attendance/AttendancePage";
import LoginPage from "./features/auth/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={
          <div className="flex">
            <Sidebar />
            <div className="flex-1 p-6">
              <Dashboard />
            </div>
          </div>
        } />
        <Route path="/employees" element={
          <div className="flex">
            <Sidebar />
            <div className="flex-1 p-6">
              <EmployeesList />
            </div>
          </div>
        } />
        <Route path="/departments" element={
          <div className="flex">
            <Sidebar />
            <div className="flex-1 p-6">
              <DepartmentsPage />
            </div>
          </div>
        } />
        <Route path="/leaves" element={
          <div className="flex">
            <Sidebar />
            <div className="flex-1 p-6">
              <LeavesPage />
            </div>
          </div>
        } />
        <Route path="/attendance" element={
          <div className="flex">
            <Sidebar />
            <div className="flex-1 p-6">
              <AttendancePage />
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
