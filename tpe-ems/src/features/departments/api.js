import { get, post, patch, del } from '../../api/axios';

const DEPARTMENTS_BASE = '/departments';

export const fetchDepartments = async () => {
  const res = await get(DEPARTMENTS_BASE);
  return res.data; 
};

export const createDepartment = async (payload) => {
  const res = await post(DEPARTMENTS_BASE, payload);
  return res.data; 
};

export const updateDepartment = async (id, payload) => {
  try {
    console.log('Updating department with ID:', id);
    console.log('Payload:', payload);
    const res = await patch(`${DEPARTMENTS_BASE}/${id}`, payload);
    return res.data;
  } catch (error) {
    console.error('Error updating department:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteDepartment = async (departmentOrId) => {
  try {
    let id = departmentOrId;
    if (typeof departmentOrId === 'object' && departmentOrId !== null) {
      id = departmentOrId.id || departmentOrId._id;
    }
    if (!id) throw new Error('Department ID missing');
    const res = await del(`${DEPARTMENTS_BASE}/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting department:', error.response?.data || error.message);
    throw error;
  }
};

export default {
  fetchDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};


