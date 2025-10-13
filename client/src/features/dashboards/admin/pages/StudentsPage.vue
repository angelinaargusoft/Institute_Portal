<template>
    <v-container class="py-8">
      <div class="d-flex justify-space-between align-center mb-6">
        <h2 class="text-h5 font-weight-bold">Students</h2>
        <v-btn color="primary" prepend-icon="mdi-account-plus" @click="openEnrollDialog = true">
          Enroll Student
        </v-btn>
      </div>
      <!-- Filters -->
      <v-row class="mb-4" dense>
        <v-col cols="12" sm="3">
          <v-select
            v-model="selectedClass"
            :items="classOptions"
            label="Filter by Class"
            dense
            outlined
            clearable
          />
        </v-col>
        <v-col cols="12" sm="3">
          <v-select
            v-model="selectedSection"
            :items="sectionOptions"
            label="Filter by Section"
            dense
            outlined
            clearable
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="searchQuery"
            label="Search by Name or Roll No."
            dense
            outlined
            append-icon="mdi-magnify"
            clearable
          />
        </v-col>
      </v-row>
      <!-- Student List -->
      <v-card outlined>
        <!-- Table Header -->
        <v-row class="font-weight-medium py-2 px-3" dense>
          <v-col cols="1">Photo</v-col>
          <v-col cols="2">Name</v-col>
          <v-col cols="2">Roll No</v-col>
          <v-col cols="2">Class</v-col>
          <v-col cols="2">Section</v-col>
          <v-col cols="2">Email</v-col>
          <v-col cols="1" class="text-right">Action</v-col>
        </v-row>
        <!-- Student Rows -->
        <StudentRow
          v-for="student in filteredStudents"
          :key="student.id"
          :student="student"
          @view="handleView"
        />
      </v-card>
      <!-- Enroll Student Dialog -->
      <v-dialog v-model="openEnrollDialog" max-width="500">
        <v-card>
          <v-card-title class="text-h6 font-weight-bold">
            Enroll New Student
          </v-card-title>
          <v-card-text>
            <p>Enrollment form will go here (you can add it later).</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn text @click="openEnrollDialog = false">Cancel</v-btn>
            <v-btn color="primary" @click="confirmEnrollment">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  <script setup>
  import { ref, computed } from "vue";
  import StudentRow from "../components/StudentRow.vue";
  // Dummy students
  const students = ref([
    { id: 1, name: "Rohit Sharma", roll: "101", class: "10", section: "A", email: "rohit@example.com", photo: "" },
    { id: 2, name: "Sneha Patel", roll: "102", class: "10", section: "B", email: "sneha@example.com", photo: "" },
    { id: 3, name: "Amit Kumar", roll: "103", class: "9", section: "A", email: "amit@example.com", photo: "" },
    { id: 4, name: "Priya Singh", roll: "104", class: "8", section: "C", email: "priya@example.com", photo: "" },
  ]);
  // Filters
  const classOptions = ["8", "9", "10", "11", "12"];
  const sectionOptions = ["A", "B", "C", "D"];
  const selectedClass = ref(null);
  const selectedSection = ref(null);
  const searchQuery = ref("");
  const filteredStudents = computed(() =>
    students.value.filter((s) => {
      const matchesClass = selectedClass.value ? s.class === selectedClass.value : true;
      const matchesSection = selectedSection.value ? s.section === selectedSection.value : true;
      const matchesSearch =
        searchQuery.value
          ? s.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            s.roll.includes(searchQuery.value)
          : true;
      return matchesClass && matchesSection && matchesSearch;
    })
  );
  // Dialog handling
  const openEnrollDialog = ref(false);
  function confirmEnrollment() {
    alert("Enrollment saved (mock action)");
    openEnrollDialog.value = false;
  }
  // View handler
  function handleView(student) {
    alert(`Viewing student: ${student.name}`);
  }
  </script>
  <style scoped>
  </style>