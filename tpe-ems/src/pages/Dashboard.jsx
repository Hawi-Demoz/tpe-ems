// src/pages/Dashboard.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 text-sm font-medium">Total Employees</h3>
            <div className="bg-blue-600 bg-opacity-20 p-2 rounded-full">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-white">248</p>
          <p className="text-green-400 text-sm mt-1">+12% from last month</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 text-sm font-medium">Departments</h3>
            <div className="bg-purple-600 bg-opacity-20 p-2 rounded-full">
              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-white">12</p>
          <p className="text-gray-400 text-sm mt-1">Across 3 locations</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 text-sm font-medium">Pending Leaves</h3>
            <div className="bg-yellow-600 bg-opacity-20 p-2 rounded-full">
              <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-white">18</p>
          <p className="text-yellow-400 text-sm mt-1">5 awaiting approval</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 text-sm font-medium">Attendance Rate</h3>
            <div className="bg-green-600 bg-opacity-20 p-2 rounded-full">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-white">94.2%</p>
          <p className="text-green-400 text-sm mt-1">+2.1% from last week</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Activities</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-blue-600 bg-opacity-20 p-2 rounded-full mr-3">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <div>
                <p className="text-white">New employee joined</p>
                <p className="text-gray-400 text-sm">John Doe was added to Engineering team</p>
                <p className="text-gray-500 text-xs mt-1">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-yellow-600 bg-opacity-20 p-2 rounded-full mr-3">
                <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-white">Leave request submitted</p>
                <p className="text-gray-400 text-sm">Sarah Smith requested 3 days leave</p>
                <p className="text-gray-500 text-xs mt-1">5 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-600 bg-opacity-20 p-2 rounded-full mr-3">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-white">Leave request approved</p>
                <p className="text-gray-400 text-sm">Mike Johnson's leave was approved</p>
                <p className="text-gray-500 text-xs mt-1">Yesterday</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-white">Team Meeting</p>
              <p className="text-gray-400 text-sm">Engineering Team Weekly Sync</p>
              <p className="text-gray-500 text-xs mt-1">Tomorrow, 10:00 AM</p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-4">
              <p className="text-white">Performance Review</p>
              <p className="text-gray-400 text-sm">Q2 Performance Reviews</p>
              <p className="text-gray-500 text-xs mt-1">Jun 15, 2023</p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-white">Company Holiday</p>
              <p className="text-gray-400 text-sm">Office will be closed</p>
              <p className="text-gray-500 text-xs mt-1">Jun 20, 2023</p>
            </div>
          </div>
        </div>
      </div>
      
      {user?.role === 'admin' && (
        <div className="mt-8 bg-blue-900 bg-opacity-20 border border-blue-700 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-blue-300">Admin Access Only: You have full access to all system features and employee data.</p>
          </div>
        </div>
      )}
      
      {user?.role === 'manager' && (
        <div className="mt-8 bg-purple-900 bg-opacity-20 border border-purple-700 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-purple-300">Manager Access: You can view and manage your team members, approve leave requests, and access reports.</p>
          </div>
        </div>
      )}
      
      {user?.role === 'employee' && (
        <div className="mt-8 bg-green-900 bg-opacity-20 border border-green-700 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-green-300">Employee Access: You can view your profile, submit leave requests, and check your attendance.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;