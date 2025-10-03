
<template>
<v-container>
  <h2 class="mb-4">{{ isEdit ? "Edit Profile" : "Add Profile" }}</h2>
  <v-alert v-if="error" type="error" dense class="mb-4">
    {{ error }}
  </v-alert>
  <!-- Base Profile Form -->
  <base-profile-form
    v-model="localProfile"
    :isEdit="isEdit"
  />
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
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import BaseProfileForm from "@/components/BaseProfileForm.vue";
const store = useStore();
const router = useRouter();
const localProfile = ref({ address: {} });
const loading = computed(() => store.getters["userProfile/loading"]);
const error = computed(() => store.getters["userProfile/error"]);
const user = computed(() => store.getters["auth/user"]);
const isEdit = ref(false);
const loadProfile = async () => {
if (user.value?.id) {
  await store.dispatch("userProfile/fetchProfile", user.value.id);
  const existing = store.getters["userProfile/profile"];
  if (existing) {
    // Profile exists → prefill form
    localProfile.value = {
      ...existing,
      address: existing.address || {},
    };
    isEdit.value = true;
  } else {
    // No profile → empty form
    localProfile.value = { address: {} };
    isEdit.value = false;
  }
}
};
onMounted(loadProfile);
// Watch user change (if login happens after mount)
watch(user, () => loadProfile());
const onSave = async () => {
if (!user.value?.id) return;
// Prepare payload with address object
const payload = {
  ...localProfile.value,
  userId: user.value.id,
  address: {
    addressLine: localProfile.value.address.addressLine || "",
    city: localProfile.value.address.city || "",
    state: localProfile.value.address.state || "",
    country: localProfile.value.address.country || "",
    postalCode: localProfile.value.address.postalCode || "",
    addressType: localProfile.value.address.addressType || "current",
  },
};
const ok = await store.dispatch("userProfile/saveProfile", {
  userId: user.value.id,
  profile: payload,
});
if (ok) router.push("/dashboard");
};
</script>