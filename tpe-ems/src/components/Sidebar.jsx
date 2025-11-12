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
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className={`pt-6 pb-6 ${collapsed ? 'px-3' : 'px-6'}`}>
          <div className={`flex flex-col ${collapsed ? 'items-center' : 'items-start'}`}>
            <button
              onClick={handleToggle}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              title={collapsed ? 'Expand' : 'Collapse'}
              aria-expanded={collapsed}
              className="relative inline-flex items-center justify-center w-7 h-7 rounded-md text-white/90 hover:text-white border border-white/10 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 active:scale-95 overflow-hidden after:absolute after:inset-0 after:rounded-md after:bg-white/20 after:opacity-0 active:after:opacity-100 after:transition-opacity"
            >
              {collapsed ? (
                <PanelLeftOpen className="w-4 h-4" />
              ) : (
                <PanelLeftClose className="w-4 h-4" />
              )}
            </button>
            {collapsed ? (
              <div className="mt-6 w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center text-white font-bold text-base shadow-sm">
                T
              </div>
            ) : (
              <>
                <h1 className="mt-7 text-[1.35rem] font-semibold text-white tracking-wide leading-tight">TPE EMS</h1>
                <p className="text-white/70 text-[0.7rem] mt-2 tracking-wide">Employee Management System</p>
              </>
            )}
          </div>
        </div>
        {/* Navigation (scrollable) */}
        <div className="flex-1 overflow-y-auto px-1">
          <nav className="space-y-1.5 pb-6">
            {filteredNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center ${collapsed ? 'justify-center px-2' : 'px-5'} py-2.5 rounded-md text-[0.82rem] font-medium text-white/80 hover:text-white transition-colors tracking-wide ${
                    isActive ? 'bg-white/15 backdrop-blur-sm text-white border-l-4 border-pink-400 pl-[calc(1.25rem-4px)] shadow-sm' : 'hover:bg-white/8'
                  }`
                }
              >
                {(() => {
                  const Icon = item.Icon;
                  return <Icon className={`shrink-0 ${collapsed ? '' : 'mr-3'} w-[18px] h-[18px]`} />;
                })()}
                {!collapsed && <span className="truncate">{item.name}</span>}
              </NavLink>
            ))}
          </nav>
        </div>
        {/* Footer */}
        <div className={`mt-auto border-t border-white/10 ${collapsed ? 'px-2 py-5' : 'px-6 py-6'}`}>
          {collapsed ? (
            <div className="flex items-center justify-center">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center text-white font-bold shadow-sm">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center text-white font-bold shadow-sm">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3 min-w-0 leading-tight">
                <p className="text-white font-medium truncate text-[0.83rem] tracking-wide">{user?.name}</p>
                <p className="text-white/65 text-[0.65rem] capitalize truncate mt-0.5 tracking-wider">{user?.role}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;