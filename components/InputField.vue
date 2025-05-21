<template>
  <fieldset v-if="props.type === 'file'" class="fieldset">
    <legend class="fieldset-legend">{{ props.label }}</legend>
    <input type="file" class="file-input" @change="handleFileChange" />
    <label class="label">Max size 2MB</label>
  </fieldset>

  <fieldset v-else-if="props.type === 'toggle'" class="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4">
    <legend class="fieldset-legend">{{ props.label }}</legend>
    <label class="label">
      <input type="checkbox" v-model="value" class="toggle toggle-primary checked:bg-primary-content" />
    </label>
  </fieldset>

  <div v-else>
    <fieldset class="fieldset">
      <legend class="fieldset-legend">{{ props.label }}</legend>
      <input type="text" class="input" v-model="value" :placeholder="props.placeholder || 'Enter ' + props.label" />
    </fieldset>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string | number | boolean;
  label: string;
  placeholder?: string;
  type?:
    | "text"
    | "number"
    | "date"
    | "checkbox"
    | "toggle"
    | "radio"
    | "select"
    | "textarea"
    | "file";
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number | boolean): void;
}>();

const value = computed<string | number | boolean>({
  get() {
    return props.modelValue;
  },
  set(val: string | number | boolean) {
    emit("update:modelValue", val);
  },
});

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    emit("update:modelValue", file.name);
  }
};




</script>

<style lang="sass" scoped></style>
