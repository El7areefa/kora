<template>
  <div class="p-8 flex flex-col flex-1">
    <!-- Header -->
    <TablePageHeader
      title="Teams"
      addButtonText="Add Team"
      :addButtonAction="addTeam"
      v-model:searchQuery="searchQuery"
      :handleSearch="handleSearch"
    />

    <!-- Loading State -->
    <div
      v-if="loading && currentPage === 0"
      class="flex justify-center items-center py-12"
    >
      <Loading />
    </div>

    <!-- Error State -->
    <Error
      v-else-if="error"
      title="Teams"
      :error="error"
      :onRetry="() => fetchTeams(0, searchQuery)"
    />

    <!-- Teams Table -->
    <ModulesTeamTeamsList
      v-else
      :teams="teams.content"
      @edit-team="editTeam"
      @delete-team="deleteTeam"
      @add-team="addTeam"
    />

    <div
      v-if="loading && currentPage !== 0"
      class="flex justify-center items-center py-12"
    >
      <Loading />
    </div>

    <!-- Load More Button -->
    <div v-if="!loading && !teams.last" class="flex justify-center mt-4">
      <button @click="loadMore" class="btn btn-sm btn-outline">
        Load More
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
const teams = ref<PaginationResponse<Team>>({
  content: [],
  last: true,
  totalElements: 0,
});
const currentPage = ref(0);
const searchQuery = ref("");
const selectedTeam = ref<Team>(new Team(leagueId));
const editTeamDrawer = ref(false);

const fetchTeams = (page: number = 0, query: string = "") => {
  loading.value = true;
  useFetchAPI<PaginationResponse<Team>>(`/${leagueId}/team?page=${page}&size=10${query ? `&name=${query}` : ""}`, {
    method: "GET",
  })
    .then((res) => {
      if (res.data.value) {
        if (page === 0) {
          teams.value = res.data.value;
        } else {
          teams.value.content = [...teams.value.content, ...res.data.value.content];
          teams.value.last = res.data.value.last;
        }
      }
    })
    .catch((error) => {
      console.error("Error fetching teams:", error);
    })
    .finally(() => {
      loading.value = false;
    });
};

const handleSearch = () => {
  fetchTeams(0, searchQuery.value);
};

const loadMore = () => {
  if (!teams.value.last) {
    currentPage.value += 1;
    fetchTeams(currentPage.value, searchQuery.value);
  }
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
