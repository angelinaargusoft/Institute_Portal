import {
    getEnrollmentById,
    getEnrollmentsByInstitute,
    getEnrollmentsByUser,
    createEnrollment,
    updateEnrollment,
    deleteEnrollment,
  } from "@/features/dashboards/admin/api/studentEnrollmentService";
  const state = () => ({
    enrollments: [],
    currentEnrollment: null,
    loading: false,
    error: null,
  });
  const getters = {
    enrollments: (state) => state.enrollments,
    currentEnrollment: (state) => state.currentEnrollment,
    loading: (state) => state.loading,
    error: (state) => state.error,
  };
  const actions = {
    // Fetch all enrollments for a given institute
    async fetchEnrollmentsByInstitute({ commit }, instituteId) {
      commit("setLoading", true);
      commit("setError", null);
      try {
        const enrollments = await getEnrollmentsByInstitute(instituteId);
        commit("setEnrollments", enrollments);
      } catch (err) {
        commit("setError", err.message);
        commit("setEnrollments", []);
      } finally {
        commit("setLoading", false);
      }
    },
    // Fetch all enrollments for a specific user
    async fetchEnrollmentsByUser({ commit }, userId) {
      commit("setLoading", true);
      commit("setError", null);
      try {
        const enrollments = await getEnrollmentsByUser(userId);
        commit("setEnrollments", enrollments);
      } catch (err) {
        commit("setError", err.message);
        commit("setEnrollments", []);
      } finally {
        commit("setLoading", false);
      }
    },
    // Fetch a single enrollment by its ID
    async fetchEnrollmentById({ commit }, enrollmentId) {
      commit("setLoading", true);
      commit("setError", null);
      try {
        const enrollment = await getEnrollmentById(enrollmentId);
        commit("setCurrentEnrollment", enrollment);
      } catch (err) {
        commit("setError", err.message);
        commit("setCurrentEnrollment", null);
      } finally {
        commit("setLoading", false);
      }
    },
    // Create or update enrollment record
    async saveEnrollment({ commit, dispatch }, { enrollmentId, enrollment, instituteId }) {
      commit("setLoading", true);
      commit("setError", null);
      try {
        let savedEnrollment;
        if (!enrollmentId) {
          // Create new enrollment
          savedEnrollment = await createEnrollment(enrollment);
        } else {
          // Update existing enrollment
          savedEnrollment = await updateEnrollment(enrollmentId, enrollment);
        }
        commit("setCurrentEnrollment", savedEnrollment);
        // Refresh enrollments list for the institute
        if (instituteId) {
          await dispatch("fetchEnrollmentsByInstitute", instituteId);
        }
        return true;
      } catch (err) {
        commit("setError", err.message);
        return false;
      } finally {
        commit("setLoading", false);
      }
    },
    // Delete enrollment
    async removeEnrollment({ commit, dispatch }, { enrollmentId, instituteId }) {
      commit("setLoading", true);
      commit("setError", null);
      try {
        await deleteEnrollment(enrollmentId);
        // Refresh the list for that institute
        if (instituteId) {
          await dispatch("fetchEnrollmentsByInstitute", instituteId);
        }
        return true;
      } catch (err) {
        commit("setError", err.message);
        return false;
      } finally {
        commit("setLoading", false);
      }
    },
    // Reset current enrollment
    resetCurrentEnrollment({ commit }) {
      commit("setCurrentEnrollment", null);
    },
  };
  const mutations = {
    setEnrollments(state, enrollments) {
      state.enrollments = enrollments;
    },
    setCurrentEnrollment(state, enrollment) {
      state.currentEnrollment = enrollment;
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