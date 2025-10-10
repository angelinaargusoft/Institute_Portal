import api from '@/plugins/axios'

//register
export const register = async (formData) => {
  try {
    console.log(formData)
    const response = await api.post('/users', formData)
    return response.data
  } catch (error) {
    // Handle and throw a clean error
    const message =
      error.response?.data?.message || 'Registration failed. Please try again.'
    throw new Error(message)
  }
}

// Login
export const login = async (credentials) => {
  try {
    const response = await api.post("/users/login", credentials);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Login failed. Please try again.";
    throw new Error(message);
  }
};

