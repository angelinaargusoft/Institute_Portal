<template>
    <v-card class="pa-4 text-center attendance-card" elevation="2" rounded="lg">
      <h3 class="text-h6 font-weight-medium mb-3">Student Attendance</h3>
      <div class="d-flex align-center justify-center flex-column">
        <v-progress-circular
          :model-value="attendancePercent"
          size="120"
          width="12"
          color="teal"
          rotate="-90"
        >
          <div>
            <span class="text-h5 font-weight-bold">{{ attendancePercent }}%</span>
            <p class="text-caption text-grey mb-0">Present</p>
          </div>
        </v-progress-circular>
      </div>
      <v-row class="mt-4" justify="center">
        <v-col cols="6" class="text-center">
          <v-icon color="green" size="20">mdi-check-circle</v-icon>
          <p class="text-body-2 mb-0">{{ present }} Present</p>
        </v-col>
        <v-col cols="6" class="text-center">
          <v-icon color="red" size="20">mdi-close-circle</v-icon>
          <p class="text-body-2 mb-0">{{ absent }} Absent</p>
        </v-col>
      </v-row>
    </v-card>
  </template>
  <script setup>
  import { computed } from 'vue';
  const props = defineProps({
    present: { type: Number, required: true },
    absent: { type: Number, required: true },
  });
  const attendancePercent = computed(() => {
    const total = props.present + props.absent;
    return total ? Math.round((props.present / total) * 100) : 0;
  });
  </script>
  <style scoped>
  .attendance-card {
    transition: transform 0.2s ease, box-shadow 0.3s ease;
  }
  .attendance-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  }
  </style>