<template>
  <v-card outlined class="mb-4 mx-auto" max-width="900">
    <!-- Header with Logo and Name -->
    <v-card-title class="d-flex align-center">
      <v-avatar size="64" class="me-4">
        <v-img
          :src="institute.logoUrl || 'https://via.placeholder.com/64?text=Logo'"
          alt="Institute Logo"
          cover
        />
      </v-avatar>
      <div>
        <h3 class="text-h6 mb-1">{{ institute.name }}</h3>
        <p class="text-body-2 text-grey">{{ institute.email || "No email provided" }}</p>
      </div>
      <v-spacer />
      <v-btn color="primary" variant="tonal" size="small" @click="goToInstitute">
        <v-icon start>mdi-eye</v-icon> View
      </v-btn>
    </v-card-title>
    <v-divider class="my-3" />
    <!-- Description & Status -->
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <h4 class="text-subtitle-2 mb-1">Description</h4>
          <p class="text-body-2">{{ institute.description || "No description provided." }}</p>
        </v-col>
        <v-col cols="12" md="6">
          <h4 class="text-subtitle-2 mb-1">Status</h4>
          <v-chip :color="statusColor(institute.status)" size="small" class="text-capitalize">
            {{ institute.status || "—" }}
          </v-chip>
        </v-col>
      </v-row>
      <v-divider class="my-3" />
      <!-- Address -->
      <h4 class="text-subtitle-2 mb-1">Address</h4>
      <ul class="text-body-2 mb-0">
        <li>{{ institute.addressLine || "—" }}</li>
        <li>{{ institute.city || "—" }}, {{ institute.state || "" }}</li>
        <li>
          {{ institute.country || "—" }}
          <span v-if="institute.postalCode"> - {{ institute.postalCode }}</span>
        </li>
      </ul>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { useRouter } from "vue-router";
import { defineProps } from "vue";
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
</script>







