<script setup>
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
</script>

<template>
    <h1 class="text-black text-3xl">Hola, {{ auth.user?.name }}</h1>
</template>