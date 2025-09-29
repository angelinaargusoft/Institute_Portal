<template>
  <v-form @submit.prevent="onSubmit" ref="formRef">
    <v-card-title class="text-h6">Create account</v-card-title>
    <v-card-text>
      <v-text-field v-model="email" label="Email" required type="email" />
      <v-text-field v-model="password" label="Password" required type="password" />
      <v-alert v-if="error" dense type="error" class="mt-2">{{ error }}</v-alert>
    </v-card-text>
    <v-card-actions>
      <v-btn type="submit" :loading="loading" color="primary" block>Register</v-btn>
    </v-card-actions>
  </v-form>
</template>
<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const formRef = ref(null);

const loading = computed(() => store.getters["auth/loading"]);
const error = computed(() => store.getters["auth/error"]);
const onSubmit = async () => {
  const ok = await store.dispatch("auth/register", {
    email: email.value,
    password: password.value,
  });
  if (ok) {

      const redirect = router.currentRoute.value.query.redirect || "/login";
      router.push(redirect);
    }
};
</script>