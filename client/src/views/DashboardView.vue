<template>
    <v-container>
      <h2>User Dashboard</h2>
      <v-card v-if="user">
        <v-card-title>{{ user.name }}</v-card-title>
        <v-card-subtitle>{{ user.email }}</v-card-subtitle>
      </v-card>
      <v-alert v-else type="info">Loading user...</v-alert>
    </v-container>
  </template>
  <script setup>
  import { computed, watch, onMounted } from "vue";
  import { useStore } from "vuex";
  import { getUserById } from "@/services/userService";
  const store = useStore();
  const user = computed(() => store.getters["auth/user"]);
  const fetchProfile = async () => {
    if (user.value?.id) {
      const profile = await getUserById(user.value.id);
      store.commit("auth/setUser", profile);
    }
  };
  onMounted(fetchProfile);
  // if user wasn't ready when mounted, watch for it
  watch(user, (newUser) => {
    if (newUser?.id) fetchProfile();
  });
  </script>