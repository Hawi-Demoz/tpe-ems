import { get, post, patch, del } from '../../api/axios';

const DEPARTMENTS_BASE = '/departments';

export const fetchDepartments = async () => {
  const res = await get(DEPARTMENTS_BASE);
  return res.data; // expect array of { id?, name, code, description }
};

export const createDepartment = async (payload) => {
  // payload: { name, code, description }
  const res = await post(DEPARTMENTS_BASE, payload);
  return res.data; // created department
};

export const updateDepartment = async (id, payload) => {
  // payload: { name?, code?, description? }
  const res = await patch(`${DEPARTMENTS_BASE}/${id}`, payload);
  return res.data; // updated department
};

export const deleteDepartment = async (id) => {
  const res = await del(`${DEPARTMENTS_BASE}/${id}`);
  return res.data; // could be success message or deleted entity
};

export default {
  fetchDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};


