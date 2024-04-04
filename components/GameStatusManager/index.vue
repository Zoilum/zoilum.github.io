<script setup lang="ts">
const emit = defineEmits(['restartGame'])

interface Props {
    status: 'idle' | 'pending' | 'success' | 'error'
}

const { status } = defineProps<Props>()
</script>
<template>
    <Loader :status="status"></Loader>
</template>
