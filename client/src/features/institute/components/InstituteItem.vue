<template>
  <v-card
    class="mx-auto my-4 institute-card"
    max-width="900"
    elevation="2"
    rounded="lg"
  >
    <!-- Top Banner -->
    <div class="card-banner d-flex align-center pa-4">
      <v-avatar size="64" class="me-4 border">
        <v-img
          :src="institute.logoUrl || 'https://via.placeholder.com/64?text=Logo'"
          alt="Institute Logo"
          cover
        />
      </v-avatar>
      <div class="flex-grow-1">
        <h2 class="text-h6 mb-1 font-weight-bold">{{ institute.name }}</h2>
        <p class="text-body-2 text-grey-darken-1 mb-0">
          {{ institute.email || "No email provided" }}
        </p>
      </div>
      <v-btn
        color="primary"
        variant="elevated"
        size="small"
        rounded="lg"
        class="ms-4"
        @click="goToInstitute"
      >
        <v-icon start>mdi-eye</v-icon>
        View Details
      </v-btn>
    </div>
    <v-divider />
    <!-- Description & Status -->
    <v-card-text class="pt-4 pb-2">
      <v-row>
        <v-col cols="12" md="8">
          <h4 class="text-subtitle-2 text-grey-darken-2 mb-1">Description</h4>
          <p class="text-body-2 text-grey-darken-1 mb-2">
            {{ institute.description || "No description provided." }}
          </p>
        </v-col>
        <v-col cols="12" md="4" class="d-flex align-center justify-md-end">
          <div>
            <h4 class="text-subtitle-2 text-grey-darken-2 mb-1">Status</h4>
            <v-chip
              :color="statusColor(institute.status)"
              size="small"
              text-color="white"
              class="text-capitalize font-weight-medium"
            >
              {{ formatStatus(institute.status) }}
            </v-chip>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider />
    <!-- Address Section -->
    <v-card-text class="pt-3">
      <h4 class="text-subtitle-2 text-grey-darken-2 mb-1">Address</h4>
      <div class="text-body-2 text-grey-darken-1">
        <div>{{ institute.addressLine || "—" }}</div>
        <div>{{ institute.city || "—" }}, {{ institute.state || "" }}</div>
        <div>
          {{ institute.country || "—" }}
          <span v-if="institute.postalCode"> - {{ institute.postalCode }}</span>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { useRouter } from "vue-router";
const props = defineProps({
  institute: { type: Object, required: true },
});
const router = useRouter();
const goToInstitute = () => {
  router.push(`/dashboard/admin/${props.institute.id}`);
};
const statusColor = (status) => {
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
};
const formatStatus = (status) =>
  status ? status.replace("_", " ") : "—";
</script>
<style scoped>
.institute-card {
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}
.institute-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}
.card-banner {
  background: linear-gradient(135deg, #e3f2fd, #ffffff);
  border-bottom: 1px solid #e0e0e0;
}
.border {
  border: 2px solid #e0e0e0;
}
.text-grey-darken-1 {
  color: #616161 !important;
}
.text-grey-darken-2 {
  color: #424242 !important;
}
</style>






