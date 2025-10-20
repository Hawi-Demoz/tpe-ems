import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
      <div className="flex">
        {/* Sidebar for navigation */}
        <Sidebar />

        {/* Page Content */}
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees" element={<EmployeesList />} />
            <Route path="/departments" element={<DepartmentsPage />} />
            <Route path="/leaves" element={<LeavesPage />} />
            <Route path="/attendance" element={<AttendancePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
