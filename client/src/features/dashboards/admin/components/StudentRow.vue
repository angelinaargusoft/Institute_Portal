<template>
    <v-row class="align-center py-2 px-3 student-row" dense>
      <v-col cols="2" class="d-flex align-center">
        <v-avatar size="36">
          <v-img :src="student.photo || 'https://via.placeholder.com/36'" />
        </v-avatar>
      </v-col>
      <v-col cols="2">{{ student.name }}</v-col>
      <v-col cols="2">{{ student.rollNo }}</v-col>
      <v-col cols="2">{{ student.className }}</v-col>
      <v-col cols="2">{{ student.section }}</v-col>
      <v-col cols="2" class="text-right">
        <v-btn color="primary" small @click="$emit('view', student)">
          View
        </v-btn>
      </v-col>
    </v-row>
  </template>
  <script setup>
  defineProps({
    student: { type: Object, required: true },
  });
  </script>
  <style scoped>
  .student-row {
    border-bottom: 1px solid #eee;
  }
  </style>