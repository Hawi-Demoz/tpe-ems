import React from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total Employees',
      value: '10',
      change: '+12%',
      changeType: 'positive',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'Active Today',
      value: '10',
      change: '+5%',
      changeType: 'positive',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Pending Leaves',
      value: '8',
      change: '-3',
      changeType: 'negative',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Departments',
      value: '5',
      change: '+2',
      changeType: 'positive',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'employee',
      message: 'New employee Yohannes Haile joined the Engineering team',
      time: '2 hours ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'leave',
      message: 'Leave request approved for Ruth Asefa',
      time: '4 hours ago',
      status: 'success'
    },
    {
      id: 3,
      type: 'attendance',
      message: 'Attendance report generated for this month',
      time: '1 day ago',
      status: 'info'
    },
    {
      id: 4,
      type: 'department',
      message: 'New department "Marketing" created',
      time: '2 days ago',
      status: 'success'
    }
  ];

  return (
    <div className="p-6 pt-20">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
          Welcome back, {user?.name}!
        </h1>
        <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Here's what's happening in your workspace today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-200 hover:shadow-lg`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-[#3B378C]/10 text-[#3B378C]`}>
                {stat.icon}
              </div>
              <span className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <div>
              <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
                {stat.value}
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className={`rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-6`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Recent Activity
          </h2>
          <button className={`text-sm text-[#3B378C] hover:underline font-medium`}>
            View all
          </button>
        </div>
        
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4 py-3">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                activity.status === 'success' ? 'bg-green-500' : 
                activity.status === 'info' ? 'bg-blue-500' : 'bg-yellow-500'
              }`}></div>
              <div className="flex-1">
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                  {activity.message}
                </p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          { (user?.role === 'admin' || user?.role === 'manager') ? (
            <button onClick={()=>navigate('/employees/add')} className={`p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} hover:border-[#3B378C] transition-all duration-200 text-left`}>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-[#3B378C]/10 text-[#3B378C]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Add Employee
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Create new employee record
                  </p>
                </div>
              </div>
            </button>
          ) : (
            <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} text-left opacity-60 cursor-not-allowed`}>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gray-200 text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Add Employee
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Create new employee record (admin/manager only)
                  </p>
                </div>
              </div>
            </div>
          )}

          <button className={`p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} hover:border-[#3B378C] transition-all duration-200 text-left`}>
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-[#3B378C]/10 text-[#3B378C]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Request Leave
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Submit leave application
                </p>
              </div>
            </div>
          </button>

          <button className={`p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} hover:border-[#3B378C] transition-all duration-200 text-left`}>
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-[#3B378C]/10 text-[#3B378C]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  View Reports
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Generate attendance reports
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;