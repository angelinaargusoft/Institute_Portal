<template>
    <v-card class="pa-4 mt-4" elevation="2" rounded="lg">
      <h3 class="text-h6 font-weight-medium mb-3 text-center">Notifications</h3>
      <v-list dense>
        <v-list-item
          v-for="(notification, index) in notifications"
          :key="index"
        >
          <v-list-item-avatar>
            <v-icon color="primary">mdi-bell-ring</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ notification.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ notification.time }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </template>
  <script setup>
  const notifications = [
    { title: "New student registered", time: "10 mins ago" },
    { title: "Teacher meeting scheduled", time: "1 hour ago" },
    { title: "Class 5 updated timetable", time: "2 hours ago" },
    { title: "Exam results published", time: "Yesterday" },
  ];
  </script>
  <style scoped>
  .v-list-item {
    border-bottom: 1px solid #eee;
  }
  .v-list-item:last-child {
    border-bottom: none;
  }
  </style>