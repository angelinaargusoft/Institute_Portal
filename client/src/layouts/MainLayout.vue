<template>
  <v-app>
    <!-- Top Bar -->
    <v-app-bar app>
      <v-toolbar-title>My App</v-toolbar-title>
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
    <!-- Sidebar (only visible on dashboard routes) -->
    <v-navigation-drawer
      v-if="isDashboard"
      app
      permanent
      width="240"
    >
      <v-list density="compact">
        <template v-if="role === 'admin'">
          <v-list-item title="Admin Dashboard" prepend-icon="mdi-shield-account" />
          <v-list-item title="Manage Institutes" prepend-icon="mdi-school" />
          <v-list-item title="Reports" prepend-icon="mdi-chart-box" />
        </template>
        <template v-else-if="role === 'faculty'">
          <v-list-item title="Faculty Dashboard" prepend-icon="mdi-account-tie" />
          <v-list-item title="My Classes" prepend-icon="mdi-book" />
          <v-list-item title="Attendance" prepend-icon="mdi-clipboard-check" />
        </template>
        <template v-else-if="role === 'student'">
          <v-list-item title="Student Dashboard" prepend-icon="mdi-school" />
          <v-list-item title="My Courses" prepend-icon="mdi-book-open" />
          <v-list-item title="Results" prepend-icon="mdi-file-chart" />
        </template>
        <template v-else>
          <v-list-item title="Dashboard Home" prepend-icon="mdi-home" />
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container class="pa-4">
        <slot></slot>
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter,useRoute } from "vue-router";
const store = useStore();
const router = useRouter();
const route = useRoute();
const user = computed(() => store.getters["auth/user"]);
const isDashboard = computed(() => route.path.startsWith("/dashboard"));
const goToAddInstitute = () => router.push("/institutes/add");
const goToStudentProfile = () => router.push("/profile/student");
const goToFacultyProfile = () => router.push("/profile/faculty");
const onLogout = () => {
  store.dispatch("auth/logout");
  window.location.href = "/login";
};
const goToDashboard = async () => {
  await router.push("/home");
  setTimeout(() => {
    const section = document.getElementById("my-institutes");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  }, 400);
};
</script>