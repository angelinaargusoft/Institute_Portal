import {
  getAllProfiles,
  getProfileByUserId,
  createProfile,
  updateBaseProfile,
  updateFacultyProfile,
  updateStudentProfile,
} from "@/features/user/api/userProfileService";

import {
  getAllUsers
} from "@/features/auth/api/userService";

const state = () => ({
  allUsers: [],
  profile: null,
  allProfiles: [],
  loading: false,
  error: null,
});
const getters = {
  allUsers: (state) => state.allUsers,
  profile: (state) => state.profile,
  allProfiles: (state)=> state.allProfiles,
  loading: (state) => state.loading,
  error: (state) => state.error,
};
const actions = {
  async fetchAllUsers({commit}){
    commit("setLoading", true);
    commit("setError", null);
    try{
      const users = await getAllUsers();
      commit("setAllUsers", users);
      return users;
    } catch (err){
      commit("setError", err.message);
      return [];
    } finally{
      commit("setLoding", false);
    }
  },
  async fetchAllProfiles({commit}){
    commit("setLoading", true);
    commit("setError", null);
    try{
      const profiles = await getAllProfiles();
      commit("setAllProfiles", profiles);
      return profiles;
    } catch(err){
      commit("setError", err.message);
      return [];
    } finally{
      commit("setLoading", false);
    }

  },

  async fetchProfile({ commit }, userId) {
    commit("setLoading", true);
    commit("setError", null);
    try {
      const profile = await getProfileByUserId(userId);
      const nestedProfile = profile
        ? {
            ...profile,
            address: {
              addressLine: profile.addressLine || "",
              city: profile.city || "",
              state: profile.state || "",
              country: profile.country || "",
              postalCode: profile.postalCode || "",
            },
          }
        : null;
      commit("setProfile", nestedProfile);
    } catch (err) {
      if (err.response?.status === 404) commit("setProfile", null);
      else commit("setError", err.message);
    } finally {
      commit("setLoading", false);
    }
  },

  async saveProfile({ commit, state }, { userId, profile }) {
    commit("setLoading", true);
    commit("setError", null);
    try {
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
        },
      };
      const savedProfile = state.profile
        ? await updateBaseProfile(userId, payload)
        : await createProfile(payload);
      commit("setProfile", savedProfile);
      return savedProfile;
    } catch (err) {
      commit("setError", err.message);
      return null;
    } finally {
      commit("setLoading", false);
    }
  },

  async saveFacultyProfile({ commit }, { userId, profile }) {
    return await handleRoleProfile(commit, updateFacultyProfile, userId, {
      facultyProfilePic: profile.facultyProfilePic || "",
      designation: profile.designation || "",
      specialization: profile.specialization || "",
      qualifications: profile.qualifications || "",
      yearsOfExperience: profile.yearsOfExperience || 0,
    });
  },

  async saveStudentProfile({ commit }, { userId, profile }) {
    return await handleRoleProfile(commit, updateStudentProfile, userId, {
      studentProfilePic: profile.studentProfilePic || "",
      guardianName: profile.guardianName || "",
      guardianPhone: profile.guardianPhone || "",
      bloodGroup: profile.bloodGroup || "",
      previousSchool: profile.previousSchool || "",
    });
  },
};

async function handleRoleProfile(commit, updateFn, userId, payload) {
  commit("setLoading", true);
  commit("setError", null);
  try {
    const updated = await updateFn(userId, { userId, ...payload });
    commit("setProfile", updated);
    return updated;
  } catch (err) {
    commit("setError", err.message);
    return null;
  } finally {
    commit("setLoading", false);
  }
}
const mutations = {
  setAllUsers: (state, users) => (state.allUsers = users),
  setProfile: (state, profile) => (state.profile = profile),
  setAllProfiles: (state, profiles) => (state.allProfiles = profiles),
  setLoading: (state, val) => (state.loading = val),
  setError: (state, err) => (state.error = err),
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};