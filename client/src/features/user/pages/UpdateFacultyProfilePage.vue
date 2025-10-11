<template>
    <v-container>
      <!-- Title -->
      <h2 class="mb-4">{{ isFaculty ? "Edit Profile" : "Add Profile" }}</h2>
      <!-- Error Alert -->
      <v-alert v-if="error" type="error" dense class="mb-4">{{ error }}</v-alert>
      <!-- Faculty Profile Form -->
      <faculty-profile-form v-model="localProfile" />
      <!-- Save / Update Button -->
      <v-btn
        color="primary"
        :loading="loading"
        class="mt-4"
        @click="onSave"
      >
        {{ isFaculty ? "Update Profile" : "Create Profile" }}
      </v-btn>
    </v-container>
  </template>
  <script setup>
  import { ref, computed, onMounted } from "vue";
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  import FacultyProfileForm from "@/features/user/components/FacultyProfileForm.vue";
  const store = useStore();
  const router = useRouter();
  // --- Vuex State ---
  const user = computed(() => store.getters["auth/user"]);
  const profileFromStore = computed(() => store.getters["userProfile/profile"]);
  const loading = computed(() => store.getters["userProfile/loading"]);
  const error = computed(() => store.getters["userProfile/error"]);
  // --- Role check ---
  const isFaculty = computed(() => user.value?.roles?.includes("faculty"));
  // --- Local reactive profile (faculty fields only) ---
  const localProfile = ref({
    facultyProfilePic: "",
    designation: "",
    specialization: "",
    qualifications: "",
    yearsOfExperience: 0,
  });
  // --- Load existing profile ---
  onMounted(async () => {
    if (!user.value?.id || !isFaculty.value) return;
    await store.dispatch("userProfile/fetchProfile", user.value.id);
    const existing = profileFromStore.value;
    if (existing) {
      localProfile.value = {
        facultyProfilePic: existing.facultyProfilePic || "",
        designation: existing.designation || "",
        specialization: existing.specialization || "",
        qualifications: existing.qualifications || "",
        yearsOfExperience: existing.yearsOfExperience || 0,
      };
    }
  });
  // --- Save / Update Profile ---
  const onSave = async () => {
    if (!user.value?.id) return;
    const payload = {
      ...localProfile.value,
      userId: user.value.id,
    };
    // Dispatch Vuex action to save faculty profile
    const ok = await store.dispatch("userProfile/saveFacultyProfile", {
      userId: user.value.id,
      profile: payload,
    });
    if (ok) {
      router.push("/profile/faculty");
    }
  };
  </script>
  <style scoped>
  h2 {
    font-weight: 600;
  }
  </style>