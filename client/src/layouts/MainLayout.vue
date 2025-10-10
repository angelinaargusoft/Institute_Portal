<template>
  <v-app>
    <!-- Top Navbar -->
    <Navbar />
    <!-- Page Content -->
    <v-main>
      <v-container class="pa-4">
        <slot></slot>
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup>
import Navbar from "./components/Navbar.vue";
</script>









