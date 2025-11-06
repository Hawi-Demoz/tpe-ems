import React, { useEffect, useMemo, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { fetchDepartments, createDepartment, updateDepartment, deleteDepartment } from './api';

const DepartmentsPage = () => {
  const { isDarkMode } = useTheme();
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [departments, setDepartments] = useState([]);

  const [form, setForm] = useState({ name: '', code: '', description: '' });
  const [submitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchDepartments();
        setDepartments(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e?.normalizedMessage || 'Failed to load departments');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredDepartments = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return departments;
    return departments.filter((d) => {
      const name = (d.name || '').toLowerCase();
      const code = (d.code || '').toLowerCase();
      const description = (d.description || '').toLowerCase();
      return name.includes(q) || code.includes(q) || description.includes(q);
    });
  }, [departments, searchTerm]);

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

      {/* Search */}
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
          {error && (
            <div className="text-sm text-red-600">{error}</div>
          )}
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className={`col-span-full ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Loading departments…</div>) :
          filteredDepartments.map((department) => (
            <div key={department.id || department.code} className={`rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-6 hover:shadow-lg transition-all duration-200`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
                    {department.name}
                  </h3>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-2`}>
                    Code: {department.code}
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {department.description}
                  </p>
                </div>
                <div className="flex items-center space-x-1 ml-3">
                  <button
                    onClick={() => setEditing(department)}
                    className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors duration-200`}
                    title="Edit"
                  >
                    <svg className="w-4 h-4 text-[#3B378C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setDeleting(department)}
                    className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors duration-200`}
                    title="Delete"
                  >
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        {!loading && filteredDepartments.length === 0 && !error && (
          <div className={`col-span-full ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>No departments found.</div>
        )}
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
            
            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                setSubmitting(true);
                setError('');
                try {
                  const payload = {
                    name: form.name.trim(),
                    code: form.code.trim(),
                    description: form.description.trim(),
                  };
                  if (!payload.name || !payload.code) {
                    throw new Error('Name and Code are required');
                  }
                  await createDepartment(payload);
                  // refresh list
                  const data = await fetchDepartments();
                  setDepartments(Array.isArray(data) ? data : []);
                  setShowAddModal(false);
                  setForm({ name: '', code: '', description: '' });
                } catch (e) {
                  setError(e?.normalizedMessage || e?.message || 'Failed to create department');
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Department Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#3B378C] focus:border-transparent transition-all duration-200`}
                  placeholder="Engineering"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Code
                </label>
                <input
                  type="text"
                  value={form.code}
                  onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#3B378C] focus:border-transparent transition-all duration-200`}
                  placeholder="ENG"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Description
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#3B378C] focus:border-transparent transition-all duration-200`}
                  placeholder="Handles product engineering"
                />
              </div>

              {error && (
                <div className="text-sm text-red-600">{error}</div>
              )}
              
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
                  disabled={submitting}
                  className={`px-6 py-3 bg-[#3B378C] hover:bg-[#332f7a] text-white rounded-lg font-medium transition-colors duration-200 ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {submitting ? 'Saving…' : 'Add Department'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Edit Department Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`w-full max-w-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 mx-4`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Edit Department
              </h3>
              <button
                onClick={() => setEditing(null)}
                className={`text-gray-400 hover:text-gray-600 transition-colors duration-200`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                setSubmitting(true);
                setError('');
                try {
                  const payload = {
                    name: editing.name?.trim() || '',
                    code: editing.code?.trim() || '',
                    description: editing.description?.trim() || '',
                  };
                  if (!payload.name || !payload.code) {
                    throw new Error('Name and Code are required');
                  }
                  await updateDepartment(editing.id || editing.code, payload);
                  const data = await fetchDepartments();
                  setDepartments(Array.isArray(data) ? data : []);
                  setEditing(null);
                } catch (e) {
                  setError(e?.normalizedMessage || e?.message || 'Failed to update department');
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Department Name
                </label>
                <input
                  type="text"
                  value={editing.name || ''}
                  onChange={(e) => setEditing((d) => ({ ...d, name: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#3B378C] focus:border-transparent transition-all duration-200`}
                  placeholder="Engineering"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Code
                </label>
                <input
                  type="text"
                  value={editing.code || ''}
                  onChange={(e) => setEditing((d) => ({ ...d, code: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#3B378C] focus:border-transparent transition-all duration-200`}
                  placeholder="ENG"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editing.description || ''}
                  onChange={(e) => setEditing((d) => ({ ...d, description: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-[#3B378C] focus:border-transparent transition-all duration-200`}
                  placeholder="Handles product engineering"
                />
              </div>
              {error && (
                <div className="text-sm text-red-600">{error}</div>
              )}
              <div className="flex items-center justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className={`px-6 py-3 rounded-lg border ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} transition-colors duration-200`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`px-6 py-3 bg-[#3B378C] hover:bg-[#332f7a] text-white rounded-lg font-medium transition-colors duration-200 ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {submitting ? 'Saving…' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`w-full max-w-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 mx-4`}>
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Delete Department</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-6`}>Are you sure you want to delete {deleting.name}?</p>
            {error && <div className="text-sm text-red-600 mb-4">{error}</div>}
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleting(null)}
                className={`px-5 py-2 rounded-lg border ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} transition-colors duration-200`}
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  setSubmitting(true);
                  setError('');
                  try {
                    await deleteDepartment(deleting.id || deleting.code);
                    const data = await fetchDepartments();
                    setDepartments(Array.isArray(data) ? data : []);
                    setDeleting(null);
                  } catch (e) {
                    setError(e?.normalizedMessage || e?.message || 'Failed to delete department');
                  } finally {
                    setSubmitting(false);
                  }
                }}
                disabled={submitting}
                className={`px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {submitting ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentsPage;