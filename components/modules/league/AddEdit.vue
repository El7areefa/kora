<template>
  <!-- Drawer -->
  <div class="drawer drawer-end">
    <input
      id="drawer-edit-league"
      type="checkbox"
      class="drawer-toggle"
      :checked="modelValue"
      @change="emit('update:modelValue', !modelValue)"
    />

    <div class="drawer-content">
      <!-- Blank Content (main page) -->
    </div>

    <div class="drawer-side">
      <label for="drawer-edit-league" class="drawer-overlay"></label>

      <div class="min-h-full flex flex-col w-96 bg-white p-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold mb-4">
            {{ league?.id ? "Edit" : "Add" }} League
          </h2>
          <button
            class="btn btn-sm btn-circle btn-ghost"
            @click="emit('update:modelValue', false)"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="space-y-4">
          <InputField label="League Name" v-model="league.name" type="text" />
          <InputField label="League Logo" v-model="league.logo" type="file" />
        </div>

        <div class="flex justify-end mt-auto">
          <button
            class="btn btn-sm btn-ghost"
            @click="emit('update:modelValue', false)"
          >
            Cancel
          </button>
          <button class="btn btn-sm btn-ghost" @click="addLeague">
            <i class="fas fa-plus"></i> Add League
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { League } from "~/models/league";

const props = defineProps<{
  league: League;
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const addLeague = () => {
  console.log('addLeague');
}
</script>

<style>
.drawer-side {
  z-index: 9999;
}
</style>
