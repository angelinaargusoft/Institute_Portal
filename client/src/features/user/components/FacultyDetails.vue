<template>
    <v-container class="py-6">
      <!-- Profile Card -->
      <v-row justify="center">
        <v-col cols="12" md="6">
          <!-- If faculty profile exists -->
          <v-card
            v-if="profile && hasFacultyRole"
            outlined
            shaped
            elevation="2"
          >
            <v-card-title class="text-h5 font-weight-bold">
              {{ profile.firstName }} {{ profile.lastName }}
            </v-card-title>
            <v-card-subtitle class="mb-4">
              {{ profile.city }}, {{ profile.state }}
            </v-card-subtitle>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6">
                  <strong>Designation:</strong> {{ profile.designation || '-' }}
                </v-col>
                <v-col cols="12" sm="6">
                  <strong>Specialization:</strong> {{ profile.specialization || '-' }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <strong>Qualifications:</strong> {{ profile.qualifications || '-' }}
                </v-col>
                <v-col cols="12" sm="6">
                  <strong>Experience:</strong> {{ profile.yearsOfExperience || '-' }} years
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <strong>Phone:</strong> {{ profile.phone }}
                </v-col>
                <v-col cols="12" sm="6">
                  <strong>Address:</strong>
                  {{ profile.addressLine }}, {{ profile.city }} ({{ profile.postalCode }})
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="primary" rounded @click="editProfile">
                Edit Profile
              </v-btn>
            </v-card-actions>
          </v-card>
          <!-- If no faculty role or no profile -->
          <v-card
            v-else
            outlined
            shaped
            elevation="2"
            class="pa-6 text-center"
          >
            <p class="text-h6 mb-4">
              You haven’t added a faculty profile yet.
            </p>
            <v-btn color="primary" rounded @click="goToAddProfile">
              Add Faculty Profile
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  <script setup>
  import { computed, onMounted } from "vue";
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  const store = useStore();
  const router = useRouter();
  const user = computed(() => store.getters["auth/user"]);
  const profile = computed(() => store.getters["userProfile/profile"]);
  const hasFacultyRole = computed(() => {
    const roles = Array.isArray(user.value?.roles)
      ? user.value.roles
      : JSON.parse(user.value?.roles || "[]");
    return roles.includes("faculty");
  });
  onMounted(() => {
    if (user.value?.id) {
      store.dispatch("userProfile/fetchProfile", user.value.id);
    }
  });
  const goToAddProfile = () => {
    router.push("/update-faculty-profile");
  };
  const editProfile = () => {
    router.push(`/faculty-profile/${user.value.id}/edit`);
  };
  </script>