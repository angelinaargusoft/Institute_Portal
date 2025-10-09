<template>
    <AuthForm :initialMode="initialMode" />
</template>
<script setup>
import { useRoute } from "vue-router";
import AuthForm from "@/components/AuthForm.vue";
const route = useRoute();
const initialMode = route.query.mode === "register" ? "register" : "login";
</script>