// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊', roles: ['admin', 'manager', 'employee'] },
    { name: 'Employees', path: '/employees', icon: '👥', roles: ['admin'] },
    { name: 'Departments', path: '/departments', icon: '🏢', roles: ['admin', 'manager'] },
    { name: 'Leaves', path: '/leaves', icon: '📅', roles: ['admin', 'manager', 'employee'] },
    { name: 'Attendance', path: '/attendance', icon: '⏰', roles: ['admin', 'manager', 'employee'] },
    { name: 'Profile', path: '/profile', icon: '👤', roles: ['admin', 'manager', 'employee'] },
  ];

  const filteredNavItems = navItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-gray-800 shadow-lg z-40 transition-[width] duration-300 overflow-hidden ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Collapse/Expand Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-1 top-6 z-50 w-6 h-6 rounded-full bg-gray-800 text-gray-200 border border-gray-700 hover:bg-gray-700 flex items-center justify-center text-xs"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        title={collapsed ? 'Expand' : 'Collapse'}
      >
        {collapsed ? '›' : '‹'}
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

      {/* Footer (User Info) */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
        {collapsed ? (
          <div className="flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-[#3B378C] flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        ) : (
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-[#3B378C] flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="ml-3">
              <p className="text-white font-medium">{user?.name}</p>
              <p className="text-gray-400 text-sm capitalize">{user?.role}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;