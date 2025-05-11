<template>
    <label class="input w-full mb-4">
      <svg
        class="h-[1em] opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="2.5"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </g>
      </svg>
      <input type="search" class="grow" :placeholder="placeholder || 'Search'" v-model="value" />
    </label>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
  placeholder?: string;
}>();

const value = computed<string>({
  get() {
    return props.modelValue;
  },
  set(val: string) {
    emit("update:modelValue", val);
  },
});
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();


</script>

<style lang="scss" scoped></style>
