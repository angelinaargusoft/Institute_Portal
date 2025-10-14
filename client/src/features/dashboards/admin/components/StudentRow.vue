<template>
    <v-row class="align-center py-2 px-3 student-row" dense>
      <v-col cols="1" class="d-flex align-center">
        <v-avatar size="36">
          <v-img :src="student.photo || 'https://picsum.photos/id/237/200/300'" />
        </v-avatar>
      </v-col>
      <v-col cols="2">{{ student.name }}</v-col>
      <v-col cols="2">{{ student.roll }}</v-col>
      <v-col cols="2">{{ student.class }}</v-col>
      <v-col cols="2">{{ student.section }}</v-col>
      <v-col cols="2">{{ student.email }}</v-col>
      <v-col cols="1" class="text-right">
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