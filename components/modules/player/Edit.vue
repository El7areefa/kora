<template>
  <!-- Drawer -->
  <div class="drawer drawer-end">
    <input
      id="drawer-edit-player"
      type="checkbox"
      class="drawer-toggle"
      :checked="modelValue"
      @change="emit('update:modelValue', !modelValue)"
    />

    <div class="drawer-content">
      <!-- Blank Content (main page) -->
    </div>

    <div class="drawer-side">
      <label for="drawer-edit-player" class="drawer-overlay"></label>

      <div class="min-h-full w-96 flex flex-col bg-white p-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold mb-4">
            {{ player?.id ? "Edit" : "Add" }} Player
          </h2>
          <button
            class="btn btn-sm btn-circle btn-ghost"
            @click="emit('update:modelValue', false)"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="space-y-4">
            <InputField label="Player Name" v-model="player.name" type="text" />
            <InputField label="Player Nick Name" v-model="player.nickName" type="text" />
            <InputField label="Player jersey Name" v-model="player.jerseyName" type="text" />
            <InputField label="Player jersey Number" v-model="player.jerseyNumber" type="number" />
            <InputField label="Player kit Size" v-model="player.kitSize" type="text" />
            <InputField label="Player position" v-model="player.position" type="text" />
            <InputField label="Player is Goal Keeper" v-model="player.isGoalKeeper" type="checkbox" />
            <InputField label="Player image Url" v-model="player.imageUrl" type="text" />
            <InputField label="Player weight" v-model="player.weight" type="number" />
            <InputField label="Player height" v-model="player.height" type="number" />
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
import type { Player } from "~/models/player";

const props = defineProps<{
  player: Player;
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const addPlayer = () => {
  console.log('addPlayer');
}
</script>

<style>
.drawer-side {
  z-index: 9999;
}
</style>
