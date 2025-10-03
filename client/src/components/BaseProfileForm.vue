
  <template>
    <v-card outlined class="mb-4">
      <v-card-title>Base Details</v-card-title>
      <v-card-text>
        <v-text-field v-model="localProfile.firstName" label="First Name" required />
        <v-text-field v-model="localProfile.lastName" label="Last Name" />
        <v-text-field v-model="localProfile.dob" type="date" label="Date of Birth" required />
        <v-select
          v-model="localProfile.gender"
          :items="['male', 'female', 'other']"
          label="Gender"
          required
        />
        <v-text-field v-model="localProfile.phone" label="Phone" required />

        <h4 class="mt-4 mb-2">Address</h4>
        <v-select
          v-model="localProfile.addressType"
          :items="['current', 'permanent']"
          label="Address Type"
        />
        <v-text-field v-model="localProfile.addressLine" label="Address Line" />
        <v-text-field v-model="localProfile.city" label="City" />
        <v-text-field v-model="localProfile.state" label="State" />
        <v-text-field v-model="localProfile.country" label="Country" />
        <v-text-field v-model="localProfile.postalCode" label="Postal Code" />
      </v-card-text>
    </v-card>
  </template>
  <script setup>
  import { watch, reactive } from "vue";
  const props = defineProps({
    modelValue: { type: Object, default: () => ({}) },
  });
  const emit = defineEmits(["update:modelValue"]);
  const localProfile = reactive({ ...props.modelValue });

  watch(
    () => localProfile,
    (val) => emit("update:modelValue", val),
    { deep: true }
  );
  </script>