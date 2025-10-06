import { createInstitute as apiCreateInstitute, fetchInstitutes as apiFetchInstitutes } from "@/services/instituteService";
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
  async createInstitute({ commit }, institute) {
    commit("setLoading", true);
    try {
      // Call backend service
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