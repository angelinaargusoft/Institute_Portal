<template>
    <v-app-bar app>
      <v-btn icon @click="goHome">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-toolbar-title>EduBridge</v-toolbar-title>
      <v-spacer />
      <div v-if="user">
        <v-btn text @click="goToDashboard">
          <v-icon left>mdi-view-dashboard</v-icon>
          Dashboard
        </v-btn>
        <v-menu offset-y>
          <template #activator="{ props }">
            <v-btn text v-bind="props">
              <v-icon left>mdi-account</v-icon>
              Profiles
              <v-icon right>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="goToStudentProfile">
              <v-list-item-title>Student Profile</v-list-item-title>
            </v-list-item>
            <v-list-item @click="goToFacultyProfile">
              <v-list-item-title>Faculty Profile</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn color="primary" class="mx-3" @click="goToAddInstitute">
          <v-icon left>mdi-plus-box</v-icon>
          Add Institute
        </v-btn>
        <v-btn text @click="onLogout">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
  </template>
  <script setup>
  import { computed } from "vue";
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  const store = useStore();
  const router = useRouter();
  const user = computed(() => store.getters["auth/user"]);
  const goToAddInstitute = () => router.push("/institutes/add");
  const goToStudentProfile = () => router.push("/profile/student");
  const goToFacultyProfile = () => router.push("/profile/faculty");
  const goToDashboard = () => router.push("/home");
  const goHome = () => router.push("/home");
  const onLogout = () => {
    store.dispatch("auth/logout");
    window.location.href = "/auth";
  };
  </script>