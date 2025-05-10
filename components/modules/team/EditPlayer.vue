<template>
  <!-- Drawer -->
  <div class="drawer drawer-end">
    <input
      id="drawer-edit-team"
      type="checkbox"
      class="drawer-toggle"
      :checked="modelValue"
      @change="emit('update:modelValue', !modelValue)"
    />

    <div class="drawer-content">
      <!-- Blank Content (main page) -->
    </div>

    <div class="drawer-side">
      <label for="drawer-edit-team" class="drawer-overlay"></label>

      <div class="min-h-full w-96 bg-white p-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold mb-4">{{team?.id ? 'Edit' : 'Add'}} Team</h2>
          <button class="btn btn-sm btn-circle btn-ghost" @click="emit('update:modelValue', false)">
            <i class="fas fa-times"></i>
          </button>
        </div>


        <div v-if="team" class="space-y-4">
          <div>
            <label class="label">
              <span class="label-text">Team Name</span>
            </label>
            <input
              v-model="team.name"
              type="text"
              class="input input-bordered w-full"
            />
          </div>

          <div>
            <label class="label">
              <span class="label-text">Logo URL</span>
            </label>
            <input
              v-model="team.logoUrl"
              type="text"
              class="input input-bordered w-full"
            />
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Team } from '~/models/Team';

const props = defineProps<{
  team: Team | null;
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

</script>

<style >
.drawer-side {
  z-index: 9999;
}
</style>
