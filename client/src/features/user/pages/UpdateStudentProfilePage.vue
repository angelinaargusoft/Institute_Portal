<template>
    <v-container>
      <!-- Title -->
      <h2 class="mb-4">{{ isStudent ? "Edit Profile" : "Add Profile" }}</h2>
      <!-- Error Alert -->
      <v-alert v-if="error" type="error" dense class="mb-4">{{ error }}</v-alert>
      <!-- Faculty Profile Form -->
      <student-profile-form v-model="localProfile" />
      <!-- Save / Update Button -->
      <v-btn
        color="primary"
        :loading="loading"
        class="mt-4"
        @click="onSave"
      >
        {{ isStudent ? "Update Profile" : "Create Profile" }}
      </v-btn>
    </v-container>
  </template>
  <script setup>
  import { ref, computed, onMounted } from "vue";
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  import StudentProfileForm from "@/features/user/components/StudentProfileForm.vue";
  const store = useStore();
  const router = useRouter();
  // --- Vuex State ---
  const user = computed(() => store.getters["auth/user"]);
  const profileFromStore = computed(() => store.getters["userProfile/profile"]);
  const loading = computed(() => store.getters["userProfile/loading"]);
  const error = computed(() => store.getters["userProfile/error"]);
  // --- Role check ---
  const isStudent = computed(() => user.value?.roles?.includes("student"));
  // --- Local reactive profile (faculty fields only) ---
  const localProfile = ref({
    studentProfilePicProfilePic: "",
    guardianName: "",
    guardianPhone: "",
    bloodGroup: "",
    previousSchool: "",
  });
  // --- Load existing profile ---
  onMounted(async () => {
    if (!user.value?.id || !isStudent.value) return;
    await store.dispatch("userProfile/fetchProfile", user.value.id);
    const existing = profileFromStore.value;
    if (existing) {
      localProfile.value = {
        studentProfilePic: existing.studentProfilePic || "",
        guardianName: existing.guardianName || "",
        guardianPhone: existing.guardianPhone || "",
        bloodGroup: existing.bloodGroup || "",
        previousSchool: existing.previousSchool || "",
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
    console.log(payload)
    // Dispatch Vuex action to save faculty profile
    const ok = await store.dispatch("userProfile/saveStudentProfile", {
      userId: user.value.id,
      profile: payload,
    });
    if (ok) {
      router.push("/profile/student");
    }
  };
  </script>
  <style scoped>
  h2 {
    font-weight: 600;
  }
  </style>