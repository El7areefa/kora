<template>
  <div class="p-8 flex flex-col flex-1">
    <!-- Header -->
    <TablePageHeader
      title="Matches"
      addButtonText="Create Match"
      :addButtonAction="addMatch"
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
      title="Matches"
      :error="error"
      :onRetry="() => fetchMatches(0, searchQuery)"
    />

    <!-- Empty state -->
    <EmptyStateCta
      v-else-if="matches.content.length === 0"
      icon="fas fa-futbol"
      :iconSize="160"
      title="No matches found"
      description="You haven't created any matches yet."
      ctaBtn="Create Match"
      @ctaClick="addMatch"
    />

    <!-- Table -->
    <Table v-else class="overflow-x-auto" type="bordered" showHover>
      <thead>
        <tr>
          <TableHead>Match</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Score</TableHead>
          <!-- New Score column -->
          <TableHead>Actions</TableHead>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(match, index) in matches.content" :key="match.id">
          <TableCell>
            {{ match.matchName }}
          </TableCell>
          <TableCell>{{ formatDate(match.matchDate) }}</TableCell>
          <TableCell>{{ match.status || "Scheduled" }}</TableCell>
          <TableCell>
            {{ match.homeTeamScore }} - {{ match.awayTeamScore }}
          </TableCell>
          <TableCell>
            <div class="flex items-center gap-2">
              <a class="cursor-pointer" @click="editMatch(index)">
                <i class="fas fa-edit mr-2"></i>
              </a>
              <a class="cursor-pointer" @click="deleteMatch(index)">
                <i class="fas fa-trash text-red-500"></i>
              </a>
            </div>
          </TableCell>
        </tr>
      </tbody>
    </Table>

    <div
      v-if="loading && currentPage !== 0"
      class="flex justify-center items-center py-12"
    >
      <Loading />
    </div>

    <!-- Load More Button -->
    <div v-if="!loading && !matches.last" class="flex justify-center mt-4">
      <button @click="loadMore" class="btn btn-sm btn-outline">
        Load More
      </button>
    </div>

    <!-- Match form modal/drawer -->
    <ModulesMatchForm
      v-if="selectedMatch"
      :match="selectedMatch"
      v-model="editMatchDrawer"
      @saved="handleMatchSaved"
      @update:modelValue="
        (val) => {
          editMatchDrawer = val;
          if (!val) selectedMatch = null;
        }
      "
    />
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { ref, onMounted } from "vue";
import { Match } from "~/models/match";
import type { PaginationResponse } from "~/models/pagination";

const toast = useNuxtApp().$toast;
const matches = ref<PaginationResponse<Match>>({
  content: [],
  last: true,
  totalElements: 0,
});
const selectedMatch = ref<Match | null>(null);
const editMatchDrawer = ref(false);
const currentPage = ref(0);
const searchQuery = ref("");
const loading = ref(false);
const error = ref("");

const route = useRoute();
const leagueId = route.params.leagueId as string;

const fetchMatches = (page: number = 0, query: string = "") => {
  loading.value = true;
  useFetchAPI<PaginationResponse<Match>>(
    `/${leagueId}/match?page=${page}&size=10${query ? `&name=${encodeURIComponent(query)}` : ""}`,
    {
      method: "GET",
    }
  )
    .then((res) => {
      if (res.data.value) {
        if (page === 0) {
          matches.value = res.data.value;
        } else {
          matches.value.content = [
            ...matches.value.content,
            ...res.data.value.content,
          ];
          matches.value.last = res.data.value.last;
        }
      }
    })
    .catch((error) => {
      console.error("Error fetching matches:", error);
      error.value = error.message;
      toast("Something went wrong while fetching matches", "error");
    })
    .finally(() => {
      loading.value = false;
    });
};

const addMatch = () => {
  selectedMatch.value = new Match();
  editMatchDrawer.value = true;
};

const editMatch = (index: number) => {
  selectedMatch.value = { ...matches.value.content[index] };
  editMatchDrawer.value = true;
};

const deleteMatch = (index: number) => {
  if (confirm("Are you sure you want to delete this match?")) {
    const matchId = matches.value.content[index].id;
    useFetchAPI<PaginationResponse<Match>>(`/${leagueId}/match/${matchId}`, {
      method: "DELETE",
    })
      .then(() => {
        matches.value.content.splice(index, 1);
        toast("Match deleted successfully", "success");
      })
      .catch((err) => {
        toast("Something went wrong while deleting match", "error");
      });
  }
};

const handleSearch = () => {
  fetchMatches(0, searchQuery.value);
};

const loadMore = () => {
  if (!matches.value.last) {
    currentPage.value += 1;
    fetchMatches(currentPage.value, searchQuery.value);
  }
};

const handleMatchSaved = (match: Match) => {
  const index = matches.value.content.findIndex((m) => m.id === match.id);
  if (index !== -1) {
    matches.value.content[index] = { ...match };
  } else {
    matches.value.content.push({ ...match });
  }
};

const formatDate = (date: string | Date) => {
  return dayjs(date).format("DD/MM/YYYY h:mm A");
};

onMounted(fetchMatches);
</script>
