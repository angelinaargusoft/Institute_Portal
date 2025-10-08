import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";

// Views (lazy-load recommended)
const LoginView = () => import("@/views/LoginView.vue");
const RegisterView = () => import("@/views/RegisterView.vue");
const HomeView = () => import("@/views/HomeView.vue");
const StudentProfileView = () => import("@/views/StudentProfileView.vue");
const UpdateProfileView = () => import("@/views/UpdateProfileView.vue");
const AddInstituteView = () => import("@/views/AddInstituteView.vue");
const AdminDashboardView = () => import("@/views/AdminDashboardView.vue");
const FacultyProfileView = () => import("@/views/FacultyProfileView.vue")
const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: { layout: "auth", guest: true },
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
    meta: { layout: "auth", guest: true },
  },
  {
    path: "/home",
    name: "Home",
    component: HomeView,
    meta: { layout: "main", requiresAuth: true },
  },
  {
    path: "/profile/student",
    name: "StudentProfile",
    component: StudentProfileView,
    meta: { layout: "main", requiresAuth: true }
  },
  {
    path: "/profile/faculty",
    name: "FacultyProfile",
    component: FacultyProfileView,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/user-profile/:userId/edit",
    name: "EditProfile",
    component: UpdateProfileView,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/update-profile",
    name: "UpdateProfile",
    component: UpdateProfileView,
    meta: { layout: "main", requiresAuth: true },
  },
  {
    path: "/institutes/add",
    name: "AddInstitute",
    component: AddInstituteView,
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard/admin/:id",
    name: "AdminDashboard",
    component: AdminDashboardView,
    meta: { requiresAuth: true },
  },
  { path: "/", redirect: "/home" }, // default
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = store.getters["auth/isAuthenticated"];
  if (requiresAuth && !isAuthenticated) {
    // Redirect to login and preserve original target route
    next({ name: "Login", query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;