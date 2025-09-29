import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";

// Views (lazy-load recommended)
const LoginView = () => import("@/views/LoginView.vue");
const RegisterView = () => import("@/views/RegisterView.vue");
const DashboardView = () => import("@/views/DashboardView.vue");

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
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardView,
    meta: { layout: "main", requiresAuth: true },
  },
  { path: "/", redirect: "/dashboard" }, // default
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