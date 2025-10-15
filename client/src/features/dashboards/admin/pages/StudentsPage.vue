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
      <EnrollStudentDialog
  v-model="openEnrollDialog"
  @enroll="handleEnrollment"
/>
    </v-container>
  </template>
  <script setup>
  import { ref, computed, onMounted } from "vue";
  import { useStore } from "vuex";
  import StudentRow from "../components/StudentRow.vue";
  import EnrollStudentDialog from "../components/EnrollStudentDialog.vue";

  const store = useStore();

  // Filters
  const classOptions = ["8", "9", "10", "11", "12"];
  const sectionOptions = ["A", "B", "C", "D"];
  const selectedClass = ref(null);
  const selectedSection = ref(null);
  const searchQuery = ref("");

  // Dialog handling
  const openEnrollDialog = ref(false);

  //fetch data
  onMounted(async()=>{
    const instituteId = 1; //check
    await store.dispatch("studentEnrollment/fetchEnrollmentsByInstitute", instituteId);
    await store.dispatch("userProfile/fetchAllProfiles"); //check
    await store.dispatch("auth/fetchAllUsers"); //check
  })

  // Combine data from 3 stores
  const enrollments = computed(() => store.getters["studentEnrollment/enrollments"] || []);
  const profiles = computed(() => store.getters["profile/profiles"] || []); //check
  const users = computed(() => store.getters["auth/users"] || []); //check

  //students list
  const students = computed(() => {
  return enrollments.value.map((enrollment) => {
    const profile = profiles.value.find((p) => p.userId === enrollment.userId) || {};
    const user = users.value.find((u) => u.id === enrollment.userId) || {};
    return {
      id: enrollment.id,
      userId: enrollment.userId,
      name: profile.name || "N/A",
      photo: profile.photo || "https://via.placeholder.com/36",
      email: user.email || "N/A",
      roll: enrollment.rollNumber || "-",
      class: enrollment.className || "",
      section: enrollment.section || "",
    };
  });
});

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
  
  function handleEnrollment(data){
    console.log("Enrolled student:", data);
  }
  // View handler
  function handleView(student) {
    alert(`Viewing student: ${student.name}`);
  }
  </script>
  <style scoped>
  </style>