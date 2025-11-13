import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

const LeavesPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { isDarkMode } = useTheme();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const navigate = useNavigate();

  // Mock data
  const leaves = [
    {
      id: 1,
      employee: 'Yohannes Haile',
      type: 'Annual Leave',
      startDate: '2024-01-15',
      endDate: '2024-01-19',
      days: 5,
      status: 'Approved',
      reason: 'Family vacation',
      appliedDate: '2024-01-10',
      approvedBy: 'Liya Abebe'
    },
    {
      id: 2,
      employee: 'Ruth Asefa',
      type: 'Sick Leave',
      startDate: '2024-01-20',
      endDate: '2024-01-22',
      days: 3,
      status: 'Pending',
      reason: 'Medical appointment',
      appliedDate: '2024-01-18',
      approvedBy: null
    },
    {
      id: 3,
      employee: 'Liya Abebe',
      type: 'Maternity Leave',
      startDate: '2024-01-25',
      endDate: '2024-01-26',
      days: 2,
      status: 'Rejected',
      reason: 'Maternity leave',
      appliedDate: '2024-01-20',
  approvedBy: 'Kaleb Zewdu'
    },
    {
      id: 4,
      employee: 'Kirubel Kebede',
      type: 'Personal Leave',
      startDate: '2024-02-01',
      endDate: '2024-05-01',
      days: 90,
      status: 'Approved',
      reason: 'Personal matters',
      appliedDate: '2024-01-15',
  approvedBy: 'Rahel Abraham'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'leave',
      message: 'Leave request approved for Ruth Asefa',
      time: '4 hours ago',
      status: 'success'
    }
  ];

  const filteredLeaves = leaves.filter(leave => {
    const matchesSearch = leave.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         leave.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || leave.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesType = filterType === 'all' || leave.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const normalizedRole = user?.role ? String(user.role).toLowerCase().replace(/\s|_|-/g, '') : null;
  const canApprove = normalizedRole === 'admin' || normalizedRole === 'manager';
  const canApply = normalizedRole === 'employee' || normalizedRole === 'superadmin';

  return (
    <div className="p-6 pt-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
            Leave Management
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {canApply ? 'Manage your leave requests' : 'Review and approve leave requests'}
          </p>
        </div>
        {canApply && (
          <button
            onClick={() => setShowApplyModal(true)}
            className="mt-4 sm:mt-0 bg-[#3B378C] hover:bg-[#332f7a] text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Apply Leave</span>
          </button>
        )}
      </div>

      {/* Request Leave Card - Moved from Dashboard */}
      {canApply && (
        <button onClick={()=>navigate('/leaves/request')} className={`p-4 rounded-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} hover:border-[#3B378C] transition-all duration-200 text-left mb-6`}>
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
      )}

      {/* Search and Filters */}
      <div className={`rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-6 mb-6`}>
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search leaves..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#3B378C] focus:border-transparent transition-all duration-200`}
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`px-4 py-3 rounded-lg border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#3B378C] focus:border-transparent transition-all duration-200`}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <select value={filterType} onChange={(e)=>setFilterType(e.target.value)} className={`px-4 py-3 rounded-lg border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#3B378C] focus:border-transparent transition-all duration-200`}>
              <option value="all">All Types</option>
              <option value="Annual Leave">Annual Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Personal Leave">Personal Leave</option>
              <option value="Maternity Leave">Maternity Leave</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leaves Table */}
      <div className={`rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <tr>
                <th className={`px-6 py-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                  Employee
                </th>
                <th className={`px-6 py-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                  Leave Type
                </th>
                <th className={`px-6 py-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                  Duration
                </th>
                <th className={`px-6 py-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                  Status
                </th>
                <th className={`px-6 py-4 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                  Applied Date
                </th>
                {canApprove && (
                  <th className={`px-6 py-4 text-right text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {filteredLeaves.map((leave) => (
                <tr key={leave.id} className={`hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} transition-colors duration-200`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-[#3B378C] flex items-center justify-center text-white font-medium text-sm mr-4">
                        {leave.employee.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {leave.employee}
                        </div>
                        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {leave.reason}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                    {leave.type}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                    <div>
                      <div>{leave.startDate} to {leave.endDate}</div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        {leave.days} days
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(leave.status)}`}>
                      {leave.status}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                    {leave.appliedDate}
                  </td>
                  {canApprove && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {leave.status === 'Pending' && (
                        <div className="flex items-center justify-end space-x-2">
                          <button className="text-green-600 hover:text-green-800 transition-colors duration-200">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                          <button className="text-red-600 hover:text-red-800 transition-colors duration-200">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activities */}
      <div className={`rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-6 mb-6`}>
        <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
          Recent Activities
        </h2>
        <ul className="space-y-2">
          {recentActivities.map((activity) => (
            <li key={activity.id} className={`flex items-center ${activity.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={activity.status === 'success' ? 'M5 13l4 4L19 7' : 'M6 18L18 6M6 6l12 12'} />
              </svg>
              <div className="text-sm">
                {activity.message}
                <span className="text-gray-500 ml-2">({activity.time})</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Apply Leave Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`w-full max-w-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 mx-4`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Apply for Leave
              </h3>
              <button
                onClick={() => setShowApplyModal(false)}
                className={`text-gray-400 hover:text-gray-600 transition-colors duration-200`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Leave Type
                </label>
                <select className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#3B378C] focus:border-transparent transition-all duration-200`}>
                  <option>Annual Leave</option>
                  <option>Sick Leave</option>
                  <option>Personal Leave</option>
                  <option>Maternity Leave</option>
                  <option>Paternity Leave</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Start Date
                  </label>
                  <input
                    type="date"
                    className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#3B378C] focus:border-transparent transition-all duration-200`}
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    End Date
                  </label>
                  <input
                    type="date"
                    className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#3B378C] focus:border-transparent transition-all duration-200`}
                  />
                </div>
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Reason
                </label>
                <textarea
                  rows={3}
                  className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#3B378C] focus:border-transparent transition-all duration-200`}
                  placeholder="Enter reason for leave"
                />
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className={`px-6 py-3 rounded-lg border ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} transition-colors duration-200`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#3B378C] hover:bg-[#332f7a] text-white rounded-lg font-medium transition-colors duration-200"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeavesPage;