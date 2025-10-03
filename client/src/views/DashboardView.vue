<template>
  <v-container>
    <h2>User Dashboard</h2>
    <v-card v-if="profile">
      <v-card-title>{{ profile.firstName }} {{ profile.lastName }}</v-card-title>
      <v-card-subtitle>{{ profile.city }}, {{ profile.state }}</v-card-subtitle>
      <v-card-text>
        <p><strong>DOB:</strong> {{ profile.dob }}</p>
        <p><strong>Gender:</strong> {{ profile.gender }}</p>
        <p><strong>Phone:</strong> {{ profile.phone }}</p>
        <p><strong>Address:</strong> {{ profile.addressLine }}, {{ profile.city }} ({{ profile.postalCode }})</p>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="editProfile">Edit Profile</v-btn>
      </v-card-actions>
    </v-card>
    <v-btn v-else color="primary" class="mt-4" @click="goToAddProfile">
      Add Profile
    </v-btn>
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
onMounted(() => {
  if (user.value?.id) {
    store.dispatch("userProfile/fetchProfile", user.value.id);
  }
});
const goToAddProfile = () => {
  router.push("/update-profile");
};
const editProfile = () => {
  router.push(`/user-profile/${user.value.id}/edit`);
};
</script>