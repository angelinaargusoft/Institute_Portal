<template>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="text-h6 font-weight-bold">Enroll Student</v-card-title>
        <v-card-text>
          <v-select
            label="Select Student"
            :items="students"
            v-model="selectedStudent"
            item-title="name"
            item-value="id"
            outlined
            dense
          />
          <v-text-field
            label="Roll Number"
            v-model="rollNo"
            outlined
            dense
            class="mt-3"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="closeDialog">Cancel</v-btn>
          <v-btn color="primary" @click="enrollStudent">Enroll</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  <script setup>
  import { ref, computed } from "vue";
  // Props
  const props = defineProps({
    modelValue: { type: Boolean, required: true },
  });
  // Emits
  const emit = defineEmits(["update:modelValue", "enroll"]);
  // Local state
  const selectedStudent = ref(null);
  const rollNo = ref("");
  // Dummy list of users (replace with API later)
  const students = ref([
    { id: 1, name: "Riya Das" },
    { id: 2, name: "Arjun Patel" },
    { id: 3, name: "Sneha Mishra" },
    { id: 4, name: "Rahul Verma" },
  ]);
  // Computed proxy for v-model
  const dialog = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
  });
  // Close dialog
  const closeDialog = () => {
    dialog.value = false;
  };
  // Handle enroll
  const enrollStudent = () => {
    if (!selectedStudent.value || !rollNo.value) return;
    emit("enroll", {
      studentId: selectedStudent.value,
      rollNo: rollNo.value,
    });
    // Reset form
    selectedStudent.value = null;
    rollNo.value = "";
    closeDialog();
  };
  </script>
  <style scoped>
  .v-card-title {
    background-color: #f5f5f5;
  }
  </style>