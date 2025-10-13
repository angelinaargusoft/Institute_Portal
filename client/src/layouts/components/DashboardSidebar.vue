<template>
  <v-navigation-drawer app permanent width="240">
    <v-list density="compact">
      <v-list-item @click="goToDashboard">
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>
      <v-list-item @click="goToStudents">
        <v-list-item-title>Students</v-list-item-title>
      </v-list-item>
      <v-list-item @click="goToFaculties">
        <v-list-item-title>Teachers</v-list-item-title>
      </v-list-item>
      <v-list-item >
        <v-list-item-title>Attendance</v-list-item-title>
      </v-list-item>
      <v-list-item >
        <v-list-item-title>Notice</v-list-item-title>
      </v-list-item>
      <v-list-item @click="goToEdit">
        <v-list-item-title>Institute Details</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script setup>
 import { useRoute, useRouter } from "vue-router";
 const router = useRouter();
 const route = useRoute();
// Simple sidebar for now — can be extended for role-based items later
function goToEdit() {
  
    router.push(`/institutes/${route.params.id}/edit`);
  }
  function goToStudents() {
  
  router.push(`/dashboard/admin/${route.params.id}/students`);
}
function goToFaculties() {
  
  router.push(`/dashboard/admin/${route.params.id}/faculties`);
}
function goToDashboard() {
  
  router.push(`/dashboard/admin/${route.params.id}`);
}
</script>