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
          <h2 class="text-xl font-bold">{{ isEdit ? "Edit" : "Add" }} Team</h2>
          <button class="btn btn-sm btn-circle btn-ghost" @click="closeDrawer">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <form @submit.prevent="saveTeam" class="flex flex-col gap-4">
          <InputField label="Team Name" v-model="props.team.name" type="text" />

          <InputField label="Logo URL" v-model="props.team.logoUrl" type="file" />

          <InputField
            v-if="isEdit"
            label="Matches"
            v-model="props.team.numOfMatches"
            type="number"
          />

          <InputField 
            v-if="isEdit"
            label="Success Matches"
            v-model="props.team.numOfSuccessMatches"
            type="number"
          />

          <InputField
            v-if="isEdit"
            label="Loss Matches"
            v-model="props.team.numOfLossMatches"
            type="number"
          />

          <InputField
            v-if="isEdit"
            label="Draw Matches"
            v-model="props.team.numOfDrawMatches"
            type="number"
          />

          <InputField
            v-if="isEdit"
            label="Points"
            v-model="props.team.numOfPoints"
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
import type { Team, TeamRequest } from "~/models/Team";

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
const isEdit = computed(() => props.team.id !== "");

const updateModelValue = (value: boolean) => {
  emit("update:modelValue", value);
};

const closeDrawer = () => {
  emit("update:modelValue", false);
};

const saveTeam = () => {
  const teamRequest: TeamRequest = buildTeamRequest(props.team);

  useFetchAPI<Team>(
    isEdit.value ? `/${leagueId}/team/${props.team.id}` : `/${leagueId}/team`,
    {
      method: isEdit.value ? "PUT" : "POST",
      body: teamRequest,
    }
  )
    .then(onSuccess)
    .catch(onError);
};

const onSuccess = () => {
  emit("saved");
  closeDrawer();
  toast(`Team ${isEdit.value ? "updated" : "created"} successfully`, "success");
};

const onError = (err: any) => {
  console.error("Save failed:", err);
  toast(`Failed to ${isEdit.value ? "update" : "create"} team`, "error");
};

const buildTeamRequest = (team: Team): TeamRequest => ({
  name: team.name,
  logoUrl: team.logoUrl,
  numOfMatches: team.numOfMatches,
  numOfSuccessMatches: team.numOfSuccessMatches,
  numOfLossMatches: team.numOfLossMatches,
  numOfDrawMatches: team.numOfDrawMatches,
  numOfPoints: team.numOfPoints,
});
</script>
