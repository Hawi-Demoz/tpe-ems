// src/components/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const MainLayout = ({ collapsed = false, onToggle }) => {
  return (
    <div className="flex">
      <Sidebar collapsed={collapsed} onToggle={onToggle} />
      <div className={`flex-1 ${collapsed ? 'ml-16' : 'ml-64'}`}>
        <Navbar collapsed={collapsed} />
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
