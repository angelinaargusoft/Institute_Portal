import api from "@/plugins/axios";

// Create a new institute
export async function createInstitute(data) {
  const res = await api.post("/institutes", data);
  return res.data;
}
// Fetch all institutes (for admin or general listing)
export async function fetchInstitutes() {
  const res = await api.get("/institutes");
  return res.data;
}
// Fetch institutes created by a specific user
export async function fetchInstitutesByUser(userId) {
  const res = await api.get(`/institutes/user/${userId}`);
  return res.data;
}