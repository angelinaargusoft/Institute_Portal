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
        if (profile) {
          // Transform flat backend object into nested format
          const nestedProfile = {
            ...profile,
            address: {
              addressLine: profile.addressLine || "",
              city: profile.city || "",
              state: profile.state || "",
              country: profile.country || "",
              postalCode: profile.postalCode || "",
              addressType: profile.addressType || "current",
            }
          };
          commit("setProfile", nestedProfile);
        } else {
          commit("setProfile", null);
        }
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
      console.log(profile)
      try {
         // Normalize date to YYYY-MM-DD format
    const normalizedDob = profile.dob
    ? new Date(profile.dob).toISOString().split("T")[0]
    : null;
        const payload = {
          ...profile,
          userId,
          dob: normalizedDob,
          address: {
            addressLine: profile.address?.addressLine || "",
            city: profile.address?.city || "",
            state: profile.address?.state || "",
            country: profile.address?.country || "",
            postalCode: profile.address?.postalCode || "",
            addressType: profile.address?.addressType || "current",
          },
        };
        let savedProfile;
        if (!profile.userId) {
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