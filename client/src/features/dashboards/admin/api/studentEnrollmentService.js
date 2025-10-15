import api from "@/plugins/axios"; 

export const getEnrollmentsByInstitute = async (instituteId) => {
  const res = await api.get(`/student-enrollments/institute/${instituteId}`);
  return res.data;
};

export const getEnrollmentsByUser = async (userId) => {
  const res = await api.get(`/student-enrollments/user/${userId}`);
  return res.data;
};

export const getEnrollmentById = async (id) => {
  const res = await api.get(`/student-enrollments/${id}`);
  return res.data;
};

export const createEnrollment = async (data) => {
  const res = await api.post(`/student-enrollments`, data);
  return res.data;
};

export const updateEnrollment = async (id) => {
  const res = await api.put(`/student-enrollments/${id}`);
  return res.data;
};

export const deleteEnrollment = async (id) => {
  const res = await api.delete(`/student-enrollments/${id}`);
  return res.data;
};