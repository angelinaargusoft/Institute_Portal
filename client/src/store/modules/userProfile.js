import {
    getProfileByUserId,
    createProfile,
    updateBaseProfile,
  } from "@/services/userProfileService";

  const state = () => ({
    profile: null,
    loading: false,
    error: null,
  });

  const getters = {
    profile: (state) => state.profile,
    loading: (state) => state.loading,
    error: (state) => state.error,
  };
  
  const actions = {
    // Fetch profile from backend
    async fetchProfile({ commit }, userId) {
      commit("setLoading", true);
      try {
        const profile = await getProfileByUserId(userId);
        commit("setProfile", profile || null);
      } catch (err) {
        if (err.response?.status === 404) {
          commit("setProfile", null); // profile not found
        } else {
          commit("setError", err.message);
        }
      } finally {
        commit("setLoading", false);
      }
    },
    // Save or update profile
    async saveProfile({ commit }, { userId, profile }) {
        commit("setLoading", true);
        try {
          const payload = {
            ...profile,
            userId,
            address: {
              addressLine: profile.addressLine,
              city: profile.city,
              state: profile.state,
              country: profile.country,
              postalCode: profile.postalCode,
              addressType: profile.addressType,
            },
          };
          let savedProfile;
          if (!profile.id) {
            // Create new profile
            savedProfile = await createProfile(payload);
          } else {
            // Update existing profile
            savedProfile = await updateBaseProfile(userId, payload);
          }
          commit("setProfile", savedProfile);
          return true;
        } catch (err) {
          commit("setError", err.message);
          return false;
        } finally {
          commit("setLoading", false);
        }
      }      
  };
  const mutations = {
    setProfile(state, profile) {
      state.profile = profile;
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