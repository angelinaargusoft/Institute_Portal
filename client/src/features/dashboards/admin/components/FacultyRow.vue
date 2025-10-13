<template>
    <v-row class="align-center py-2 px-3 faculty-row" dense>
      <v-col cols="2" class="d-flex align-center">
        <v-avatar size="36">
          <v-img :src="faculty.photo || 'https://via.placeholder.com/36'" />
        </v-avatar>
      </v-col>
      <v-col cols="2">{{ faculty.name }}</v-col>
      <v-col cols="2">{{ faculty.designation }}</v-col>
      <v-col cols="2">{{ faculty.specialisation }}</v-col>
      <v-col cols="2">{{ faculty.qualifications }}</v-col>
      <v-col cols="1">{{ faculty.experience }} yrs</v-col>
      <v-col cols="1" class="text-right">
        <v-btn color="primary" small @click="$emit('view', faculty)">
          View
        </v-btn>
      </v-col>
    </v-row>
  </template>
  <script setup>
  defineProps({
    faculty: { type: Object, required: true },
  });
  </script>
  <style scoped>
  .faculty-row {
    border-bottom: 1px solid #eee;
  }
  </style>