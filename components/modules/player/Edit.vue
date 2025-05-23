<template>
  <div class="drawer drawer-end">
    <input
      id="drawer-edit-player"
      type="checkbox"
      class="drawer-toggle"
      :checked="modelValue"
      @change="emit('update:modelValue', !modelValue)"
    />

    <div class="drawer-content"></div>

    <div class="drawer-side">
      <label for="drawer-edit-player" class="drawer-overlay"></label>

      <div class="min-h-full w-96 flex flex-col bg-white p-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">
            {{ localPlayer.id ? "Edit Player" : "Add Player" }}
          </h2>
          <button class="btn btn-sm btn-circle btn-ghost" @click="closeDrawer">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="space-y-4">
          <InputField label="Name" v-model="localPlayer.name" type="text" />
          <InputField
            label="Nick Name"
            v-model="localPlayer.nickName"
            type="text"
          />
          <InputField
            label="Jersey Name"
            v-model="localPlayer.jerseyName"
            type="text"
          />
          <InputField
            label="Jersey Number"
            v-model="localPlayer.jerseyNumber"
            type="number"
          />
          <InputField
            label="Kit Size"
            v-model="localPlayer.kitSize"
            type="text"
          />
          <InputField
            label="Position"
            v-model="localPlayer.position"
            type="text"
          />
          <InputField
            label="Goal Keeper"
            v-model="localPlayer.isGoalKeeper"
            type="checkbox"
          />
          <InputField
            label="Image URL"
            v-model="localPlayer.imageUrl"
            type="text"
          />
          <InputField
            label="Weight"
            v-model="localPlayer.weight"
            type="number"
          />
          <InputField
            label="Height"
            v-model="localPlayer.height"
            type="number"
          />
        </div>

        <div class="flex justify-end mt-auto gap-2">
          <button class="btn btn-sm" @click="closeDrawer">Cancel</button>
          <button class="btn btn-sm btn-primary" @click="submit">
            <i class="fas fa-save mr-1"></i> Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import type { Player } from "~/models/player";
import InputField from "@/components/InputField.vue";

const toast = useNuxtApp().$toast;

const props = defineProps<{
  player: Player;
  modelValue: boolean;
  teamId: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const localPlayer = ref<Player>({ ...props.player });

watch(
  () => props.player,
  (newVal) => {
    localPlayer.value = { ...newVal };
  },
  { immediate: true }
);

const closeDrawer = () => emit("update:modelValue", false);

const submit = () => {
  if (localPlayer.value.id && localPlayer.value.id > 0) {
    updatePlayer();
  } else {
    addPlayer();
  }
};

const updatePlayer = () => {
  useFetchAPI<Player>(`/${props.teamId}/player/${localPlayer.value.id}`, {
    method: "PUT",
    body: JSON.stringify(localPlayer.value),
  })
    .then((res) => {
      if (res.data.value) {
        closeDrawer();
      }
    })
    .catch((error) => {
      console.error("Error updating player:", error);
      toast("Something went wrong while updating player", "error");
    });
};

const addPlayer = () => {
  useFetchAPI<Player>(`/${props.teamId}/player`, {
    method: "POST",
    body: JSON.stringify(localPlayer.value),
  })
    .then((res) => {
      if (res.data.value) {
        closeDrawer();
      }
    })
    .catch((error) => {
      console.error("Error adding player:", error);
      toast("Something went wrong while adding player", "error");
    });
};
</script>

<style scoped>
.drawer-side {
  z-index: 9999;
}
</style>
