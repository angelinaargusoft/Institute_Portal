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
body{
  background-color: #E8F5E9;
  color: #1B1B1B;
  font-family: "Inter", "Roboto", sans-serif;
}
</style>