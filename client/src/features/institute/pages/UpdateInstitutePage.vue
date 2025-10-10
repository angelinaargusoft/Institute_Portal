<template>
  <v-container>
    <!-- Title -->
    <h2 class="mb-4">{{ isEdit ? "Edit Institute" : "Add Institute" }}</h2>
    <!-- Error Alert -->
    <v-alert v-if="error" type="error" dense class="mb-4">{{ error }}</v-alert>
    <!-- Institute Form -->
    <institute-form v-model="localInstitute" />
    <!-- Save / Update Button -->
    <v-btn
      color="primary"
      :loading="loading"
      class="mt-4"
      @click="onSave"
    >
      {{ isEdit ? "Update Institute" : "Create Institute" }}
    </v-btn>
  </v-container>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import InstituteForm from "@/features/institute/components/InstituteForm.vue";
const store = useStore();
const router = useRouter();
const route = useRoute();
// --- Vuex State ---
const user = computed(() => store.getters["auth/user"]);
const currentInstitute = computed(() => store.getters["institute/currentInstitute"]);
const loading = computed(() => store.getters["userProfile/loading"]);
const error = computed(() => store.getters["userProfile/error"]);
// --- Local reactive profile ---
const localInstitute = ref({
  name: "",
  email: "",
  description: "",
  logoUrl: "",
  status: "",
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
// --- Load existing profile ---
onMounted(async () => {
  const instituteId = route.params.id;
  if(instituteId){
    isEdit.value = true;
    await store.dispatch("institute/fetchInstituteById", instituteId);
    const existing = currentInstitute.value;
  if (existing) {
    localInstitute.value = {
      name: existing.name || "",
      email: existing.email || "",
      description: existing.description || "",
      logoUrl: existing.logoUrl || "",
      status: existing.status || "",
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
  }
  }
});
// --- Save / Update Profile ---
const onSave = async () => {
  if (!user.value?.id) return;
  const payload = {
    ...localInstitute.value,
    createdBy: user.value.id,
    address: { ...localInstitute.value.address },
  };
  console.log(localInstitute.value)
  const ok = await store.dispatch("institute/saveInstitute", {
    instituteId: isEdit.value? route.params.id : null,
    institute: payload,
  });
  if(ok){
    const instituteId = isEdit.value
      ? route.params.id
      : ok.id || store.getters["institute/currentInstitute"]?.id;
    // Redirect to the institute dashboard
    if (instituteId) router.push(`/dashboard/admin/${instituteId}`);
  }
};
</script>
<style scoped>
h2 {
  font-weight: 600;
}
</style>


