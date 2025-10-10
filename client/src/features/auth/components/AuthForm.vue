<template>
    <v-form @submit.prevent="onSubmit" ref="formRef">
        <v-card-title class="text-h4 font-weight-bold text-center mb-6">
      {{ modeTitle }}
    </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="email"
          label="Email"
          required
          type="email"
          outlined
          dense
          class="mb-4"
        />
        <v-text-field
          v-model="password"
          label="Password"
          required
          type="password"
          outlined
          dense
        />
        <v-alert v-if="error" dense type="error" class="mb-4">{{ error }}</v-alert>
      </v-card-text>
      <v-card-actions class="d-flex flex-column">
        <v-btn type="submit" :loading="loading" color="primary" block class="mb-4">
          {{ modeTitle }}
        </v-btn>
        <!-- Links at the bottom -->
        <div class="d-flex flex-column align-center links-container">
          <a
            v-if="mode === 'login'"
            href="#"
            @click.prevent="onForgotPassword"
            class="text-link mb-2"
          >
            Forgot password?
          </a>
          <a href="#" @click.prevent="toggleMode" class="text-link">
            {{ toggleText }}
          </a>
        </div>
      </v-card-actions>
    </v-form>
  </template>
  <script setup>
  import { ref, computed } from "vue";
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  const props = defineProps({
    initialMode: {
      type: String,
      default: "login", // 'login' or 'register'
    },
  });
  const store = useStore();
  const router = useRouter();
  const mode = ref(props.initialMode);
  const email = ref("");
  const password = ref("");
  const formRef = ref(null);
  const loading = computed(() => store.getters["auth/loading"]);
  const error = computed(() => store.getters["auth/error"]);
  const modeTitle = computed(() => (mode.value === "login" ? "Login" : "Register"));
  const toggleText = computed(() =>
    mode.value === "login"
      ? "Don't have an account? Register"
      : "Already have an account? Login"
  );
  const toggleMode = () => {
    mode.value = mode.value === "login" ? "register" : "login";
    email.value = "";
    password.value = "";
  };
  const onSubmit = async () => {
  if (mode.value === "login") {
    // Normal login flow
    const ok = await store.dispatch("auth/login", {
      email: email.value,
      password: password.value,
    });
    if (ok) {
      const redirect = router.currentRoute.value.query.redirect || "/home";
      router.push(redirect);
    }
  } else {
    // Register flow
    const ok = await store.dispatch("auth/register", {
      email: email.value,
      password: password.value,
    });
    if (ok) {
      // Auto-login after successful registration
      const loginOk = await store.dispatch("auth/login", {
        email: email.value,
        password: password.value,
      });
      if (loginOk) {
        router.push("/home");
      }
    }
  }
};

  const onForgotPassword = () => {
    alert("Forgot password clicked! Implement API flow here.");
  };
  </script>
  <style scoped>
  /* Optional: subtle hover on submit button */
  .v-btn:hover {
    transform: translateY(-1px);
    transition: all 0.2s ease;
  }
  /* Anchor-style links */
  .text-link {
    color: #1976d2;
    cursor: pointer;
    text-decoration: none;
    font-size: 0.875rem;
  }
  .text-link:hover {
    text-decoration: underline;
  }
  .links-container {
    margin-top: 8px;
  }
  </style>