<template>
    <v-container class="py-6">
      <!-- Check if user has student role -->
      <v-row justify="center" class="mb-6" v-if="!isStudent">
        <v-col cols="12" md="8" class="text-center">
          <v-alert type="warning" variant="outlined">
            You do not have a student profile.
          </v-alert>
        </v-col>
      </v-row>
      <v-row v-else justify="center">
        <v-col cols="12" md="8">
          <!-- Welcome message -->
          <div class="text-center mb-6">
            <h1 v-if="profile" class="display-1 font-weight-bold">
              Welcome, {{ profile.firstName }}!
            </h1>
            <p class="subtitle-1">Here’s your student profile information</p>
          </div>
          <!-- Profile Card -->
          <v-card v-if="profile" outlined shaped elevation="2">
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
                  <strong>DOB:</strong> {{ profile.dob }}
                </v-col>
                <v-col cols="12" sm="6">
                  <strong>Gender:</strong> {{ profile.gender }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <strong>Phone:</strong> {{ profile.phone }}
                </v-col>
                <v-col cols="12" sm="6">
                  <strong>Address:</strong>
                  {{ profile.address.addressLine }}, {{ profile.address.city }}
                  ({{ profile.address.postalCode }})
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="primary" rounded @click="editProfile">
                Edit Profile
              </v-btn>
            </v-card-actions>
          </v-card>
          <!-- Add profile button if no profile -->
          <v-card v-else outlined shaped elevation="2" class="pa-6 text-center">
            <p class="text-h6 mb-4">You haven’t added a student profile yet.</p>
            <v-btn color="primary" rounded @click="goToAddProfile">
              Add Student Profile
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
  // Check if user has 'student' role
  const isStudent = computed(() => user.value?.roles?.includes("student"));
  onMounted(() => {
    if (isStudent.value && user.value?.id) {
      store.dispatch("userProfile/fetchProfile", user.value.id);
    }
  });
  // Navigation
  const goToAddProfile = () => {
    router.push("/update-profile");
  };
  const editProfile = () => {
    router.push(`/user-profile/${user.value.id}/edit`);
  };
  </script>