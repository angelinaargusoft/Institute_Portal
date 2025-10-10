<template>
  <v-card outlined class="mb-4">
    <v-card-title>Base Details</v-card-title>
    <v-card-text>
      <!-- Personal Details -->
      <v-text-field v-model="localProfile.firstName" label="First Name" required />
      <v-text-field v-model="localProfile.lastName" label="Last Name" />
      <v-text-field v-model="localProfile.dob" type="date" label="Date of Birth" required />
      <v-select
        v-model="localProfile.gender"
        :items="['male', 'female', 'other']"
        label="Gender"
        required
      />
      <v-text-field v-model="localProfile.phone" label="Phone" required />
      <!-- Address Fields -->
      <h4 class="mt-4 mb-2">Address</h4>
      <v-select
        v-model="localProfile.address.addressType"
        :items="['current', 'permanent']"
        label="Address Type"
      />
      <v-text-field v-model="localProfile.address.addressLine" label="Address Line" />
      <v-text-field v-model="localProfile.address.city" label="City" />
      <v-text-field v-model="localProfile.address.state" label="State" />
      <v-text-field v-model="localProfile.address.country" label="Country" />
      <v-text-field v-model="localProfile.address.postalCode" label="Postal Code" />
    </v-card-text>
  </v-card>
</template>
<script setup>
import { reactive, watch } from "vue";
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
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
    }),
  },
});
const emit = defineEmits(["update:modelValue"]);
// Make a local deep clone
const localProfile = reactive(JSON.parse(JSON.stringify(props.modelValue)));
// Watch for external prop updates (only update if different)
watch(
  () => props.modelValue,
  (newVal) => {
    if (JSON.stringify(newVal) !== JSON.stringify(localProfile)) {
      Object.assign(localProfile, newVal);
    }
  },
  { deep: true, immediate: true }
);
// Emit changes to parent on local edits
watch(
  localProfile,
  (newVal) => {
    emit("update:modelValue", JSON.parse(JSON.stringify(newVal)));
  },
  { deep: true }
);
</script>