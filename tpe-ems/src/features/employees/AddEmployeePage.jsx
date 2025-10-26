import React, { useState, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { post, upload } from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const AddEmployeePage = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'employee',
    department: '',
    status: 'Active',
    joinDate: '',
    photo: '',
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileRef = useRef();

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.department) e.department = 'Department is required';
    if (!form.joinDate) e.joinDate = 'Join date is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      setUploadProgress(0);
      const resp = await upload('/employees/photo', file, (evt) => {
        if (evt.total) setUploadProgress(Math.round((evt.loaded / evt.total) * 100));
      });
      const url = resp.data?.url || resp.data?.photo || '';
      setForm((f) => ({ ...f, photo: url }));
    } catch (err) {
      console.error('Upload failed', err);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      const payload = { ...form };
      // POST to /employees - API should create and return created resource
      await post('/employees', payload);
      setSuccess('Employee created successfully');
      setTimeout(() => setSuccess(''), 3000);
      navigate('/employees');
    } catch (err) {
      console.error('Create failed', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 pt-20 max-w-3xl mx-auto">
      <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
        <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Add Employee</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full name</label>
            <input value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} className={`w-full px-3 py-2 rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-gray-50 dark:bg-gray-800`} />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} className={`w-full px-3 py-2 rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-gray-50 dark:bg-gray-800`} />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <select value={form.role} onChange={(e)=>setForm({...form, role: e.target.value})} className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Department</label>
              <input value={form.department} onChange={(e)=>setForm({...form, department: e.target.value})} className={`w-full px-3 py-2 rounded-md border ${errors.department ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-gray-50 dark:bg-gray-800`} />
              {errors.department && <p className="text-xs text-red-500 mt-1">{errors.department}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select value={form.status} onChange={(e)=>setForm({...form, status: e.target.value})} className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Join date</label>
              <input value={form.joinDate} onChange={(e)=>setForm({...form, joinDate: e.target.value})} type="date" className={`w-full px-3 py-2 rounded-md border ${errors.joinDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-gray-50 dark:bg-gray-800`} />
              {errors.joinDate && <p className="text-xs text-red-500 mt-1">{errors.joinDate}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Photo (optional)</label>
            <div className="flex items-center space-x-3">
              <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
              <button type="button" onClick={()=>fileRef.current?.click()} className="px-3 py-2 rounded-md border bg-white dark:bg-gray-700">Choose file</button>
              <div className="text-sm text-gray-500">{uploading ? `Uploading ${uploadProgress}%` : (form.photo ? 'Uploaded' : 'No file')}</div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <div>
              {success && <p className="text-sm text-green-600">{success}</p>}
            </div>
            <div className="flex items-center space-x-3">
              <button type="button" onClick={()=>navigate('/employees')} className="px-4 py-2 rounded-md border">Cancel</button>
              <button type="submit" disabled={saving} className="px-4 py-2 rounded-md bg-[#3B378C] text-white">{saving ? 'Saving...' : 'Create Employee'}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeePage;
