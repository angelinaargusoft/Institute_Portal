<template>
    <v-card outlined class="mb-4">
      <v-card-title>Institute Details</v-card-title>
      <v-card-text>
        <!-- Personal Details -->
        <v-text-field v-model="localInstitute.name" label="Name" required />
        <v-text-field v-model="localInstitute.email" label="Email" />
        <v-text-field v-model="localInstitute.description" type="text" label="Description" required />
        <v-text-field v-model="localInstitute.logoUrl" label="Logo URL" required />
        <!-- Address Fields -->
        <h4 class="mt-4 mb-2">Address</h4>
        <v-select
          v-model="localInstitute.address.addressType"
          :items="['current', 'permanent']"
          label="Address Type"
        />
        <v-text-field v-model="localInstitute.address.addressLine" label="Address Line" />
        <v-text-field v-model="localInstitute.address.city" label="City" />
        <v-text-field v-model="localInstitute.address.state" label="State" />
        <v-text-field v-model="localInstitute.address.country" label="Country" />
        <v-text-field v-model="localInstitute.address.postalCode" label="Postal Code" />
      </v-card-text>
    </v-card>
  </template>
  <script setup>
  import { reactive, watch } from "vue";
  const props = defineProps({
    modelValue: {
      type: Object,
      default: () => ({
        name: "",
        email: "",
        description: "",
        logoUrl: "",
        status: "active",
        address: {
          addressLine: "",
          city: "",
          state: "",
          country: "",
          postalCode: "",
          addressType: "current",
        },
      }),
    },
  });
  const emit = defineEmits(["update:modelValue"]);
  // Make a local deep clone
  const localInstitute = reactive(JSON.parse(JSON.stringify(props.modelValue)));
  // Watch for external prop updates (only update if different)
  watch(
    () => props.modelValue,
    (newVal) => {
      if (JSON.stringify(newVal) !== JSON.stringify(localInstitute)) {
        Object.assign(localInstitute, newVal);
      }
    },
    { deep: true, immediate: true }
  );
  // Emit changes to parent on local edits
  watch(
    localInstitute,
    (newVal) => {
      emit("update:modelValue", JSON.parse(JSON.stringify(newVal)));
    },
    { deep: true }
  );
  </script>