<template>
    <AuthForm :initialMode="initialMode" />
</template>
<script setup>
import { useRoute } from "vue-router";
import AuthForm from "@/features/auth/components/AuthForm.vue";
const route = useRoute();
const initialMode = route.query.mode === "register" ? "register" : "login";
</script>