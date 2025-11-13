import { get, post, patch, del } from '../../api/axios';

const USERS_BASE = '/users';

export const fetchEmployees = async () => {
  const res = await get(USERS_BASE);
  return res.data; 
};

export const createEmployee = async (payload) => {
  const res = await post(USERS_BASE, payload);
  return res.data; 
};

export const updateEmployee = async (id, payload) => {
  try {
    if (!id) throw new Error('Employee ID is required for update');
    const res = await patch(`${USERS_BASE}/${id}`, payload);
    return res.data;
  } catch (error) {
    console.error('Error updating employee:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteEmployee = async (employeeOrId) => {
  try {
    let id = employeeOrId;
    if (typeof employeeOrId === 'object' && employeeOrId !== null) {
      id = employeeOrId.id || employeeOrId._id;
    }
    if (!id) throw new Error('Employee ID missing');
    const res = await del(`${USERS_BASE}/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting employee:', error.response?.data || error.message);
    throw error;
  }
};

export default {
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
