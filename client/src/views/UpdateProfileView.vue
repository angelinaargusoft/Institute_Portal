<template>
  <v-container>
    <!-- Title -->
    <h2 class="mb-4">{{ isEdit ? "Edit Profile" : "Add Profile" }}</h2>
    <!-- Error Alert -->
    <v-alert v-if="error" type="error" dense class="mb-4">{{ error }}</v-alert>
    <!-- Profile Form -->
    <base-profile-form v-model="localProfile" />
    <!-- Save Button -->
    <v-btn
      color="primary"
      :loading="loading"
      class="mt-4"
      @click="onSave"
    >
      {{ isEdit ? "Update Profile" : "Create Profile" }}
    </v-btn>
  </v-container>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import BaseProfileForm from "@/components/BaseProfileForm.vue";
const store = useStore();
const router = useRouter();
// --- Vuex State ---
const user = computed(() => store.getters["auth/user"]);
const profileFromStore = computed(() => store.getters["userProfile/profile"]);
const loading = computed(() => store.getters["userProfile/loading"]);
const error = computed(() => store.getters["userProfile/error"]);
// --- Local reactive profile for v-model ---
const localProfile = ref({
  firstName: "",
  lastName: "",
  dob: "",
  gender: "",
  phone: "",
  address: {
    addressLine: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    addressType: "current",
  },
});
const isEdit = ref(false);
// --- Load existing profile if available ---
onMounted(async () => {
  if (!user.value?.id) return;
  await store.dispatch("userProfile/fetchProfile", user.value.id);
  const existing = store.getters["userProfile/profile"];
  if (existing) {
    // Prefill localProfile safely
    localProfile.value = {
      firstName: existing.firstName || "",
      lastName: existing.lastName || "",
      dob: existing.dob || "",
      gender: existing.gender || "",
      phone: existing.phone || "",
      address: existing.address
        ? { ...existing.address }
        : {
            addressLine: "",
            city: "",
            state: "",
            country: "",
            postalCode: "",
            addressType: "current",
          },
    };
    isEdit.value = true;
  }
});
// --- Save / Update Profile ---
const onSave = async () => {
  if (!user.value?.id) return;
  // Prepare payload exactly as backend expects
  const payload = {
    ...localProfile.value,
    userId: user.value.id,
    address: { ...localProfile.value.address },
  };
  const ok = await store.dispatch("userProfile/saveProfile", {
    userId: user.value.id,
    profile: payload,
  });
  if (ok) router.push("/profile");
};
</script>