<template>
  <v-container class="py-6">
    <!-- Welcome message -->
    <v-row class="mb-6" justify="center">
      <v-col cols="12" md="8" class="text-center">
        <h1 v-if="profile" class="display-1 font-weight-bold">
          Welcome, {{ profile.firstName }}!
        </h1>
        <p class="subtitle-1">Here’s your faculty profile information</p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card v-if="profile" outlined shaped elevation="2">
          <v-card-title>
            <v-avatar size="64" class="me-4">
              <v-img :src="profile.facultyProfilePic || 'https://via.placeholder.com/64'" />
            </v-avatar>
            <div>
              <h3>{{ profile.firstName }} {{ profile.lastName }}</h3>
              <p class="text-grey">{{ profile.designation }}</p>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <strong>Specialization:</strong> {{ profile.specialization }}
              </v-col>
              <v-col cols="12" sm="6">
                <strong>Qualifications:</strong> {{ profile.qualifications }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <strong>Experience:</strong> {{ profile.yearsOfExperience }} years
              </v-col>
              <v-col cols="12" sm="6">
                <strong>Phone:</strong> {{ profile.phone || "N/A" }}
              </v-col>
            </v-row>
            <v-row class="mt-2">
              <v-col cols="12">
                <strong>Address:</strong>
                {{ profile.address.addressLine }}, {{ profile.address.city }}
                ({{ profile.address.postalCode }})
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn color="primary" rounded @click="editProfile">Edit Profile</v-btn>
          </v-card-actions>
        </v-card>
        <!-- Add profile button if not present -->
        <v-card v-else outlined shaped elevation="2" class="pa-6 text-center">
          <p class="text-h6 mb-4">You haven’t added a faculty profile yet.</p>
          <v-btn color="primary" rounded @click="goToAddProfile">
            Add Profile
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
const store = useStore();
const router = useRouter();
const route = useRoute();
const userId = route.params.userId;
const profile = computed(() => store.getters["userProfile/profile"]);
onMounted(() => {
  store.dispatch("userProfile/fetchProfile", userId);
});
const goToAddProfile = () => {
  router.push("/update-profile"); // route to faculty add/edit form
};
const editProfile = () => {
  router.push(`/user-profile/${userId}/edit`);
};
</script>