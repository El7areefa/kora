<template>
  <div class="flex-1 p-8">
    <!-- Your leagues content -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Leagues</h1>
      <button
        @click="addLeague"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        + Add League
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <Loading />
    </div>

    <!-- Error State -->
    <Error v-else-if="error" title="Leagues" :error="error" :onRetry="() => fetchLeagues(0)" />

    <!-- Data Table -->
    <div v-else-if="!loading && !error" class="overflow-x-auto">
      <ModulesLeagueLeaguesList
        :leagues="leagues.content"
        @add-league="addLeague"
        @edit-league="editLeague"
        @delete-league="deleteLeague"
      />
    </div>

    <ModulesLeagueAddEdit
      :league="selectedLeague"
      v-model="editLeagueDrawer"
      @league-created="handleLeagueSaved"
      @league-updated="handleLeagueSaved"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { League } from "~/models/league";
import type { PaginationResponse } from "~/models/pagination";


// State
const leagues = ref<PaginationResponse<League>>({
  content: [],
  pageable: { pageNumber: 0, pageSize: 10 },
  last: true,
  totalElements: 0,
  totalPages: 0,
  first: true,
  number: 0,
  size: 0,
  numberOfElements: 0,
  empty: true,
});
const selectedLeague = ref<League>(new League("", ""));
const editLeagueDrawer = ref(false);
const loading = ref(true);
const error = ref<string | null>(null);
const currentPage = ref(0);
const toast = useNuxtApp().$toast;

const fetchLeagues = (page: number = 0) => {
  loading.value = true;
  error.value = null;
  currentPage.value = page;
  useFetchAPI<PaginationResponse<League>>(`/league?page=${page}&size=10`, {
    method: "GET",
  })
    .then((response) => {
      if (response.data.value) {
        leagues.value = response.data.value;
      }
    })
    .catch((err) => {
      error.value =
        err instanceof Error ? err.message : "Failed to load leagues";
    })
    .finally(() => {
      loading.value = false;
    });
};

// Handle saved league
const handleLeagueSaved = () => {
  editLeagueDrawer.value = false;
  fetchLeagues(0);
};

// CRUD operations
const addLeague = () => {
  selectedLeague.value = new League();
  editLeagueDrawer.value = true;
};

const editLeague = (league: League) => {
  selectedLeague.value = { ...league };
  editLeagueDrawer.value = true;
};

const deleteLeague = (league: League) => {
  if (!confirm(`Are you sure you want to delete "${league.name}"?`)) return;

  useFetchAPI(`/league/${league.id}`, {
    method: "DELETE",
  })
    .then(() => {
      toast("League deleted successfully", "success");
      fetchLeagues(currentPage.value);
    })
    .catch((err) => {
      toast("Failed to delete league", "error");
      console.error("Delete Error:", err);
    });
};

// Initial fetch
onMounted(() => fetchLeagues(0));
</script>

<style>


/* Make sure modals/drawers appear above everything */
.modal,
.drawer {
  z-index: 50;
}
</style>
