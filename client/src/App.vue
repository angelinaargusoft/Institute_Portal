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
const route = useRoute();
const layoutComponent = computed(() => {
  const layout = route.meta.layout || "main";
  return layout === "auth" ? AuthLayout : MainLayout;
});
</script>
<style>
/* optional global styles */
</style>
