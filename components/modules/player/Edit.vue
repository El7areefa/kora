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
            {{ isEdit ? "Edit Player" : "Add Player" }}
          </h2>
          <button class="btn btn-sm btn-circle btn-ghost" @click="closeDrawer">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="space-y-4">
          <InputField label="Name" v-model="props.player.name" type="text" />
          <InputField
            label="Age"
            v-model="props.player.age"
            type="number"
          />
          <InputField
            label="Position"
            v-model="props.player.position"
            type="select"
            :options="positionOptions"
          />
          <InputField
            label="Goal Keeper"
            v-model="props.player.goalKeeper"
            type="toggle"
          />
          <InputField
            label="Image"
            v-model="props.player.imageUrl"
            type="file"
          />
          <InputField
            label="Weight"
            v-model="props.player.weight"
            type="number"
          />
          <InputField
            label="Height"
            v-model="props.player.height"
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
import { positions, type Player } from "~/models/player";
import InputField from "@/components/InputField.vue";

const toast = useNuxtApp().$toast;

const props = defineProps<{
  player: Player;
  modelValue: boolean;
  teamId: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "saved"): void;
}>();


const positionOptions = positions.map(p => p.toUpperCase());

const isEdit = computed(() => props.player.id !== '');


const closeDrawer = () => emit("update:modelValue", false);

const submit = () => {
  const playerRequest = buildPlayerRequest(props.player);
  useFetchAPI<Player>(isEdit.value ? `/${props.teamId}/player/${props.player.id}` : `/${props.teamId}/player`, {
    method: isEdit.value ? "PUT" : "POST",
    body: playerRequest,
  })
    .then(onSuccess)
    .catch(onError);
};

const onSuccess = () => {
  closeDrawer();
  emit("saved");
  toast(`Player ${isEdit.value ? "updated" : "created"} successfully`, "success");
};

const onError = (error: any) => {
  console.error("Error updating player:", error);
  toast(`Failed to ${isEdit.value ? "update" : "create"} player`, "error");
};

const buildPlayerRequest = (player: Player) => {
  const { team, id, ...payload } = player;
  return payload;
};
</script>

<style scoped>
.drawer-side {
  z-index: 9999;
}
</style>
