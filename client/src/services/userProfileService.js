import api from "@/plugins/axios"; // your Axios instance
// Fetch profile by user ID
export const getProfileByUserId = async (userId) => {
  const res = await api.get(`/userProfiles/${userId}`);
  return res.data;
};
// Create a new profile
export const createProfile = async (data) => {
  const res = await api.post(`/userProfiles`, data);
  return res.data;
};
// Update base profile
export const updateBaseProfile = async (userId, data) => {
  const res = await api.put(`/userProfiles/${userId}/base`, data);
  return res.data;
};
// Update student profile (optional, if you have role-specific fields)
export const updateStudentProfile = async (userId, data) => {
  const res = await api.put(`/userProfiles/${userId}/student`, data);
  return res.data;
};
// Update faculty profile (optional, if you have role-specific fields)
export const updateFacultyProfile = async (userId, data) => {
  const res = await api.put(`/userProfiles/${userId}/faculty`, data);
  return res.data;
};
// Delete profile
export const deleteProfile = async (userId) => {
  const res = await api.delete(`/userProfiles/${userId}`);
  return res.data;
};