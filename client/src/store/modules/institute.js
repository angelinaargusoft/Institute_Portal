import {
  createInstitute as apiCreateInstitute,
  fetchInstitutes as apiFetchInstitutes,
  fetchInstitutesByUser as apiFetchInstitutesByUser,
} from "@/services/instituteService";
const state = () => ({
  institutes: [],
  loading: false,
  error: null,
});
const getters = {
  institutes: (state) => state.institutes,
  loading: (state) => state.loading,
  error: (state) => state.error,
};
const actions = {
  // Create a new institute
  async createInstitute({ commit }, institute) {
    commit("setLoading", true);
    try {
      const created = await apiCreateInstitute(institute);
      commit("addInstitute", created);
      return created;
    } catch (err) {
      commit("setError", err.message || "Failed to create institute");
      throw err;
    } finally {
      commit("setLoading", false);
    }
  },
  // Fetch all institutes (admin/global view)
  async fetchInstitutes({ commit }) {
    commit("setLoading", true);
    try {
      const data = await apiFetchInstitutes();
      commit("setInstitutes", data);
    } catch (err) {
      commit("setError", err.message || "Failed to fetch institutes");
    } finally {
      commit("setLoading", false);
    }
  },
  // Fetch institutes created by a specific user (for sidebar)
  async fetchInstitutesByUser({ commit }, userId) {
    commit("setLoading", true);
    try {
      const data = await apiFetchInstitutesByUser(userId);
      commit("setInstitutes", data);
    } catch (err) {
      commit("setError", err.message || "Failed to fetch user's institutes");
    } finally {
      commit("setLoading", false);
    }
  },
};
const mutations = {
  setInstitutes(state, institutes) {
    state.institutes = institutes;
  },
  addInstitute(state, institute) {
    state.institutes.push(institute);
  },
  setLoading(state, val) {
    state.loading = val;
  },
  setError(state, err) {
    state.error = err;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};