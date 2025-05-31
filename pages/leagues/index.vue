<template>
  <div class="flex-1 p-8">
    <!-- Header -->
    <TablePageHeader
      title="Leagues"
      addButtonText="Add League"
      :addButtonAction="addLeague"
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
      title="Leagues"
      :error="error"
      :onRetry="() => fetchLeagues(0, searchQuery)"
    />

    <!-- Data Table -->
    <div v-else class="overflow-x-auto">
      <ModulesLeagueLeaguesList
        :leagues="leagues.content"
        @add-league="addLeague"
        @edit-league="editLeague"
        @delete-league="deleteLeague"
      />
    </div>

    <div
      v-if="loading && currentPage !== 0"
      class="flex justify-center items-center py-12"
    >
      <Loading />
    </div>

    <!-- Load More Button -->
    <div v-if="!loading && !leagues.last" class="flex justify-center mt-4">
      <button @click="loadMore" class="btn btn-sm btn-outline">
        Load More
      </button>
    </div>

    <!-- Edit/Add Drawer -->
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

const leagues = ref<PaginationResponse<League>>({
  content: [],
  last: true,
  totalElements: 0,
});

const selectedLeague = ref<League>(new League("", ""));
const editLeagueDrawer = ref(false);
const loading = ref(true);
const error = ref<string | null>(null);
const currentPage = ref(0);
const searchQuery = ref("");
const toast = useNuxtApp().$toast;

const fetchLeagues = (page: number = 0, query: string = "") => {
  loading.value = true;
  error.value = null;
  const searchParam = query ? `&name=${encodeURIComponent(query)}` : "";
  useFetchAPI<PaginationResponse<League>>(
    `/league?page=${page}&size=10${searchParam}`,
    {
      method: "GET",
    }
  )
    .then((response) => {
      if (response.data.value) {
        if (page === 0) {
          leagues.value = response.data.value;
        } else {
          // Append new content
          leagues.value.content = [
            ...leagues.value.content,
            ...response.data.value.content,
          ];
          leagues.value.last = response.data.value.last;
        }
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
const handleSearch = () => {
  fetchLeagues(0, searchQuery.value);
};

const loadMore = () => {
  if (!leagues.value.last) {
    currentPage.value += 1;
    fetchLeagues(currentPage.value, searchQuery.value);
  }
};

const handleLeagueSaved = () => {
  editLeagueDrawer.value = false;
  fetchLeagues(0, searchQuery.value);
};

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
      fetchLeagues(currentPage.value, searchQuery.value);
    })
    .catch((err) => {
      toast("Failed to delete league", "error");
      console.error("Delete Error:", err);
    });
};

onMounted(() => fetchLeagues(0));
</script>

<style>
.modal,
.drawer {
  z-index: 50;
}
</style>
