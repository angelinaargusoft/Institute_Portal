<template>
    <v-app>
      <v-app-bar app>
        <v-toolbar-title>My App</v-toolbar-title>
        <v-spacer />
        <div v-if="user">
          <span class="me-4">{{ user.name }}</span>
          <v-btn text @click="onLogout"><v-icon>mdi-logout</v-icon></v-btn>
        </div>
      </v-app-bar>
      <v-navigation-drawer app permanent>
        <v-list>
          <RouterLink to="/dashboard" class="v-list-item">
            <v-list-item-title>Dashboard</v-list-item-title>
          </RouterLink>
          <!-- add more links -->
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
  const store = useStore();
  const user = computed(() => store.getters["auth/user"]);
  const onLogout = () => {
    store.dispatch("auth/logout");
    // navigate to login - using location to reset state quickly
    window.location.href = "/login";
  };
  </script>
  
  
  
  