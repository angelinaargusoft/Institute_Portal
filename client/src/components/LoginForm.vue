<template>
    <v-form @submit.prevent="onSubmit" ref="formRef">
      <v-card-title class="text-h6">Sign in</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="email"
          label="Email"
          required
          type="email"
        />
        <v-text-field
          v-model="password"
          label="Password"
          required
          type="password"
        />
        <v-alert v-if="error" dense type="error" class="mt-2">{{ error }}</v-alert>
      </v-card-text>
      <v-card-actions>
        <v-btn type="submit" :loading="loading" color="primary" block>
          Login
        </v-btn>
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
    const ok = await store.dispatch("auth/login", {
      email: email.value,
      password: password.value,
    });
    
    if (ok) {
      // navigate to redirect (if any) or dashboard
      const redirect = router.currentRoute.value.query.redirect || "/dashboard";
      router.push(redirect);
    }
  };
  </script>
  
  
  
  