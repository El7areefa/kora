<template>
  <fieldset v-if="props.type === 'file'" class="fieldset">
    <legend class="fieldset-legend">{{ props.label }}</legend>
    <input
      type="file"
      @blur="props.validator?.$touch()"
      class="file-input"
      @change="handleFileChange"
    />
    <label class="label">Max size 2MB</label>
  </fieldset>

  <fieldset
    v-else-if="props.type === 'toggle'"
    class="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4"
  >
    <legend class="fieldset-legend">{{ props.label }}</legend>
    <label class="label">
      <input
        @blur="props.validator?.$touch()"
        type="checkbox"
        v-model="value"
        class="toggle toggle-primary checked:bg-primary-content"
      />
    </label>
  </fieldset>

  <fieldset
    v-else-if="props.type === 'select'"
    class="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4"
  >
    <legend class="fieldset-legend">{{ props.label }}</legend>
    <label class="label">
      <select
        v-model="value"
        @blur="props.validator?.$touch()"
        class="select text-black"
      >
        <option disabled selected>Select {{ props.label }}</option>
        <option
          class="text-black"
          v-for="option in props.options"
          :key="option"
        >
          {{ option }}
        </option>
      </select>
    </label>
  </fieldset>

  <div v-else>
    <label class="block font-semibold mb-1"
      >{{ props.label
      }}<span v-if="props.required" class="text-red-500">*</span></label
    >
    <input
      v-model="value"
      @blur="props.validator?.$touch()"
      :type="props.type"
      required
      class="w-full input"
      :placeholder="props.placeholder || 'Enter ' + props.label"
    />
  </div>

  <div v-if="props.validator" class="text-red-500 text-sm">
    <span v-for="err in props.validator.$errors" :key="err.$uid">
      {{ err.$message }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { BaseValidation } from "@vuelidate/core";

const props = defineProps<{
  modelValue: string | number | boolean;
  label: string;
  placeholder?: string;
  options?: string[];
  required?: boolean;
  validator?: BaseValidation;
  type?:
    | "text"
    | "tel"
    | "password"
    | "email"
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
