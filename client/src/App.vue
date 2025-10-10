<template>
  <v-app>
    <component :is="layoutComponent">
      <router-view />
    </component>
  </v-app>
</template>
<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import AuthLayout from "@/layouts/AuthLayout.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
const route = useRoute();
const layoutComponent = computed(() => {
  const layout = route.meta.layout || "main";
  switch (layout) {
    case "auth":
      return AuthLayout;
    case "dashboard":
      return DashboardLayout;
    default:
      return MainLayout;
  }
});
</script>
<style>
/* Optional global styles */
</style>