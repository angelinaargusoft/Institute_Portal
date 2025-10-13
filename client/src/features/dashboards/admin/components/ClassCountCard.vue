<template>
    <v-card class="pa-4" elevation="3" rounded="lg">
      <!-- Header -->
      <div class="d-flex align-center mb-3">
        <v-icon size="28" color="deep-purple" class="mr-2">mdi-school</v-icon>
        <h3 class="text-h6 mb-0">Classes</h3>
      </div>
      <!-- Info -->
      <div class="d-flex flex-column">
        <div class="d-flex align-center mb-2">
          <v-icon color="deep-purple" size="18" class="mr-1">mdi-view-grid</v-icon>
          <span class="text-body-2">Total Classes: {{ totalClasses }}</span>
        </div>
        <div class="d-flex align-center">
          <v-icon color="pink" size="18" class="mr-1">mdi-format-list-numbered</v-icon>
          <span class="text-body-2">Sections: {{ totalSections }}</span>
        </div>
      </div>
    </v-card>
  </template>
  <script setup>
  const props = defineProps({
    totalClasses: { type: Number, required: true },
    totalSections: { type: Number, required: true },
  });
  </script>
  <style scoped>
  .text-body-2 {
    font-weight: 500;
  }
  </style>