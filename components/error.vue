<template>
    <div
      class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
    >
      <p>Error loading {{ title }}: {{ error }}</p>
      <button
        @click="onRetry"
        class="mt-2 text-blue-600 hover:text-blue-800"
      >
        <i class="fas fa-sync-alt mr-1"></i> Try Again
      </button>
    </div>
</template>

<script setup lang="ts">

defineProps<{
    title: string;
    error: string;
    onRetry: () => void;
}>();

</script>

<style lang="sass" scoped>

</style>