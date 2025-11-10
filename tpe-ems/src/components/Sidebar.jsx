// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Sidebar = ({ collapsed: controlledCollapsed, onToggle }) => {
  const { user } = useSelector((state) => state.auth);
  const [uncontrolledCollapsed, setUncontrolledCollapsed] = useState(false);
  const collapsed = controlledCollapsed !== undefined ? controlledCollapsed : uncontrolledCollapsed;
  const handleToggle = () => {
    if (onToggle) onToggle();
    else setUncontrolledCollapsed((v) => !v);
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊', roles: ['superadmin', 'admin', 'manager', 'employee'] },
    { name: 'Employees', path: '/employees', icon: '👥', roles: ['superadmin', 'admin'] },
    { name: 'Departments', path: '/departments', icon: '🏢', roles: ['superadmin', 'admin', 'manager'] },
    { name: 'Leaves', path: '/leaves', icon: '📅', roles: ['superadmin', 'admin', 'manager', 'employee'] },
    { name: 'Attendance', path: '/attendance', icon: '⏰', roles: ['superadmin', 'admin', 'manager', 'employee'] },
    { name: 'Profile', path: '/profile', icon: '👤', roles: ['superadmin', 'admin', 'manager', 'employee'] },
  ];

  const filteredNavItems = (() => {
    const roleRaw = user?.role;
    const role = roleRaw ? String(roleRaw).toLowerCase().replace(/\s|_/g, '') : null;
    if (role === 'admin' || role === 'superadmin') return navItems; // full access
    return navItems.filter((item) => {
      const allowed = item.roles.map((r) => String(r).toLowerCase().replace(/\s|_/g, ''));
      return !!role && allowed.includes(role);
    });
  })();

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-gray-800 shadow-lg z-50 transition-[width] duration-300 overflow-hidden border-r border-gray-700 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex flex-col">
        {/* Collapse/Expand Button */}
        <button
          onClick={handleToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand' : 'Collapse'}
          aria-expanded={collapsed}
          className={`w-9 h-9 mt-4 ml-4 self-start rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 shadow-sm backdrop-blur-sm hover:shadow-md hover:-translate-y-0.5 transform transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#3B378C]/20`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 transform transition-transform duration-200 ${collapsed ? 'rotate-180' : 'rotate-0'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Header */}
        <div className={`p-6 ${collapsed ? 'px-4' : ''}`}>
          {collapsed ? (
            <div className="w-10 h-10 rounded-lg bg-[#3B378C] flex items-center justify-center text-white font-bold text-lg">
              T
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-white">TPE EMS</h1>
              <p className="text-gray-400 text-sm mt-1">Employee Management System</p>
            </>
          )}
        </div>

        {/* Navigation */}
        <nav className="mt-3">
          {filteredNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center ${collapsed ? 'justify-center px-3' : 'px-6'} py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 ${
                  isActive ? 'bg-gray-700 border-l-4 border-[#3B378C] text-white' : ''
                }`
              }
            >
              <span className={`text-xl ${collapsed ? '' : 'mr-3'}`}>{item.icon}</span>
              {!collapsed && <span className="truncate">{item.name}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;