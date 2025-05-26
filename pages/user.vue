<template>
  <div class="min-h-screen flex flex-col">
    <!-- Team Photo -->
    <section class="bg-white py-10">
      <div class="container mx-auto px-4">
        <img
          :src="teamPhoto"
          alt="Team Photo"
          class="w-full h-auto max-h-[70vh] object-cover object-top rounded-xl shadow-md"
        />
      </div>
    </section>

    <!-- Matches Carousel -->
    <section class="py-10 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold mb-6">Recent Matches</h2>
        <ModulesUserMatchesScroll :matches="matches" />
      </div>
    </section>

    <Standing />

    <!-- League Table and Statistics -->
    <section class="py-10">
      <div class="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
        <div>
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-2xl font-bold">League Standings</h2>
            <select v-model="selectedLeagueId" class="border rounded px-2 py-1">
              <option
                v-for="league in leagues"
                :key="league.id"
                :value="league.id"
              >
                {{ league.name }}
              </option>
            </select>
          </div>
          <table class="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th class="py-2 px-4 border-b">Team</th>
                <th class="py-2 px-4 border-b">Matches</th>
                <th class="py-2 px-4 border-b">Wins</th>
                <th class="py-2 px-4 border-b">Losses</th>
                <th class="py-2 px-4 border-b">Draws</th>
                <th class="py-2 px-4 border-b">Points</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="team in teams" :key="team.id">
                <td class="py-2 px-4 border-b">{{ team.name }}</td>
                <td class="py-2 px-4 border-b">{{ team.numOfMatches }}</td>
                <td class="py-2 px-4 border-b">
                  {{ team.numOfSuccessMatches }}
                </td>
                <td class="py-2 px-4 border-b">{{ team.numOfLossMatches }}</td>
                <td class="py-2 px-4 border-b">{{ team.numOfDrawMatches }}</td>
                <td class="py-2 px-4 border-b">{{ team.numOfPoints }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Updated Statistics Section -->
        <div>
          <h2 class="text-2xl font-bold mb-6">Statistics</h2>
          <div class="flex gap-6 justify-center">
            <div
              class="relative w-1/3 rounded-xl shadow-md overflow-hidden cursor-pointer"
            >
              <img
                :src="topScorer"
                alt="top scorer"
                class="w-full h-auto object-cover"
              />
              <div
                class="absolute top-0 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 px-4 py-1 rounded-b-md"
              >
                <span
                  class="text-white text-2xl font-bold drop-shadow-lg select-none"
                  >topScorer</span
                >
              </div>
            </div>
            <div
              class="relative w-1/3 rounded-xl shadow-md overflow-hidden cursor-pointer"
            >
              <img
                :src="topAssist"
                alt="top assist"
                class="w-full h-auto object-cover"
              />
              <div
                class="absolute top-0 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 px-4 py-1 rounded-b-md"
              >
                <span
                  class="text-white text-2xl font-bold drop-shadow-lg select-none"
                  >topAssist</span
                >
              </div>
            </div>
            <div
              class="relative w-1/3 rounded-xl shadow-md overflow-hidden cursor-pointer"
            >
              <img
                :src="topGoalie"
                alt="top goalie"
                class="w-full h-auto object-cover"
              />
              <div
                class="absolute top-0 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 px-4 py-1 rounded-b-md"
              >
                <span
                  class="text-white text-2xl font-bold drop-shadow-lg select-none"
                  >topGoalie</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Partners Section -->
    <section class="bg-gray-100 py-10">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-2xl font-bold mb-6">Our Partners</h2>
        <div class="flex flex-wrap justify-center gap-8">
          <!-- Future Partner Logos -->
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Match } from "~/models/match";
import { League } from "~/models/league";
import { Team } from "~/models/Team";
import type { PaginationResponse } from "~/models/pagination";

// Images
import teamPhoto from "@/assets/images/team-photo.jpg";
import topScorer from "@/assets/images/top scorer.jpg";
import topAssist from "@/assets/images/top assist.jpg";
import topGoalie from "@/assets/images/top goalie.jpg";
import dayjs from "dayjs";

definePageMeta({
  layout: "user", // 👈 This refers to layouts/user.vue
});

const leagues = ref<League[]>([]);
const teams = ref<Team[]>([]);
const selectedLeagueId = ref("");
const matches = ref<Match[]>([]);
const error = ref("");

onMounted(() => {
  fetchLeagues();
  fetchMatches();
});

watch(selectedLeagueId, (newVal) => {
  if (newVal) {
    fetchTeamsByLeague(newVal);
  }
});

const fetchMatches = () => {
  const startDate = dayjs()
    .subtract(7, "days")
    .startOf("day");
  const endDate = dayjs().add(7, "days").endOf("day");

  const matchesUrl = `/global/match/date-range?start=${encodeURIComponent(
    startDate.format()
  )}&end=${encodeURIComponent(endDate.format())}`;
  useFetchAPI<PaginationResponse<Match>>(matchesUrl, { method: "GET" })
    .then((res) => {
      matches.value = res.data.value?.content || [];
    })
    .catch((err) => {
      console.error("Failed to fetch matches in date range:", err);
      error.value = "Unable to load matches";
    });
};

const fetchLeagues = () => {
  useFetchAPI("/league", { method: "GET" })
    .then((res) => {
      leagues.value = res.data.value?.content || [];
      if (leagues.value.length > 0) {
        selectedLeagueId.value = leagues.value[0].id;
        fetchTeamsByLeague(leagues.value[0].id);
      }
    })
    .catch((err) => {
      console.error("Failed to fetch leagues:", err);
    });
};

const fetchTeamsByLeague = (leagueId: string) => {
  if (!leagueId) return;
  useFetchAPI<PaginationResponse<Team>>(`/${leagueId}/team`, { method: "GET" })
    .then((res) => {
      teams.value = res.data.value?.content || [];
      teams.value.sort((a, b) => b.numOfPoints - a.numOfPoints);
    })
    .catch((err) => {
      console.error("Failed to fetch teams by league:", err);
    });
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}

select {
  min-width: 200px;
}
</style>
