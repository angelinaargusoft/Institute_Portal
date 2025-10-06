import api from "@/plugins/axios";
// Create new institute
export const createInstitute = async (institute) => {
  /*
    Expected payload structure:
    {
      name,
      email,
      description,
      logoUrl,
      status,
      createdBy,
      address: { addressLine, city, state, country, postalCode }
    }
  */
 console.log(institute)
  const response = await api.post("/institutes", institute);
  return response.data;
};
// Fetch all institutes
export const fetchInstitutes = async () => {
  const response = await api.get("/institutes");
  return response.data;
};