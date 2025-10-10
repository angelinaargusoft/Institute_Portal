<template>
    <MainLayout>
      <div class="dashboard-layout">
        <DashboardSidebar />
          <v-container fluid class="pa-4">
            <slot></slot>
          </v-container>
      </div>
    </MainLayout>
  </template>
  <script setup>
  import DashboardSidebar from "./components/DashboardSidebar.vue";
  import MainLayout from "./MainLayout.vue";
  </script>
  <style scoped>
  .dashboard-layout {
    display: flex;
    flex-direction: row;
  }
  </style>
  
  
  
  
  
  
  
  
  