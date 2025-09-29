import axios from 'axios'
const api = axios.create({
  baseURL: 'http://localhost:8000/api', 
  headers: {
    'Content-Type': 'application/json'
  }
})

// Attach token automatically if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: refresh token on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // check if 401 (unauthorized) and we haven’t retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = store.state.auth.refreshToken || localStorage.getItem("refreshToken");
      if (!refreshToken) {
        store.dispatch("auth/logout");
        return Promise.reject(error);
      }
      try {
        // call backend to get new access token
        const res = await axios.post("http://localhost:8000/api/users/refresh-token", {
          refreshToken,
        });
        // update token in Vuex and localStorage
        store.commit("auth/setAccessToken", res.data.accessToken);
        localStorage.setItem("accessToken", res.data.accessToken);

        // retry original request with new token
        originalRequest.headers["Authorization"] = `Bearer ${res.data.accessToken}`;
        return api(originalRequest);
      } catch (err) {
        store.dispatch("auth/logout");
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api