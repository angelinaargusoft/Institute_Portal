<template>
  <v-main>
    <v-container fluid class="fill-height pa-0">
      <v-row class="fill-height">
        <!-- Left column: logo / illustration -->
        <v-col
          cols="12"
          md="6"
          class="d-flex justify-center align-center auth-left"
        >
          <!-- Placeholder for your logo / image -->
          <div class="text-center">
            <v-icon x-large color="primary">mdi-account-circle</v-icon>
            <h1 class="mt-4 font-weight-bold">Logo</h1>
          </div>
        </v-col>
        <!-- Right column: auth form -->
        <v-col
          cols="12"
          md="6"
          class="d-flex justify-center align-center"
        >
          <v-card
            class="pa-6"
            style="width: 80%;"
            elevation="8"
            rounded
          >
            <slot></slot>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<script setup>
// No additional logic needed; layout is purely presentational
</script>
<style scoped>
.auth-left {
  background: linear-gradient(135deg, #2196f3, #21cbf3); /* placeholder gradient */
  color: white;
  min-height: 100vh;
  flex-direction: column;
}
@media (max-width: 960px) {
  .auth-left {
    min-height: 200px;
    padding: 40px 0;
  }
}
</style>