import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const ViewReportsPage = () => {
  const { isDarkMode } = useTheme();
  const [range, setRange] = useState('this_month');
  const [type, setType] = useState('attendance');

  const handleGenerate = () => {
    // In a real app we'd call an API and stream/download a file. For now show a placeholder.
    alert(`Generate ${type} report for ${range}`);
  };

  return (
    <div className="p-6 pt-20 max-w-3xl mx-auto">
      <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
        <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Reports</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Report Type</label>
            <select value={type} onChange={(e)=>setType(e.target.value)} className="w-full px-3 py-2 rounded-md border bg-gray-50 dark:bg-gray-800">
              <option value="attendance">Attendance</option>
              <option value="leaves">Leaves</option>
              <option value="employees">Employees</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date Range</label>
            <select value={range} onChange={(e)=>setRange(e.target.value)} className="w-full px-3 py-2 rounded-md border bg-gray-50 dark:bg-gray-800">
              <option value="this_month">This month</option>
              <option value="last_month">Last month</option>
              <option value="year_to_date">Year to date</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end space-x-3">
          <button onClick={handleGenerate} className="px-4 py-2 rounded-md bg-[#3B378C] text-white">Generate</button>
          <button onClick={()=>alert('Download not implemented in demo')} className="px-4 py-2 rounded-md border">Download</button>
        </div>
      </div>
    </div>
  );
};

export default ViewReportsPage;
