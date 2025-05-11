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

      <div class="min-h-full w-96 flex flex-col bg-white p-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold mb-4">{{team?.id ? 'Edit' : 'Add'}} Team</h2>
          <button class="btn btn-sm btn-circle btn-ghost" @click="emit('update:modelValue', false)">
            <i class="fas fa-times"></i>
          </button>
        </div>


        <div class="space-y-4">
          <InputField label="Team Name" v-model="team.name" type="text" />
          <InputField label="Team Logo" v-model="team.logoUrl" type="file" />
        </div>
        

        <div class="flex justify-end mt-auto">
          <button class="btn btn-sm btn-ghost" @click="emit('update:modelValue', false)">
           Cancel
          </button>
          <button class="btn btn-sm btn-ghost" @click="addPlayer">
            <i class="fas fa-plus"></i> Add Player
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Team } from '~/models/Team';

const props = defineProps<{
  team: Team;
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const addPlayer = () => {
  console.log('addPlayer');
}
</script>

<style >
.drawer-side {
  z-index: 9999;
}
</style>
