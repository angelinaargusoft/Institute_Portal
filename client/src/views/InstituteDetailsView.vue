<template>
    <v-container class="py-6">
      <!-- Loading State -->
      <v-row justify="center" v-if="loading">
        <v-col cols="12" class="text-center my-10">
          <v-progress-circular indeterminate color="primary" size="50" />
          <p class="mt-2">Loading institute details...</p>
        </v-col>
      </v-row>
      <!-- Error State -->
      <v-alert
        v-else-if="error"
        type="error"
        variant="tonal"
        class="my-6"
        title="Error Loading Institute"
        :text="error"
      />
      <!-- Institute Details -->
      <v-card v-else-if="institute" outlined class="mx-auto pa-4" max-width="900">
        <v-card-title class="d-flex align-center">
          <v-avatar size="72" class="me-4">
            <v-img
              :src="institute.logoUrl || 'https://via.placeholder.com/72?text=Institute'"
              alt="Institute Logo"
              cover
            />
          </v-avatar>
          <div>
            <h2 class="text-h5 mb-1">{{ institute.name }}</h2>
            <p class="text-body-2 text-grey">{{ institute.email }}</p>
          </div>
          <v-spacer />
          <v-btn color="primary" variant="tonal" @click="goToEdit">
            <v-icon start>mdi-pencil</v-icon> Edit
          </v-btn>
        </v-card-title>
        <v-divider class="my-3" />
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <h4 class="text-subtitle-1 mb-2">Description</h4>
              <p class="text-body-2">
                {{ institute.description || "No description provided." }}
              </p>
            </v-col>
            <v-col cols="12" md="6">
              <h4 class="text-subtitle-1 mb-2">Status</h4>
              <v-chip
                :color="statusColor(institute.status)"
                class="text-capitalize"
                size="small"
              >
                {{ institute.status }}
              </v-chip>
              <div class="mt-4">
                <h4 class="text-subtitle-1 mb-2">Created At</h4>
                <p class="text-body-2">{{ formatDate(institute.createdAt) }}</p>
              </div>
            </v-col>
          </v-row>
          <v-divider class="my-4" />
          <h4 class="text-subtitle-1 mb-2">Address Details</h4>
          <v-row>
            <v-col cols="12" md="6">
              <ul class="text-body-2">
                <li>{{ institute.addressLine || "—" }}</li>
                <li>
                  {{ institute.city || "—" }},
                  {{ institute.state || "" }}
                </li>
                <li>
                  {{ institute.country || "—" }}
                  <span v-if="institute.postalCode"> - {{ institute.postalCode }}</span>
                </li>
                <li v-if="institute.addressType">
                  <strong>Type:</strong> {{ institute.addressType }}
                </li>
              </ul>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <!-- Empty State -->
      <v-alert
        v-else
        type="info"
        title="No Institute Found"
        text="The institute you're looking for does not exist or was removed."
        class="my-10"
      />
    </v-container>
  </template>
  <script setup>
  import { onMounted, ref } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useStore } from "vuex";
  const route = useRoute();
  const router = useRouter();
  const store = useStore();
  const institute = ref(null);
  const loading = ref(true);
  const error = ref(null);
  onMounted(async () => {
    try {
      const id = route.params.id;
      // Ensure we have the list
      if (!store.getters["institute/institutes"].length) {
        await store.dispatch("institute/fetchInstitutes");
      }
      // Try finding locally
      institute.value = store.getters["institute/institutes"].find((i) => i.id === id);
      // Fallback to direct fetch
      if (!institute.value) {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/institutes/${id}`);
        if (!res.ok) throw new Error("Failed to load institute");
        institute.value = await res.json();
      }
    } catch (err) {
      error.value = err.message || "Something went wrong while loading the institute.";
    } finally {
      loading.value = false;
    }
  });
  function formatDate(date) {
    return date ? new Date(date).toLocaleString() : "—";
  }
  function statusColor(status) {
    switch (status) {
      case "active":
        return "green";
      case "inactive":
        return "red";
      case "pending_approval":
        return "orange";
      default:
        return "grey";
    }
  }
  function goToEdit() {
    router.push(`/institutes/${route.params.id}/edit`);
  }
  </script>