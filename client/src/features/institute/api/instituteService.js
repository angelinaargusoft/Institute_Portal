import api from "@/plugins/axios"; // your Axios instance
// Fetch all institutes
export const getInstitutes = async () => {
  const res = await api.get(`/institutes`);
  return res.data;
};
// Fetch institute by ID
export const getInstituteById = async (instituteId) => {
  const res = await api.get(`/institutes/${instituteId}`);
  return res.data;
};
// Create a new institute
export const createInstitute = async (data) => {
  console.log(data);
  const res = await api.post(`/institutes`, data);
  console.log(res.data)
  return res.data.institute;
};
// Update institute details
export const updateInstitute = async (instituteId, data) => {
  console.log(data);
  const res = await api.put(`/institutes/${instituteId}`, data);
  return res.data;
};
// Delete an institute
export const deleteInstitute = async (instituteId) => {
  const res = await api.delete(`/institutes/${instituteId}`);
  return res.data;
};
// Fetch institutes by user ID
export const getInstitutesByUser = async (userId) => {
  const res = await api.get(`/institutes/user/${userId}`);
  return res.data;
};