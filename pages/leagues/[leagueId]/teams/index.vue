<template>
  <div class="p-8 flex flex-col flex-1">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Teams</h1>
      <button
        @click="addTeam"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        + Add Team
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <Loading />
    </div>

    <!-- Error State -->
    <Error
      v-else-if="error"
      title="Teams"
      :error="error"
      :onRetry="() => fetchTeams()"
    />

    <!-- Teams Table -->
    <ModulesTeamTeamsList
      v-else-if="!loading && !error"
      :teams="teams"
      @edit-team="editTeam"
      @delete-team="deleteTeam"
      @add-team="addTeam"
    />

    <!-- Empty state -->
    <div v-else class="text-center text-gray-500 mt-20">
      <p class="mb-4 text-xl">No teams found.</p>
      <button
        @click="addTeam"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Team
      </button>
    </div>

    <ModulesTeamEditTeam
      v-model="editTeamDrawer"
      :team="selectedTeam"
      @saved="handleTeamSaved"
      @close="closeDrawer"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { Team } from "~/models/Team";
import type { PaginationResponse } from "~/models/pagination";

const toast = useNuxtApp().$toast;
const route = useRoute();
const leagueId = route.params.leagueId as string;

const loading = ref(false);
const error = ref("");
const teams = ref<Team[]>([]);
const selectedTeam = ref<Team>(new Team(leagueId));
const editTeamDrawer = ref(false);

const fetchTeams = () => {
  loading.value = true;
  useFetchAPI<PaginationResponse<Team>>(`/${leagueId}/team`, {
    method: "GET",
  })
    .then((res) => {
      teams.value = res.data.value?.content || [];
    })
    .catch((error) => {
      console.error("Error fetching teams:", error);
    })
    .finally(() => {
      loading.value = false;
    });
};

const addTeam = () => {
  selectedTeam.value = new Team(leagueId);
  editTeamDrawer.value = true;
};

const editTeam = (team: Team) => {
  console.log("EDITING TEAM");
  selectedTeam.value = { ...team }; // clone to avoid direct mutations
  editTeamDrawer.value = true;
};

const deleteTeam = (team: Team) => {
  if (!confirm("Are you sure you want to delete this team?")) return;

  useFetchAPI(`/${leagueId}/team/${team.id}`, {
    method: "DELETE",
  })
    .then(() => {
      toast("Team deleted successfully", "success");
      fetchTeams();
    })
    .catch((error) => {
      console.error("Error deleting team:", error);
      toast("Failed to delete team", "error");
    });
};

const handleTeamSaved = () => {
  fetchTeams();
};

const closeDrawer = () => {
  editTeamDrawer.value = false;
};

onMounted(fetchTeams);
</script>

<style scoped>
/* Optional: make sure the drawer overlays everything */
.drawer-side {
  z-index: 9999;
}

/* Simple table styling */
table {
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}
tr:hover {
  background-color: #f5f5f5;
}
</style>
