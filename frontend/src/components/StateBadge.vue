<script setup>
const props = defineProps({
    state: { type: String, required: true },
});

const BADGE_MAP = {
    disponible: "badge-success",
    intercambiado: "badge-neutral",
    reservado: "badge-warning",
};
</script>

<template>
    <span class="badge badge-sm font-medium capitalize" :class="BADGE_MAP[state?.toLowerCase()] || 'badge-ghost'">
        {{ state }}
    </span>
</template>