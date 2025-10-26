import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const DepartmentsPage = () => {
  const { isDarkMode } = useTheme();
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  // Mock data
  const departments = [
    {
      id: 1,
      name: 'Engineering',
  manager: 'Fkadu Mekonnen',
      employeeCount: 45,
      budget: '$2.5M',
      status: 'Active',
      location: 'San Francisco',
      description: 'Software development and technical innovation'
    },
    {
      id: 2,
      name: 'Product',
      manager: 'Liya Abebe',
      employeeCount: 12,
      budget: '$800K',
      status: 'Active',
      location: 'New York',
      description: 'Product strategy and roadmap planning'
    },
    {
      id: 3,
      name: 'Design',
  manager: 'Muluken Asfaw',
      employeeCount: 8,
      budget: '$500K',
      status: 'Active',
      location: 'Los Angeles',
      description: 'User experience and visual design'
    },
    {
      id: 4,
      name: 'Marketing',
  manager: 'Rahel Abraham',
      employeeCount: 15,
      budget: '$1.2M',
      status: 'Active',
      location: 'Chicago',
      description: 'Brand management and customer acquisition'
    },
    {
      id: 5,
      name: 'Human Resources',
  manager: 'Kaleb Zewdu',
      employeeCount: 6,
      budget: '$400K',
      status: 'Active',
      location: 'Remote',
      description: 'Talent acquisition and employee relations'
    }
  ];

  const filteredDepartments = departments.filter(department => {
    const q = searchTerm.trim().toLowerCase();
    const matchesSearch =
      q === '' ||
      department.name.toLowerCase().includes(q) ||
      department.manager.toLowerCase().includes(q) ||
      department.location.toLowerCase().includes(q);

    const matchesStatus =
      statusFilter === 'All Status' || department.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 pt-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
            Departments
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage organizational departments and their information
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 sm:mt-0 bg-[#3B378C] hover:bg-[#332f7a] text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Add Department</span>
        </button>
      </div>

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
                placeholder="Search departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#3B378C] focus:border-transparent transition-all duration-200`}
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`px-4 py-3 rounded-lg border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#3B378C] focus:border-transparent transition-all duration-200`}
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.map((department) => (
          <div key={department.id} className={`rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-6 hover:shadow-lg transition-all duration-200`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
                  {department.name}
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                  {department.description}
                </p>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    department.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {department.status}
                  </span>
                  <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    {department.location}
                  </span>
                </div>
              </div>
              <div className="flex space-x-1">
                <button className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors duration-200`}>
                  <svg className="w-4 h-4 text-[#3B378C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <button className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors duration-200`}>
                  <svg className="w-4 h-4 text-[#3B378C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors duration-200`}>
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Manager</span>
                <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {department.manager}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Employees</span>
                <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {department.employeeCount}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Budget</span>
                <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {department.budget}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Department Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`w-full max-w-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 mx-4`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Add New Department
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
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
                  Department Name
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#3B378C] focus:border-transparent transition-all duration-200`}
                  placeholder="Enter department name"
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Manager
                </label>
                <select className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#3B378C] focus:border-transparent transition-all duration-200`}>
                  <option>Select Manager</option>
                  <option>Fkadu Mekonnen</option>
                  <option>Liya Abebe</option>
                  <option>Muluken Asfaw</option>
                  <option>Rahel Abraham</option>
                  <option>Kaleb Zewdu</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Location
                  </label>
                  <select className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#3B378C] focus:border-transparent transition-all duration-200`}>
                    <option>San Francisco</option>
                    <option>New York</option>
                    <option>Los Angeles</option>
                    <option>Chicago</option>
                    <option>Remote</option>
                  </select>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Budget
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#3B378C] focus:border-transparent transition-all duration-200`}
                    placeholder="$500K"
                  />
                </div>
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Description
                </label>
                <textarea
                  rows={3}
                  className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#3B378C] focus:border-transparent transition-all duration-200`}
                  placeholder="Enter department description"
                />
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className={`px-6 py-3 rounded-lg border ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} transition-colors duration-200`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#3B378C] hover:bg-[#332f7a] text-white rounded-lg font-medium transition-colors duration-200"
                >
                  Add Department
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentsPage;