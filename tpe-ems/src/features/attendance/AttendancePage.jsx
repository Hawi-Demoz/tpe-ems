import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '../../contexts/ThemeContext';

const AttendancePage = () => {
  const { user } = useSelector((state) => state.auth);
  const { isDarkMode } = useTheme();

  // 🔹 UI filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('All Status');
  const [hasCheckedIn, setHasCheckedIn] = useState(false);

  // 🔹 Mock attendance data (temporary before backend)
  const attendanceRecords = [
    {
      id: 1,
      employee: 'Yohannes Haile',
      date: '2024-01-15',
      checkIn: '09:00 AM',
      checkOut: '06:00 PM',
      hours: 9,
      status: 'Present',
      department: 'Engineering',
    },
    {
      id: 2,
      employee: 'Ruth Asefa',
      date: '2024-01-15',
      checkIn: '08:45 AM',
      checkOut: '05:30 PM',
      hours: 8.75,
      status: 'Present',
      department: 'Product',
    },
    {
      id: 3,
      employee: 'Liya Abebe',
      date: '2024-01-15',
      checkIn: '09:15 AM',
      checkOut: '06:15 PM',
      hours: 9,
      status: 'Present',
      department: 'Design',
    },
    {
      id: 4,
      employee: 'Kirubel Kebede',
      date: '2024-01-15',
      checkIn: '10:00 AM',
      checkOut: '07:00 PM',
      hours: 9,
      status: 'Late',
      department: 'HR',
    },
    {
      id: 5,
      employee: 'David Brown',
      date: '2024-01-15',
      checkIn: null,
      checkOut: null,
      hours: 0,
      status: 'Absent',
      department: 'Marketing',
    },
  ];

  // 🔹 Filtering logic
  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesSearch =
      record.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate =
      filterDate === '' || record.date === filterDate;

    const matchesStatus =
      filterStatus === 'All Status' || record.status === filterStatus;

    return matchesSearch && matchesDate && matchesStatus;
  });

  // 🔹 Status color badges
  const getStatusColor = (status) => {
    switch (status) {
      case 'Present':
        return 'bg-green-100 text-green-800';
      case 'Late':
        return 'bg-yellow-100 text-yellow-800';
      case 'Absent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 🔹 Check-in / Check-out handlers
  const handleCheckIn = () => {
    setHasCheckedIn(true);
    console.log('Checked in at:', new Date().toLocaleTimeString());
  };

  const handleCheckOut = () => {
    setHasCheckedIn(false);
    console.log('Checked out at:', new Date().toLocaleTimeString());
  };

  return (
    <div className="p-6 pt-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1
            className={`text-3xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            } mb-2`}
          >
            Attendance Management
          </h1>
          <p
            className={`text-lg ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Track employee attendance and working hours
          </p>
        </div>

        {/* Check In/Out Button */}
        <div className="mt-4 sm:mt-0">
          {!hasCheckedIn ? (
            <button
              onClick={handleCheckIn}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Check In</span>
            </button>
          ) : (
            <button
              onClick={handleCheckOut}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Check Out</span>
            </button>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <div
        className={`rounded-xl ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-6 mb-6`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search attendance records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  isDarkMode
                    ? 'border-gray-600 bg-gray-700 text-white'
                    : 'border-gray-300 bg-white text-gray-900'
                } focus:ring-2 focus:ring-[#3B378C] focus:border-transparent transition-all duration-200`}
              />
            </div>
          </div>

          <div className="flex space-x-2">
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className={`px-4 py-3 rounded-lg border ${
                isDarkMode
                  ? 'border-gray-600 bg-gray-700 text-white'
                  : 'border-gray-300 bg-white text-gray-900'
              } focus:ring-2 focus:ring-[#3B378C] focus:border-transparent transition-all duration-200`}
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`px-4 py-3 rounded-lg border ${
                isDarkMode
                  ? 'border-gray-600 bg-gray-700 text-white'
                  : 'border-gray-300 bg-white text-gray-900'
              } focus:ring-2 focus:ring-[#3B378C] focus:border-transparent transition-all duration-200`}
            >
              <option>All Status</option>
              <option>Present</option>
              <option>Late</option>
              <option>Absent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div
        className={`rounded-xl ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} overflow-hidden`}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <tr>
                {['Employee', 'Date', 'Check In', 'Check Out', 'Hours', 'Status'].map((head) => (
                  <th
                    key={head}
                    className={`px-6 py-4 text-left text-xs font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-500'
                    } uppercase tracking-wider`}
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody
              className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} divide-y ${
                isDarkMode ? 'divide-gray-700' : 'divide-gray-200'
              }`}
            >
              {filteredRecords.map((record) => (
                <tr
                  key={record.id}
                  className={`hover:${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                  } transition-colors duration-200`}
                >
                  <td className="px-6 py-4 whitespace-nowrap flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#3B378C] flex items-center justify-center text-white font-medium text-sm mr-4">
                      {record.employee
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <div
                        className={`text-sm font-medium ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {record.employee}
                      </div>
                      <div
                        className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        {record.department}
                      </div>
                    </div>
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-900'
                    }`}
                  >
                    {record.date}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-900'
                    }`}
                  >
                    {record.checkIn || '-'}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-900'
                    }`}
                  >
                    {record.checkOut || '-'}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-900'
                    }`}
                  >
                    {record.hours}h
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        record.status
                      )}`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
