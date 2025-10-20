// src/components/Sidebar.jsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊', roles: ['admin', 'manager', 'employee'] },
    { name: 'Employees', path: '/employees', icon: '👥', roles: ['admin'] },
    { name: 'Departments', path: '/departments', icon: '🏢', roles: ['admin', 'manager'] },
    { name: 'Leaves', path: '/leaves', icon: '📅', roles: ['admin', 'manager', 'employee'] },
    { name: 'Attendance', path: '/attendance', icon: '⏰', roles: ['admin', 'manager', 'employee'] },
  ];

  const filteredNavItems = navItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 shadow-lg z-10">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white">TPE EMS</h1>
        <p className="text-gray-400 text-sm mt-1">Employee Management System</p>
      </div>
      
      <nav className="mt-6">
        {filteredNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 ${
                isActive ? 'bg-gray-700 border-l-4 border-blue-500 text-white' : ''
              }`
            }
          >
            <span className="mr-3 text-xl">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="ml-3">
            <p className="text-white font-medium">{user?.name}</p>
            <p className="text-gray-400 text-sm capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;