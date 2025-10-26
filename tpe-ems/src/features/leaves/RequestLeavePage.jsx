import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { post } from '../../api/axios';

const RequestLeavePage = () => {
  const { isDarkMode } = useTheme();
  const [form, setForm] = useState({ type: 'Annual Leave', startDate: '', endDate: '', reason: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.startDate) e.startDate = 'Start date required';
    if (!form.endDate) e.endDate = 'End date required';
    if (!form.reason.trim()) e.reason = 'Reason required';
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setError('');
    const errs = validate();
    if (Object.keys(errs).length) {
      setError(Object.values(errs).join('. '));
      return;
    }
    setLoading(true);
    try {
      // POST to /leaves (assumed API)
      await post('/leaves', form);
      setSuccess('Leave request submitted');
      setTimeout(() => setSuccess(''), 3000);
      setForm({ type: 'Annual Leave', startDate: '', endDate: '', reason: '' });
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 pt-20 max-w-3xl mx-auto">
      <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
        <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Request Leave</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Leave Type</label>
            <select value={form.type} onChange={(e)=>setForm({...form, type: e.target.value})} className="w-full px-3 py-2 rounded-md border bg-gray-50 dark:bg-gray-800">
              <option>Annual Leave</option>
              <option>Sick Leave</option>
              <option>Personal Leave</option>
              <option>Maternity Leave</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input type="date" value={form.startDate} onChange={(e)=>setForm({...form, startDate: e.target.value})} className="w-full px-3 py-2 rounded-md border bg-gray-50 dark:bg-gray-800" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input type="date" value={form.endDate} onChange={(e)=>setForm({...form, endDate: e.target.value})} className="w-full px-3 py-2 rounded-md border bg-gray-50 dark:bg-gray-800" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Reason</label>
            <textarea value={form.reason} onChange={(e)=>setForm({...form, reason: e.target.value})} rows={4} className="w-full px-3 py-2 rounded-md border bg-gray-50 dark:bg-gray-800" />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          <div className="flex justify-end">
            <button type="submit" disabled={loading} className="px-4 py-2 rounded-md bg-[#3B378C] text-white">
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestLeavePage;
