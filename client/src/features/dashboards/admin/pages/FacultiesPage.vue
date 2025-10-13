<template>
    <v-container class="py-8">
      <h2 class="text-h5 font-weight-bold mb-6 text-center">Faculty</h2>
      <!-- Filters -->
      <v-row class="mb-4" dense>
        <v-col cols="12" sm="4">
          <v-select
            v-model="selectedDesignation"
            :items="designationOptions"
            label="Filter by Designation"
            dense
            outlined
            clearable
          />
        </v-col>
        <v-col cols="12" sm="4">
          <v-select
            v-model="selectedSpecialisation"
            :items="specialisationOptions"
            label="Filter by Specialisation"
            dense
            outlined
            clearable
          />
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="searchQuery"
            label="Search by Name"
            dense
            outlined
            clearable
            append-icon="mdi-magnify"
          />
        </v-col>
      </v-row>
      <!-- Faculty List -->
      <v-card outlined>
        <!-- Table Header -->
        <v-row class="font-weight-medium py-2 px-3" dense>
          <v-col cols="2">Photo</v-col>
          <v-col cols="2">Name</v-col>
          <v-col cols="2">Designation</v-col>
          <v-col cols="2">Specialisation</v-col>
          <v-col cols="2">Qualifications</v-col>
          <v-col cols="1">Experience</v-col>
          <v-col cols="1" class="text-right">Action</v-col>
        </v-row>
        <!-- Faculty Rows -->
        <FacultyRow
          v-for="faculty in filteredFaculty"
          :key="faculty.id"
          :faculty="faculty"
          @view="handleView"
        />
      </v-card>
    </v-container>
  </template>
  <script setup>
  import { ref, computed } from "vue";
  import FacultyRow from "../components/FacultyRow.vue";
  // Dummy faculty data
  const facultyList = ref([
    { id: 1, name: "Dr. Alice Johnson", designation: "Professor", specialisation: "Mathematics", qualifications: "PhD", experience: 15, photo: "" },
    { id: 2, name: "Mr. Bob Smith", designation: "Assistant Professor", specialisation: "Physics", qualifications: "MSc", experience: 8, photo: "" },
    { id: 3, name: "Ms. Charlie Lee", designation: "Lecturer", specialisation: "Chemistry", qualifications: "MSc", experience: 5, photo: "" },
    { id: 4, name: "Dr. Diana King", designation: "Professor", specialisation: "Computer Science", qualifications: "PhD", experience: 12, photo: "" },
  ]);
  // Filter options
  const designationOptions = ["Professor", "Assistant Professor", "Lecturer"];
  const specialisationOptions = ["Mathematics", "Physics", "Chemistry", "Computer Science"];
  const selectedDesignation = ref(null);
  const selectedSpecialisation = ref(null);
  const searchQuery = ref("");
  // Computed filtered list
  const filteredFaculty = computed(() => {
    return facultyList.value.filter((f) => {
      const matchesDesignation = selectedDesignation.value ? f.designation === selectedDesignation.value : true;
      const matchesSpecialisation = selectedSpecialisation.value ? f.specialisation === selectedSpecialisation.value : true;
      const matchesSearch = searchQuery.value
        ? f.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        : true;
      return matchesDesignation && matchesSpecialisation && matchesSearch;
    });
  });
  // Handle View button click
  function handleView(faculty) {
    alert(`View faculty: ${faculty.name} (${faculty.designation})`);
  }
  </script>
  <style scoped>
  </style>