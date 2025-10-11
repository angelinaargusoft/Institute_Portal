<template>
    <v-card outlined class="mb-4">
      <v-card-title>Faculty Details</v-card-title>
      <v-card-text>
        <!-- Faculty-specific Details -->
        <v-text-field v-model="localProfile.facultyProfilePic" label="Profile Picture URL" />
        <v-text-field v-model="localProfile.designation" label="Designation" />
        <v-text-field v-model="localProfile.specialization" label="Specialization" />
        <v-text-field v-model="localProfile.qualifications" label="Qualifications" />
        <v-text-field v-model="localProfile.yearsOfExperience" type="number" label="Years of Experience" />
      </v-card-text>
    </v-card>
  </template>
  <script setup>
  import { reactive, watch } from "vue";
  const props = defineProps({
    modelValue: {
      type: Object,
      default: () => ({
        facultyProfilePic: "",
        designation: "",
        specialization: "",
        qualifications: "",
        yearsOfExperience: 0,
      }),
    },
  });
  const emit = defineEmits(["update:modelValue"]);
  // Local deep clone to avoid mutating props directly
  const localProfile = reactive(JSON.parse(JSON.stringify(props.modelValue)));
  // Watch for external prop updates
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