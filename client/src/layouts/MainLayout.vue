<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>My App</v-toolbar-title>
      <v-spacer />
      <div v-if="user">
        <!-- <span class="me-4">{{ user.name }}</span> -->
          <!-- Add Institute Button -->
    <v-btn color="primary" class="me-3" @click="goToAddInstitute">
      <v-icon left>mdi-plus-box</v-icon>
      Add Institute
    </v-btn>
        <v-btn text @click="onLogout"><v-icon>mdi-logout</v-icon></v-btn>
      </div>
    </v-app-bar>
    <v-navigation-drawer app permanent>
      <v-list density="compact">
        <!-- Dashboards dropdown -->
        <v-list-group prepend-icon="mdi-view-dashboard">
          <template #activator="{ props }">
            <v-list-item v-bind="props" title="Dashboards" />
          </template>
          <RouterLink to="/dashboard/one" class="v-list-item">
            <v-list-item-title>Admin</v-list-item-title>
          </RouterLink>
          <RouterLink to="/dashboard/two" class="v-list-item">
            <v-list-item-title>Student</v-list-item-title>
          </RouterLink>
          <RouterLink to="/dashboard/three" class="v-list-item">
            <v-list-item-title>Faculty</v-list-item-title>
          </RouterLink>
        </v-list-group>

        <!-- Dashboards dropdown -->
        <v-list-group prepend-icon="mdi-view-dashboard">
          <template #activator="{ props }">
            <v-list-item v-bind="props" title="Profiles" />
          </template>
          <RouterLink to="/dashboard/two" class="v-list-item">
            <v-list-item-title>Student</v-list-item-title>
          </RouterLink>
          <RouterLink to="/dashboard/three" class="v-list-item">
            <v-list-item-title>Faculty</v-list-item-title>
          </RouterLink>
        </v-list-group>
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
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();

const user = computed(() => store.getters["auth/user"]);
const onLogout = () => {
  store.dispatch("auth/logout");
  // navigate to login - using location to reset state quickly
  window.location.href = "/login";
};
const goToAddInstitute = ()=>{
  router.push("/institutes/add");
}
</script>
