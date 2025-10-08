<template>
    <v-navigation-drawer app permanent width="260">
      <v-list dense nav>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold text-h6 text-center">
              {{ sidebarTitle }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="my-2" />
        <template v-if="role === 'admin'">
          <v-list-item to="/dashboard/admin/institutes">
            <v-icon left>mdi-office-building</v-icon>
            Manage Institutes
          </v-list-item>
          <v-list-item to="/dashboard/admin/students">
            <v-icon left>mdi-school</v-icon>
            Manage Students
          </v-list-item>
          <v-list-item to="/dashboard/admin/faculties">
            <v-icon left>mdi-account-tie</v-icon>
            Manage Faculties
          </v-list-item>
          <v-list-item to="/dashboard/admin/reports">
            <v-icon left>mdi-chart-bar</v-icon>
            Reports
          </v-list-item>
        </template>
        <template v-else-if="role === 'faculty'">
          <v-list-item to="/dashboard/faculty/classes">
            <v-icon left>mdi-google-classroom</v-icon>
            My Classes
          </v-list-item>
          <v-list-item to="/dashboard/faculty/attendance">
            <v-icon left>mdi-check-decagram</v-icon>
            Attendance
          </v-list-item>
          <v-list-item to="/dashboard/faculty/assignments">
            <v-icon left>mdi-file-document</v-icon>
            Assignments
          </v-list-item>
        </template>
        <template v-else>
          <!-- Student Sidebar -->
          <v-list-item to="/dashboard/student/subjects">
            <v-icon left>mdi-book-open-page-variant</v-icon>
            Subjects
          </v-list-item>
          <v-list-item to="/dashboard/student/notices">
            <v-icon left>mdi-bell</v-icon>
            Notices
          </v-list-item>
          <v-list-item to="/dashboard/student/results">
            <v-icon left>mdi-trophy</v-icon>
            Results
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
  </template>
  <script setup>
  import { computed } from "vue";
  const props = defineProps({
    role: {
      type: String,
      default: "student",
    },
  });
  const sidebarTitle = computed(() => {
    switch (props.role) {
      case "admin":
        return "Admin Panel";
      case "faculty":
        return "Faculty Panel";
      default:
        return "Student Panel";
    }
  });
  </script>