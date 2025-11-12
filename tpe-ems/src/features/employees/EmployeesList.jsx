import React from 'react';

/**
 * EmployeesList
 * Simple presentational component that renders a list of employees.
 * Props:
 *  - employees: array of user objects { id/_id, name, email, role }
 *  - loading: boolean for loading state
 *  - error: string error message (optional)
 *  - onDelete: function(user) => void
 */
export default function EmployeesList({ employees = [], loading = false, error = '', onDelete }) {
  if (loading) {
    return <div className="p-6 text-sm text-gray-500">Loading employees...</div>;
  }

  if (error) {
    return <div className="p-6 text-sm text-red-600">{error}</div>;
  }

  if (!employees.length) {
    return <div className="p-6 text-sm text-gray-500">No employees found.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Email</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Role</th>
            <th className="px-4 py-2 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {employees.map((emp) => {
            const key = emp.id || emp._id || emp.email;
            return (
              <tr key={key} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2 text-sm font-medium text-gray-900">{emp.name}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{emp.email}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{emp.role}</td>
                <td className="px-4 py-2 text-sm text-right">
                  <button
                    onClick={() => onDelete && onDelete(emp)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
