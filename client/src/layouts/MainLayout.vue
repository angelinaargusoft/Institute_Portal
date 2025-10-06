<template>
  <v-app>
    <!-- Top Bar -->
    <v-app-bar app>
      <v-toolbar-title>My App</v-toolbar-title>
      <v-spacer />
      <div v-if="user">
        <!-- Add Institute Button -->
        <v-btn color="primary" class="me-3" @click="goToAddInstitute">
          <v-icon left>mdi-plus-box</v-icon>
          Add Institute
        </v-btn>
        <!-- Logout Button -->
        <v-btn text @click="onLogout">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <!-- Sidebar -->
    <v-navigation-drawer app permanent>
      <v-list density="compact">
        <!-- Dashboards -->
        <v-list-group prepend-icon="mdi-view-dashboard">
          <template #activator="{ props }">
            <v-list-item v-bind="props" title="Dashboards" />
          </template>
          <!-- Admin Dropdown -->
          <v-list-group prepend-icon="mdi-shield-account" value="admin">
            <template #activator="{ props }">
              <v-list-item v-bind="props" title="Admin" />
            </template>
            <RouterLink
              v-for="inst in institutes"
              :key="inst.id"
              :to="`/institutes/${inst.id}`"
              class="v-list-item"
            >
              <v-list-item-title>{{ inst.name }}</v-list-item-title>
            </RouterLink>
          </v-list-group>
          <!-- Student Dropdown -->
          <v-list-group prepend-icon="mdi-school" value="student">
            <template #activator="{ props }">
              <v-list-item v-bind="props" title="Student" />
            </template>
            <RouterLink
              v-for="inst in institutes"
              :key="inst.id"
              :to="`/dashboard/student/${inst.id}`"
              class="v-list-item"
            >
              <v-list-item-title>{{ inst.name }}</v-list-item-title>
            </RouterLink>
          </v-list-group>
          <!-- Faculty Dropdown -->
          <v-list-group prepend-icon="mdi-account-tie" value="faculty">
            <template #activator="{ props }">
              <v-list-item v-bind="props" title="Faculty" />
            </template>
            <RouterLink
              v-for="inst in institutes"
              :key="inst.id"
              :to="`/dashboard/faculty/${inst.id}`"
              class="v-list-item"
            >
              <v-list-item-title>{{ inst.name }}</v-list-item-title>
            </RouterLink>
          </v-list-group>
        </v-list-group>
        <!-- Profiles Section -->
        <!-- Profiles Section -->
        <v-list-group prepend-icon="mdi-account">
          <template #activator="{ props }">
            <v-list-item v-bind="props" title="Profiles" />
          </template>
          <!-- Student Profile -->
          <v-list-item
            @click="goToStudentProfile"
          >
            <v-list-item-title>Student</v-list-item-title>
          </v-list-item>
          <!-- Faculty Profile -->
          <v-list-item
            @click="goToFacultyProfile"
          >
            <v-list-item-title>Faculty</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <!-- Main Content -->
    <v-main>
      <v-container class="pa-4">
        <slot></slot>
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useStore();
const user = computed(() => store.getters["auth/user"]);
const institutes = computed(() => store.getters["institute/institutes"]);
const onLogout = () => {
  store.dispatch("auth/logout");
  window.location.href = "/login";
};
const goToAddInstitute = () => {
  router.push("/institutes/add");
};
const goToStudentProfile = () => {
  router.push(`/profile/student`);
};
const goToFacultyProfile = () => {
  router.push(`/profile/faculty`);
};
// Load institutes on mount
onMounted(async () => {
  if (user.value?.id) {
    await store.dispatch("institute/fetchInstitutesByUser", user.value.id);
  }
});
</script>
