<template>
  <v-container class="py-8">
    <h2 class="text-h5 font-weight-bold mb-6 text-center">Admin Dashboard</h2>
    <v-row dense>
      <!-- LEFT SECTION -->
      <v-col cols="12" md="8">
        <!-- Summary Cards -->
        <v-row dense>
          <v-col cols="12" sm="4">
            <StudentCountCard :male="60" :female="40" />
          </v-col>
          <v-col cols="12" sm="4">
            <TeacherCountCard :male="10" :female="4" />
          </v-col>
          <v-col cols="12" sm="4">
            <ClassCountCard :totalClasses="classCount" :totalSections="sectionCount" />
          </v-col>
        </v-row>
        <!-- Attendance Component -->
        <v-row dense class="mt-4">
          <v-col cols="12" md="6">
            <StudentAttendanceCard :present="presentStudents" :absent="absentStudents" />
          </v-col>
        </v-row>
      </v-col>
      <!-- RIGHT SECTION (Calendar + Notifications) -->
<v-col cols="12" md="4">
  <v-card class="pa-4 calendar-card" elevation="2" rounded="lg">
    <h3 class="text-h6 font-weight-medium mb-3 text-center">Calendar</h3>
    <v-date-picker
      v-model="selectedDate"
      color="primary"
      elevation="0"
      show-adjacent-months
      full-width
    />
    <p class="text-center mt-4 text-body-2">
      Selected: <strong>{{ selectedDate }}</strong>
    </p>
  </v-card>
  <!-- Notifications Panel -->
  <NotificationsPanel />
</v-col>






    </v-row>
  </v-container>
</template>
<script setup>
import { ref } from "vue";
import StudentCountCard from "../components/StudentCountCard.vue";
import TeacherCountCard from "../components/TeacherCountCard.vue";
import ClassCountCard from "../components/ClassCountCard.vue";
import StudentAttendanceCard from "../components/StudentAttendanceCard.vue";
import NotificationsPanel from "../components/NotificationsPanel.vue";
// Dummy counts
const classCount = ref(35);
const sectionCount = ref(120);
// Dummy attendance
const presentStudents = ref(1080);
const absentStudents = ref(120);
// Calendar
const selectedDate = ref(new Date().toISOString().substr(0, 10));
</script>
<style scoped>
.calendar-card {
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}
.calendar-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
}
</style>