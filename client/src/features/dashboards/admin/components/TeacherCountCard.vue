<template>
    <v-card class="pa-4" elevation="3" rounded="lg">
      <!-- Header -->
      <div class="d-flex align-center mb-3">
        <v-icon size="28" color="deep-purple" class="mr-2">mdi-account-tie</v-icon>
        <h3 class="text-h6 mb-0">Teachers</h3>
      </div>
      <div class="d-flex align-center">
        <!-- Dual Donut -->
        <svg width="90" height="90" viewBox="0 0 36 36" class="donut">
          <circle class="donut-ring" cx="18" cy="18" r="15.9155" fill="transparent" stroke="#e0e0e0" stroke-width="3" />
          <circle
            class="donut-segment male"
            cx="18"
            cy="18"
            r="15.9155"
            fill="transparent"
            stroke="#512da8"
            stroke-width="3"
            :stroke-dasharray="maleDash"
            stroke-dashoffset="25"
          />
          <circle
            class="donut-segment female"
            cx="18"
            cy="18"
            r="15.9155"
            fill="transparent"
            stroke="#ba68c8"
            stroke-width="3"
            :stroke-dasharray="femaleDash"
            :stroke-dashoffset="maleOffset"
          />
          <text x="18" y="20.35" class="donut-text" text-anchor="middle">{{ total }}</text>
        </svg>
        <div class="ml-4">
          <div class="d-flex align-center mb-1">
            <v-icon color="deep-purple" size="18" class="mr-1">mdi-human-male</v-icon>
            <span class="text-body-2">{{ male }} Male</span>
          </div>
          <div class="d-flex align-center">
            <v-icon color="pink" size="18" class="mr-1">mdi-human-female</v-icon>
            <span class="text-body-2">{{ female }} Female</span>
          </div>
        </div>
      </div>
    </v-card>
  </template>
  <script setup>
  import { computed } from "vue";
  const props = defineProps({
    male: { type: Number, required: true },
    female: { type: Number, required: true },
  });
  const total = computed(() => props.male + props.female);
  const malePercentage = computed(() => (total.value ? (props.male / total.value) * 100 : 0));
  const femalePercentage = computed(() => 100 - malePercentage.value);
  const maleDash = computed(() => `${malePercentage.value}, 100`);
  const femaleDash = computed(() => `${femalePercentage.value}, 100`);
  const maleOffset = computed(() => 25 + (100 - malePercentage.value) / 100 * 100);
  </script>
  <style scoped>
  .donut-text {
    font-size: 0.35em;
    fill: #333;
    font-weight: 600;
  }
  </style>