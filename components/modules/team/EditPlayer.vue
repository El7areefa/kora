<template>
  <div class="drawer drawer-end">
    <input
      id="drawer-edit-team"
      type="checkbox"
      class="drawer-toggle"
      :checked="modelValue"
      @change="updateModelValue(!modelValue)"
    />

    <div class="drawer-content"><!-- optional page content --></div>

    <div class="drawer-side">
      <label for="drawer-edit-team" class="drawer-overlay"></label>

      <div class="min-h-full w-96 flex flex-col bg-white p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">{{ isEdit ? 'Edit' : 'Add' }} Team</h2>
          <button class="btn btn-sm btn-circle btn-ghost" @click="closeDrawer">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <form @submit.prevent="saveTeam" class="flex flex-col gap-4">
            <InputField
              label="Team Name"
              v-model="form.name"
              type="text"
            />

            <InputField
              label="Logo URL"
              v-model="form.logoUrl"
              type="file"
            />

            <InputField
              v-if="isEdit"
              label="Matches"
              v-model="form.numOfMatches"
              type="number"
            />

            <InputField
              v-if="isEdit"
              label="Success Matches"
              v-model="form.numOfSuccessMatches"
              type="number"
            />

            <InputField
              v-if="isEdit"
              label="Loss Matches"
              v-model="form.numOfLossMatches"
              type="number"
            />

            <InputField
              v-if="isEdit"
              label="Draw Matches"
              v-model="form.numOfDrawMatches"
              type="number"
            />

            <InputField
              v-if="isEdit"
              label="Points"
              v-model="form.numOfPoints"
              type="number"
            />

          <div class="flex justify-end gap-2 mt-6">
            <button type="button" class="btn btn-sm" @click="closeDrawer">
              Cancel
            </button>
            <button type="submit" class="btn btn-sm btn-primary">
              <i class="fas fa-save mr-1"></i> Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Team } from "~/models/Team";

const toast = useNuxtApp().$toast;
const props = defineProps<{
  team: Team;
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "saved"): void;
}>();

const route = useRoute();
const leagueId = route.params.leagueId as string;
const isEdit = computed(() => props.team.id !== '');

const form = reactive<Team>({ ...props.team });

const updateModelValue = (value: boolean) => {
  emit("update:modelValue", value);
};

const closeDrawer = () => {
  emit("update:modelValue", false);
};

const saveTeam = () => {
  if(isEdit.value) {
  useFetchAPI<Team>(`/${leagueId}/team/${form.id}`, {
    method: "PUT",
    body: form,
  })
    .then((res) => {
      if (res.data.value) {
        emit("saved");
        closeDrawer();
        toast("Team updated successfully", "success");
      }
    })
    .catch((err) => {
      console.error("Save failed:", err);
      toast("Failed to update team", "error");
    });
  } else {
    useFetchAPI<Team>(`/${leagueId}/team`, {
      method: "POST",
      body: form,
    }).then((res) => {
      if (res.data.value) {
        emit("saved");
        closeDrawer();
        toast("Team created successfully", "success");
      }
    }).catch((err) => {
      console.error("Save failed:", err);
      toast("Failed to update team", "error");
    });
  }
};
</script>

<style scoped>
.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.label {
  font-weight: 600;
  margin-bottom: 0.25rem;
  display: block;
  color: #333;
}

.btn-primary {
  background-color: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  font-weight: 600;
  transition: background-color 0.2s ease-in-out;
}

.btn-primary:hover {
  background-color: #1d4ed8;
}

.btn-sm {
  padding: 0.3rem 0.8rem;
  font-size: 0.875rem;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: white;
  color: #333;
  transition: background-color 0.15s ease-in-out;
}

.btn-sm:hover {
  background-color: #f0f0f0;
}

.btn-ghost {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  color: #666;
}

.btn-circle {
  border-radius: 50%;
  padding: 0.2rem 0.4rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.drawer-side {
  z-index: 9999;
}
</style>
