<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    @click.self="close"
  >
    <div class="bg-white w-full max-w-xl p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold mb-4">
        {{ isEdit ? "Edit Match" : "Create Match" }}
      </h2>

      <form @submit.prevent="save">
        <!-- Home Team -->
        <div class="mb-4">
          <label class="block mb-1">Home Team</label>
          <select
            v-model="match.homeTeamId"
            class="w-full border p-2 rounded"
            required
          >
            <option disabled value="">-- Select Home Team --</option>
            <option v-for="team in teams" :key="team.id" :value="team.id">
              {{ team.name }}
            </option>
          </select>
        </div>

        <!-- Away Team -->
        <div class="mb-4">
          <label class="block mb-1">Away Team</label>
          <select
            v-model="match.awayTeamId"
            class="w-full border p-2 rounded"
            required
          >
            <option disabled value="">-- Select Away Team --</option>
            <option v-for="team in teams" :key="team.id" :value="team.id">
              {{ team.name }}
            </option>
          </select>
        </div>

        <!-- Scores -->
        <div class="mb-4 flex gap-4">
          <div class="flex-1">
            <label class="block mb-1">Home Score</label>
            <input
              type="number"
              v-model.number="match.homeTeamScore"
              class="w-full border p-2 rounded"
              min="0"
            />
          </div>
          <div class="flex-1">
            <label class="block mb-1">Away Score</label>
            <input
              type="number"
              v-model.number="match.awayTeamScore"
              class="w-full border p-2 rounded"
              min="0"
            />
          </div>
        </div>

        <!-- Date -->
        <div class="mb-4">
          <label class="block mb-1">Match Date</label>
          <input
            type="datetime-local"
            v-model="match.matchDate"
            class="w-full border p-2 rounded"
          />
        </div>

        <!-- Status -->
        <div class="mb-4">
          <label class="block mb-1">Status</label>
          <select v-model="match.status" class="w-full border p-2 rounded">
            <option>Scheduled</option>
            <option>Live</option>
            <option>Finished</option>
            <option>Cancelled</option>
          </select>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-2 mt-6">
          <button
            type="button"
            @click="close"
            class="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { useRoute } from "vue-router";
import type { Match } from "~/models/match";
import type { PaginationResponse } from "~/models/pagination";
import type { Team } from "~/models/Team";

const toast = useNuxtApp().$toast;
const props = defineProps<{
  match: Match;
  modelValue: boolean;
}>();

const isEdit = computed(() => props.match.id !== '');

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "saved", match: Match): void;
}>();

const route = useRoute();
const leagueId = route.params.leagueId as string;

const teams = ref<Team[]>([]);


const fetchTeams = () => {
  useFetchAPI<PaginationResponse<Team>>(`/${leagueId}/team`)
    .then((res) => {
      if (res.data.value) {
        teams.value = res.data.value.content || [];
      }
    })
    .catch((error) => {
      console.error("Error fetching teams:", error);
      toast("Something went wrong while fetching teams", "error");
    });
};

onMounted(fetchTeams);


const close = () => emit("update:modelValue", false);

const save = () => {
  props.match.league = leagueId;
  const { id, ...payload } = props.match;
  useFetchAPI<Match>(isEdit.value ? `/${leagueId}/match/${id}` : `/${leagueId}/match`, {
    method: isEdit.value ? "PUT" : "POST",
    body: payload,
  })
    .then((res) => {
      if (res.data.value) {
        emit("saved", res.data.value);
        close();
        toast(`Match ${isEdit.value ? "updated" : "created"} successfully`, "success");
      }
    })
    .catch((error) => {
      console.error("Failed to save match:", error);
      toast(`Something went wrong while ${isEdit.value ? "updating" : "creating"} match`, "error");
    });
};
</script>
