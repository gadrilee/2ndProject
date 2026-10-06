<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        default: "",
    }
});
</script>

<template>
    <div>
        <h1 class="text-3xl font-extrabold text-primary">{{ title }}</h1>
        <p v-if="subtitle"  class="text-sm text-gray-800 mt-1">
            {{ subtitle }}.
        </p>
    </div>
</template>