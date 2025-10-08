<template>
    <v-container>
      <h2 class="mb-4">Add Institute</h2>
      <v-alert v-if="error" type="error" dense class="mb-4">{{ error }}</v-alert>
      <v-form ref="formRef">
        <!-- Basic Details -->
        <v-text-field v-model="institute.name" label="Institute Name" required variant="outlined" color="primary"/>
        <v-text-field v-model="institute.email" label="Official Email" required />
        <v-text-field v-model="institute.description" label="Description" multi-line />
        <v-text-field v-model="institute.logoUrl" label="Logo URL" />
        <!-- Address Fields (nested object) -->
        <h4 class="mt-4 mb-2">Address</h4>
        <v-text-field v-model="institute.address.addressLine" label="Address Line" />
        <v-text-field v-model="institute.address.city" label="City" />
        <v-text-field v-model="institute.address.state" label="State" />
        <v-text-field v-model="institute.address.country" label="Country" />
        <v-text-field v-model="institute.address.postalCode" label="Postal Code" />
        <v-select
          v-model="institute.status"
          :items="['active','inactive','pending_approval']"
          label="Status"
        />
        <v-btn color="primary" class="mt-4" @click="onSave" :loading="loading">
          Save Institute
        </v-btn>
      </v-form>
    </v-container>
  </template>
  <script setup>
  import { reactive, ref, computed } from "vue";
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  import { createInstitute } from "@/services/instituteService";
  const store = useStore();
  const router = useRouter();
  const formRef = ref(null);
  const loading = ref(false);
  const error = ref(null);
  // Initialize institute object
  const institute = reactive({
    name: "",
    email: "",
    description: "",
    logoUrl: "",
    status: "active",
    createdBy: store.getters["auth/user"]?.id || "",
    address: {
      addressLine: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },
  });
  const onSave = async () => {
    error.value = null;
    loading.value = true;
    try {
      await store.dispatch("institute/createInstitute", institute);
      router.push("/home");
    } catch (err) {
      error.value = err.message || "Failed to create institute";
    } finally {
      loading.value = false;
    }
  };
  </script>