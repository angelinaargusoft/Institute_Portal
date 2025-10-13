import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import { components } from "vuetify/dist/vuetify.js";

// Pages (lazy-load recommended)
const HomePage = () => import("@/features/home/pages/HomePage.vue");
const AuthPage = () => import("@/features/auth/pages/AuthPage.vue");
const StudentProfilePage = () => import("@/features/user/pages/StudentProfilePage.vue");
const FacultyProfilePage = () => import("@/features/user/pages/FacultyProfilePage.vue");
const UpdateProfilePage = () => import("@/features/user/pages/UpdateProfilePage.vue");
const UpdateInstitutePage = () => import("@/features/institute/pages/UpdateInstitutePage.vue");
const AdminDashboardPage = () => import("@/features/dashboards/admin/pages/AdminDashboardPage.vue");
const UpdateFacultyProfilePage = () => import("@/features/user/pages/UpdateFacultyProfilePage.vue");
const UpdateStudentProfilePage = () => import("@/features/user/pages/UpdateStudentProfilePage.vue");
const StudentsPage = () => import("@/features/dashboards/admin/pages/StudentsPage.vue");
const FaculiesPage = () => import("@/features/dashboards/admin/pages/FacultiesPage.vue");
const routes = [
  // ----------------------------
  // Auth routes
  // ----------------------------
  {
    path: "/auth",
    name: "Auth",
    component: AuthPage,
    meta: { layout: "auth", guest: true },
  },
  // ----------------------------
  // Main routes (no sidebar)
  // ----------------------------
  {
    path: "/home",
    name: "Home",
    component: HomePage,
    meta: { layout: "main", requiresAuth: true },
  },
  {
    path: "/profile/student",
    name: "StudentProfile",
    component: StudentProfilePage,
    meta: { layout: "main", requiresAuth: true },
  },
  {
    path: "/profile/faculty",
    name: "FacultyProfile",
    component: FacultyProfilePage,
    props: true,
    meta: { layout: "main", requiresAuth: true },
  },
  {
    path: "/user-profile/:userId/edit",
    name: "EditProfile",
    component: UpdateProfilePage,
    props: true,
    meta: { layout: "main", requiresAuth: true },
  },
  {
    path: "/faculty-profile/:userId/edit",
    name: "EditFacultyProfile",
    component: UpdateFacultyProfilePage,
    props: true,
    meta: { layout: "main", requiresAuth: true },
  },
  {
    path: "/student-profile/:userId/edit",
    name: "EditStudentProfile",
    component: UpdateStudentProfilePage,
    props: true,
    meta: { layout: "main", requiresAuth: true },
  },
  {
    path: "/update-profile",
    name: "UpdateProfile",
    component: UpdateProfilePage,
    meta: { layout: "main", requiresAuth: true },
  },
  {
    path: "/update-faculty-profile",
    name: "UpdateFacultyProfile",
    component: UpdateFacultyProfilePage,
    meta: {layout: "main", requiresAuth: true},
  },
  {
    path: "/institutes/add",
    name: "AddInstitute",
    component: UpdateInstitutePage,
    meta: { layout: "main", requiresAuth: true },
  },
  {
    path: "/institutes/:id/edit",
    name: "EditInstitute",
    component: UpdateInstitutePage,
    props: true,
    meta: { layout: "main", requiresAuth: true },
  },
  // ----------------------------
  // Dashboard routes (with sidebar)
  // ----------------------------
  {
    path: "/dashboard/admin/:id?",
    name: "AdminDashboard",
    component: AdminDashboardPage,
    meta: { layout: "dashboard", requiresAuth: true },
  },
  {
    path: "/dashboard/admin/:id?/students",
    name: "AllStudents",
    component: StudentsPage,
    meta: { layout: "dashboard", requiresAuth: true },
  },
  {
    path: "/dashboard/admin/:id?/faculties",
    name: "AllFaculties",
    component: FaculiesPage,
    meta: { layout: "dashboard", requiresAuth: true },
  },
  // Default redirect
  { path: "/", redirect: "/home" },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
// ----------------------------
// Global auth guard
// ----------------------------
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = store.getters["auth/isAuthenticated"];
  if (requiresAuth && !isAuthenticated) {
    next({ name: "Auth", query: { redirect: to.fullPath } });
  } else {
    next();
  }
});
export default router;