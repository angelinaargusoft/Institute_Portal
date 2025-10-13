<template>
  <v-app-bar app flat color="primary" density="comfortable" dark>
    <!-- Left: Logo & Home -->
    <v-btn icon @click="goHome" variant="text" class="me-2">
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-toolbar-title class="font-weight-bold text-h6">EduBridge</v-toolbar-title>
    <v-spacer />
    <!-- Right: User Controls -->
    <div v-if="user" class="d-flex align-center">
      <!-- Dashboard Button -->
      <v-btn
        variant="tonal"
        color="secondary"
        class="mx-2"
        prepend-icon="mdi-view-dashboard"
        @click="goToDashboard"
      >
        Dashboard
      </v-btn>
      <!-- Profiles Menu -->
      <v-menu offset-y>
        <template #activator="{ props }">
          <v-btn
            variant="text"
            v-bind="props"
            prepend-icon="mdi-account"
            append-icon="mdi-chevron-down"
          >
            Profiles
          </v-btn>
        </template>
        <v-list>
          <v-list-subheader>Manage Profiles</v-list-subheader>
          <v-list-item @click="goToStudentProfile" prepend-icon="mdi-school">
            <v-list-item-title>Student Profile</v-list-item-title>
          </v-list-item>
          <v-list-item @click="goToFacultyProfile" prepend-icon="mdi-">
            <v-list-item-title>Faculty Profile</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- Add Institute -->
      <v-btn
        color="secondary"
        variant="flat"
        class="mx-2 rounded-pill"
        prepend-icon="mdi-plus-box"
        @click="goToAddInstitute"
      >
        Add Institute
      </v-btn>
      <!-- Logout -->
      <v-tooltip text="Logout" location="bottom">
        <template #activator="{ props }">
          <v-btn icon v-bind="props" @click="onLogout">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </template>
      </v-tooltip>
    </div>
    <!-- Guest State -->
    <div v-else>
      <v-btn variant="outlined" color="white" @click="goToAuth">
        Login / Register
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
const goToAuth = () => router.push("/auth");
const onLogout = () => {
  store.dispatch("auth/logout");
  window.location.href = "/auth";
};
</script>
<style scoped>
.v-app-bar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.v-btn {
  text-transform: none;
  letter-spacing: 0;
}
</style>