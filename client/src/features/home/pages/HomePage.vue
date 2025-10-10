<template>
  <v-container>
    <!-- Base Details Section -->
    <BaseDetails />
    <!-- Institutes Section -->
    <h2 id="my-institutes" class="mt-6 mb-4">My Institutes</h2>
    <!-- Loading/Error/Empty States -->
    <v-alert v-if="loading" type="info">Loading institutes...</v-alert>
    <v-alert v-if="error" type="error">{{ error }}</v-alert>
    <v-alert v-if="!loading && institutes.length === 0" type="warning">
      You haven’t created any institutes yet.
    </v-alert>
    <!-- Render InstituteItem for each institute -->
    <InstituteItem
      v-for="inst in institutes"
      :key="inst.id"
      :institute="inst"
    />
  </v-container>
</template>
<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import BaseDetails from "@/features/user/components/BaseDetails.vue";
import InstituteItem from "@/features/institute/components/InstituteItem.vue";
const store = useStore();
// Get user institutes from Vuex
const institutes = computed(() => store.getters["institute/institutes"]);
const loading = computed(() => store.getters["institute/loading"]);
const error = computed(() => store.getters["institute/error"]);
onMounted(async () => {
  const userId = store.getters["auth/user"]?.id;
  if (userId) {
    await store.dispatch("institute/fetchInstitutesByUser", userId);
  }
});
</script>