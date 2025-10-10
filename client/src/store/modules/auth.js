import { register, login } from "@/features/auth/api/authService";
import { getUserById } from "@/features/auth/api/userService"; // put this in a separate service
const state = () => ({
  user: null,
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  loading: false,
  error: null,
});
const getters = {
  isAuthenticated: (state) => !!state.accessToken,
  user: (state) => state.user,
  loading: (state) => state.loading,
  error: (state) => state.error,
};
const actions = {
  async register({ commit }, data) {
    commit("setLoading", true);
    try {
      await register(data);
      commit("setError", null);
      return true;
    } catch (err) {
      commit("setError", err.message);
    } finally {
      commit("setLoading", false);
    }
  },
  async login({ commit, dispatch }, data) {
    commit("setLoading", true);
    try {
      const res = await login(data);

      // Save tokens in localStorage
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      localStorage.setItem("user", JSON.stringify(res.user));

      commit("setAccessToken", res.accessToken);
      commit("setRefreshToken", res.refreshToken);
      commit("setUser", res.user);

      // Fetch full user details (by ID)
      await dispatch("fetchUser", res.user.id);
      commit("setError", null);
      return true;
    } catch (err) {
      commit("setError", err.message);
      return false;
    } finally {
      commit("setLoading", false);
    }
  },
  async fetchUser({ commit }, userId) {
    try {
      const user = await getUserById(userId); 
      commit("setUser", user);
    } catch {
      commit("logout");
    }
  },
  async initAuth({ commit, dispatch }) {
    const token = localStorage.getItem("accessToken");
    const refresh = localStorage.getItem("refreshToken");
    const user = localStorage.getItem("user");
    if (token && user) {
      commit("setAccessToken", token);
      commit("setRefreshToken", refresh);
      commit("setUser", JSON.parse(user));
      // fetch updated user details from backend
      try {
        const userId = JSON.parse(user).id;
        await dispatch("fetchUser", userId);
      } catch (err) {
        console.error("Failed to refresh user:", err);
        commit("logout");
      }
    }
  },
  logout({ commit }) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user")
    commit("logout");
  },
};
const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setAccessToken(state, token) {
    state.accessToken = token;
  },
  setRefreshToken(state, token) {
    state.refreshToken = token;
  },
  setLoading(state, value) {
    state.loading = value;
  },
  setError(state, error) {
    state.error = error;
  },
  logout(state) {
    state.user = null;
    state.accessToken = null;
    state.refreshToken = null;
  },
};
export default { namespaced: true, state, getters, actions, mutations };
