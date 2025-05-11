<template>
  <div>
    <label class="label">
      <span class="label-text">{{ props.label }}</span>
    </label>
    <input
      v-model="value"
      :type="props.type || 'text'"
      class="input input-bordered w-full"
    />
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  modelValue: string | number | boolean;
  label: string;
  type?: 'text' | 'number' | 'date' | 'checkbox' | 'radio' | 'select' | 'textarea' | 'file';
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number | boolean): void;
}>();

const value = computed<string | number | boolean>({
  get() {
    return props.modelValue;
  },
  set(val: string | number | boolean ) {
    emit('update:modelValue', val);
  },
});

</script>

<style lang="sass" scoped></style>
