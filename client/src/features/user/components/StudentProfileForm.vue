<template>
    <v-card outlined class="mb-4">
      <v-card-title>Student Details</v-card-title>
      <v-card-text>
        <!-- Faculty-specific Details -->
        <v-text-field v-model="localProfile.studentProfilePic" label="Profile Picture URL" />
        <v-text-field v-model="localProfile.guardianName" label="Guardian Name" />
        <v-text-field v-model="localProfile.guardianPhone" label="Guardian Phone" />
        <v-text-field v-model="localProfile.bloodGroup" label="Blood Group" />
        <v-text-field v-model="localProfile.previousSchool" label="Previous School" />
      </v-card-text>
    </v-card>
  </template>
  <script setup>
  import { reactive, watch } from "vue";
  const props = defineProps({
    modelValue: {
      type: Object,
      default: () => ({
        studentProfilePicProfilePic: "",
        guardianName: "",
        guardianPhone: "",
        bloodGroup: "",
        previousSchool: "",
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