<script setup>
defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
    title: {
        type: String,
        default: "",
    },
});

const emit = defineEmits(["update:modelValue"]);

function close() {
    emit("update:modelValue", false);
}
</script>

<template>
    <div class="modal" :class="{ 'modal-open': modelValue }">
        <div class="modal-box max-w-lg border border-base-300">
            <h3 v-if="title" class="font-bold text-xl text-base-content mb-4">
                {{ title }}
            </h3>

            <slot :close="close" />
        </div>
    </div>
</template>