// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LayoutDashboard, Users, Building2, CalendarCheck, Clock, User2, PanelLeftOpen, PanelLeftClose } from 'lucide-react';
const Sidebar = ({ collapsed: controlledCollapsed, onToggle }) => {
  const { user } = useSelector((state) => state.auth);
  const [uncontrolledCollapsed, setUncontrolledCollapsed] = useState(false);
  const collapsed = controlledCollapsed !== undefined ? controlledCollapsed : uncontrolledCollapsed;
  const handleToggle = () => {
    if (onToggle) onToggle();
    else setUncontrolledCollapsed((v) => !v);
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', Icon: LayoutDashboard, roles: ['superadmin', 'admin', 'manager', 'employee'] },
    { name: 'Employees', path: '/employees', Icon: Users, roles: ['superadmin', 'admin'] },
    { name: 'Departments', path: '/departments', Icon: Building2, roles: ['superadmin', 'admin', 'manager'] },
    { name: 'Leaves', path: '/leaves', Icon: CalendarCheck, roles: ['superadmin', 'admin', 'manager', 'employee'] },
    { name: 'Attendance', path: '/attendance', Icon: Clock, roles: ['superadmin', 'admin', 'manager', 'employee'] },
    { name: 'Profile', path: '/profile', Icon: User2, roles: ['superadmin', 'admin', 'manager', 'employee'] },
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

  const primaryIndigo = 'rgb(51, 47, 122)';
  const sidebarStyle = {
    backgroundColor: primaryIndigo,
    backgroundImage:
      'linear-gradient(180deg, rgba(51,47,122,1) 0%, rgba(51,47,122,0.96) 55%, rgba(51,47,122,0.92) 100%)',
  };

  return (
    <div
      className={`fixed left-0 top-0 h-full shadow-lg z-50 transition-[width] duration-300 overflow-hidden border-r border-white/10 hover:cursor-crosshair hover:shadow-xl ${
        collapsed ? 'w-16' : 'w-64'
      }`}
      style={sidebarStyle}
    >
      {/* Header with inline collapse button (shadcn-style ghost button) */}
      <div className={`pt-4 pb-3 ${collapsed ? 'px-3' : 'px-4'}`}>
        <div className="flex items-center gap-4">
          {collapsed ? (
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center text-white font-bold text-base">
              T
            </div>
          ) : (
            <h1 className="text-xl font-semibold text-white tracking-wide">TPE EMS</h1>
          )}
          <button
            onClick={handleToggle}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand' : 'Collapse'}
            aria-expanded={collapsed}
            className="inline-flex items-center justify-center w-7 h-7 rounded-md text-white/90 hover:text-white hover:bg-white/10 border border-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            {collapsed ? (
              <PanelLeftOpen className="w-4 h-4" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </button>
        </div>
        {!collapsed && <p className="text-white/70 text-xs mt-2">Employee Management System</p>}
      </div>

      {/* Navigation */}
      <nav className="mt-3">
        {filteredNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center ${collapsed ? 'justify-center px-3' : 'px-6'} py-3 text-white/80 hover:text-white transition-all duration-200 ${
                isActive ? 'bg-white/10 text-white border-l-4 border-pink-400' : 'hover:bg-white/5'
              }`
            }
          >
            {(() => {
              const Icon = item.Icon;
              return <Icon className={`shrink-0 ${collapsed ? '' : 'mr-3'} w-5 h-5`} />;
            })()}
            {!collapsed && <span className="truncate">{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer (User Info) */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
        {collapsed ? (
          <div className="flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        ) : (
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="ml-3">
              <p className="text-white font-medium">{user?.name}</p>
              <p className="text-white/70 text-sm capitalize">{user?.role}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;