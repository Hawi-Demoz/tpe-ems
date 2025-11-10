import { get, post, patch, del } from '../../api/axios';

const DEPARTMENTS_BASE = '/api/departments';

export const fetchDepartments = async () => {
  const res = await get(DEPARTMENTS_BASE);
  return res.data; 
};

export const createDepartment = async (payload) => {
  const res = await post(DEPARTMENTS_BASE, payload);
  return res.data; 
};

export const updateDepartment = async (id, payload) => {
  const res = await patch(`${DEPARTMENTS_BASE}/${id}`, payload);
  return res.data;
};

export const deleteDepartment = async (department) => {
  const id = department.id || department._id; 
  if (!id) throw new Error("Department ID missing");
  const res = await del(`${DEPARTMENTS_BASE}/${id}`);
  return res.data;
};

export default {
  fetchDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};


