import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '../contexts/ThemeContext';
import { get, patch, upload, post } from '../api/axios';

const Profile = () => {
  const { user } = useSelector((s) => s.auth);
  const userId = user?.id || user?._id || null;
  const { isDarkMode, toggleTheme } = useTheme();

  const [form, setForm] = useState({ name: '', email: '', phone: '', photo: '' });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Change password state
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdSuccess, setPwdSuccess] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [pwdForm, setPwdForm] = useState({ currentPassword: '', newPassword: '' });

  const fileRef = useRef();

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    get(`/employees/${userId}`)
      .then((res) => {
        const data = res.data;
        setForm({ name: data.name || '', email: data.email || '', phone: data.phone || '', photo: data.photo || '' });
      })
      .catch((err) => {
        console.error('Failed to fetch user', err);
      })
      .finally(() => setLoading(false));
  }, [userId, user]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
  if (form.phone && !/^\+?[0-9 -]{7,20}$/.test(form.phone)) e.phone = 'Invalid phone';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // For a real app, keep an original snapshot and compare to determine dirty state.

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    setSuccess('');
    try {
      const payload = { name: form.name, email: form.email, phone: form.phone, photo: form.photo };
    await patch(`/employees/${userId}`, payload);
    setSuccess('Profile updated successfully');
    setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Failed to save', err);
    } finally {
      setSaving(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // show preview immediately
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, photo: reader.result }));
    reader.readAsDataURL(file);

    // upload to server endpoint (assumes POST /employees/:id/photo)
    try {
      setUploading(true);
      setUploadProgress(0);
      const resp = await upload(`/employees/${userId}/photo`, file, (evt) => {
        if (evt.total) setUploadProgress(Math.round((evt.loaded / evt.total) * 100));
      });
      // server should return the stored image URL
      const imageUrl = resp.data?.url || resp.data?.photo || null;
      if (imageUrl) setForm((f) => ({ ...f, photo: imageUrl }));
    } catch (err) {
      console.error('Upload failed', err);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleChangePassword = async () => {
    setPwdError('');
    if (!pwdForm.currentPassword || !pwdForm.newPassword) {
      setPwdError('Both fields are required');
      return;
    }
    setPwdLoading(true);
    try {
      await post('/auth/change-password', {
        currentPassword: pwdForm.currentPassword,
        newPassword: pwdForm.newPassword,
      });
      setPwdSuccess('Password changed successfully');
      setPwdForm({ currentPassword: '', newPassword: '' });
      setTimeout(() => setPwdSuccess(''), 3000);
    } catch (err) {
      console.error('Change password failed', err);
      setPwdError(err?.response?.data?.message || 'Failed to change password');
    } finally {
      setPwdLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Profile Settings</h2>

        {loading ? (
          <div className="py-12 flex justify-center">
            <svg className="animate-spin h-8 w-8 text-[#3B378C]" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 flex flex-col items-center md:items-start">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                {form.photo ? (
                  <img src={form.photo} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-3xl text-gray-500">{form.name?.charAt(0)?.toUpperCase() || 'U'}</div>
                )}
              </div>
              <label className="mt-3 w-full">
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                <button type="button" onClick={() => fileRef.current?.click()} className="mt-2 w-full md:w-auto inline-flex items-center justify-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition">
                  Upload photo
                </button>
              </label>
              <p className="text-xs text-gray-500 mt-2">JPEG, PNG up to 2MB (demo stores preview only)</p>
            </div>

            <div className="md:col-span-2">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={`mt-1 block w-full rounded-md border px-3 py-2 ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100`} />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={`mt-1 block w-full rounded-md border px-3 py-2 ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100`} />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={`mt-1 block w-full rounded-md border px-3 py-2 ${errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100`} />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>

                {/* Preferences */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Preferences</h3>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Change password</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">To change password, use the form below (demo: not wired to backend)</p>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                      <input placeholder="Current password" type="password" value={pwdForm.currentPassword} onChange={(e)=>setPwdForm({...pwdForm, currentPassword: e.target.value})} className="px-3 py-2 rounded-md border bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-sm" />
                      <input placeholder="New password" type="password" value={pwdForm.newPassword} onChange={(e)=>setPwdForm({...pwdForm, newPassword: e.target.value})} className="px-3 py-2 rounded-md border bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-sm" />
                    </div>
                    <div className="mt-2 flex items-center space-x-3">
                      <button onClick={handleChangePassword} disabled={pwdLoading} className="text-sm text-[#3B378C] hover:underline inline-flex items-center">
                        {pwdLoading ? <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle></svg> : null}
                        Change password
                      </button>
                      {pwdSuccess && <p className="text-sm text-green-600 dark:text-green-400">{pwdSuccess}</p>}
                      {pwdError && <p className="text-sm text-red-600 dark:text-red-400">{pwdError}</p>}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                  <div>
                    {success && <p className="text-sm text-green-600 dark:text-green-400">{success}</p>}
                  </div>
                  <div className="flex items-center space-x-3">
                    <button onClick={handleSave} disabled={saving || uploading} className="inline-flex items-center px-5 py-2 rounded-md bg-gradient-to-r from-[#3B378C] to-[#5B46D8] text-white hover:brightness-105 transform hover:scale-[1.02] transition">
                      {saving ? (
                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                      ) : null}
                      Save changes
                    </button>
                    <button onClick={() => { /* reset - refetch */ setLoading(true); get(`/employees/${userId}`).then(r=>{const d=r.data; setForm({name:d.name||'', email:d.email||'', phone:d.phone||'', photo:d.photo||''})}).finally(()=>setLoading(false)) }} className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-sm">Reset</button>
                  </div>
                </div>
                {uploading && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 dark:text-gray-300">Uploading photo: {uploadProgress}%</p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-1 overflow-hidden">
                      <div style={{ width: `${uploadProgress}%` }} className="h-full bg-[#3B378C]"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
