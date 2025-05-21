<template>
  <div class="flex flex-col items-center justify-center pt-20 pb-10">
    <i :class="icon" class="text-gray-200" :style="{ fontSize: `${iconSize}px` }" />

    <h5 class="mt-3.5">
      {{ title }}
    </h5>
    <div
      v-if="description"
      class="text-gray-600 text-sm mt-4 w-6/12 text-center"
    >
      <i v-if="hasWarningIcon" class="fas fa-circle-info text-primary-500 mr-2 text-base"></i>
      <span v-html="description" />
    </div>
    <div class="flex gap-6 mt-8">
      <button
        v-if="ctaBtn"
        type="button"
        class="btn btn-primary"
        @click="emit('ctaClick')"
      >
        <i class="fas fa-plus"></i> {{ ctaBtn }}
      </button>
      <button
        v-if="secondaryBtn"
        type="button"
        class="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
        @click="emit('secondaryClick')"
      >
        {{ secondaryBtn }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['ctaClick', 'secondaryClick']);
const props = withDefaults(defineProps<{
  icon: string,
  iconSize?: number,
  title: string,
  description?: string | null,
  ctaBtn?: string | null,
  secondaryBtn?: string | null,
  hasWarningIcon?: boolean,
}>(), {
  iconSize: 160,
  description: null,
  ctaBtn: null,
  secondaryBtn: null,
  hasWarningIcon: false,
});
</script>

<style lang="scss">
.empty-list-icon {
  font-size: 160px;
  @apply leading-none text-gray-200;
}
</style>
