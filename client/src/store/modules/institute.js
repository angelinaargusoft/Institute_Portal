import {
  getInstitutes,
  getInstituteById,
  createInstitute,
  updateInstitute,
  deleteInstitute,
  getInstitutesByUser,
} from "@/services/instituteService";
const state = () => ({
  institutes: [],
  currentInstitute: null,
  loading: false,
  error: null,
});
const getters = {
  institutes: (state) => state.institutes,
  currentInstitute: (state) => state.currentInstitute,
  loading: (state) => state.loading,
  error: (state) => state.error,
};
const actions = {
  // Fetch all institutes (admin/global view)
  async fetchInstitutes({ commit }) {
    commit("setLoading", true);
    commit("setError", null);
    try {
      const institutes = await getInstitutes();
      commit("setInstitutes", institutes);
    } catch (err) {
      commit("setError", err.message);
    } finally {
      commit("setLoading", false);
    }
  },
  // Fetch single institute by ID (used in edit mode)
  async fetchInstituteById({ commit }, instituteId) {
    commit("setLoading", true);
    commit("setError", null);
    try {
      const institute = await getInstituteById(instituteId);
      if (institute) {
        // Transform flat backend object into nested format
        const nestedInstitute = {
          ...institute,
          address: {
            addressLine: institute.addressLine || "",
            city: institute.city || "",
            state: institute.state || "",
            country: institute.country || "",
            postalCode: institute.postalCode || "",
            addressType: institute.addressType || "current",
          }
        };
      commit("setCurrentInstitute", nestedInstitute);
      }
    } catch (err) {
      commit("setError", err.message);
      commit("setCurrentInstitute", null);
    } finally {
      commit("setLoading", false);
    }
  },
  // Fetch institutes created or associated with a specific user
  async fetchInstitutesByUser({ commit }, userId) {
    commit("setLoading", true);
    commit("setError", null);
    try {
      const institutes = await getInstitutesByUser(userId);
      commit("setInstitutes", institutes);
    } catch (err) {
      commit("setError", err.message);
      commit("setInstitutes", []);
    } finally {
      commit("setLoading", false);
    }
  },
  // Create or update institute
  async saveInstitute({ commit, dispatch }, { instituteId, institute }) {
    commit("setLoading", true);
    commit("setError", null);
    try {
      let savedInstitute;
      if (!instituteId) {
        // Create new institute
        savedInstitute = await createInstitute(institute);
      } else {
        // Update existing institute
        savedInstitute = await updateInstitute(instituteId, institute);
      }
      commit("setCurrentInstitute", savedInstitute);
      // Refresh the user's institutes after save
      if (institute.createdBy) {
        await dispatch("fetchInstitutesByUser", institute.createdBy);
      }
      return true;
    } catch (err) {
      commit("setError", err.message);
      return false;
    } finally {
      commit("setLoading", false);
    }
  },
  // Delete institute
  async removeInstitute({ commit, dispatch }, { instituteId, userId }) {
    commit("setLoading", true);
    commit("setError", null);
    try {
      await deleteInstitute(instituteId);
      // Refresh list for the user
      if (userId) {
        await dispatch("fetchInstitutesByUser", userId);
      }
      return true;
    } catch (err) {
      commit("setError", err.message);
      return false;
    } finally {
      commit("setLoading", false);
    }
  },
  // Reset current institute (useful when navigating away)
  resetCurrentInstitute({ commit }) {
    commit("setCurrentInstitute", null);
  },
};
const mutations = {
  setInstitutes(state, institutes) {
    state.institutes = institutes;
  },
  setCurrentInstitute(state, institute) {
    state.currentInstitute = institute;
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