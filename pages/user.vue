<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navbar -->
    <nav class="bg-gray-900 text-white py-4 shadow-md">
      <div class="container mx-auto flex justify-between items-center px-4">
        <div class="text-2xl font-bold">El7areefa</div>
        <ul class="flex gap-6">
          <li><a href="#" class="hover:text-blue-400">Home</a></li>
          <li><a href="#" class="hover:text-blue-400">Payments</a></li>
          <li><a href="#" class="hover:text-blue-400">Register</a></li>
          <li><a href="#" class="hover:text-blue-400">Standings</a></li>
          <li><a href="#" class="hover:text-blue-400">Transfer Market</a></li>
          <li><a href="#" class="hover:text-blue-400">Contact Us</a></li>
          <li><a href="#" class="hover:text-blue-400">Log In</a></li>
        </ul>
      </div>
    </nav>

    <!-- Team Photo -->
    <section class="bg-white py-10">
      <div class="container mx-auto px-4">
        <img :src="teamPhoto" alt="Team Photo"
          class="w-full h-auto max-h-[70vh] object-cover object-top rounded-xl shadow-md" />

      </div>
    </section>

    <!-- Matches Carousel -->
    <section class="py-10 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold mb-6">Recent Matches</h2>
        <div class="relative">
          <button @click="scrollLeft"
            class="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
            aria-label="Scroll Left">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div ref="scrollContainer" class="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-8">
            <div v-for="match in matches" :key="match.id" class="min-w-[300px] bg-white rounded-lg shadow-md p-4">
              <p class="text-sm text-gray-500">{{ formatDate(match.matchDate) }}</p>
              <p class="font-semibold">{{ match.matchName }}</p>
              <p class="text-lg font-bold">{{ match.homeTeamScore }} - {{ match.awayTeamScore }}</p>
            </div>
          </div>
          <button @click="scrollRight"
            class="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
            aria-label="Scroll Right">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- League Table and Statistics -->
    <section class="py-10">
      <div class="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
        <div>
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-2xl font-bold">League Standings</h2>
            <select v-model="selectedLeagueId" class="border rounded px-2 py-1">
              <option v-for="league in leagues" :key="league.id" :value="league.id">
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
                <td class="py-2 px-4 border-b">{{ team.numOfSuccessMatches }}</td>
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
            <div class="relative w-1/3 rounded-xl shadow-md overflow-hidden cursor-pointer">
              <img :src="topScorer" alt="top scorer" class="w-full h-auto object-cover" />
              <div
                class="absolute top-0 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 px-4 py-1 rounded-b-md">
                <span class="text-white text-2xl font-bold drop-shadow-lg select-none">topScorer</span>
              </div>
            </div>
            <div class="relative w-1/3 rounded-xl shadow-md overflow-hidden cursor-pointer">
              <img :src="topAssist" alt="top assist" class="w-full h-auto object-cover" />
              <div
                class="absolute top-0 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 px-4 py-1 rounded-b-md">
                <span class="text-white text-2xl font-bold drop-shadow-lg select-none">topAssist</span>
              </div>
            </div>
            <div class="relative w-1/3 rounded-xl shadow-md overflow-hidden cursor-pointer">
              <img :src="topGoalie" alt="top goalie" class="w-full h-auto object-cover" />
              <div
                class="absolute top-0 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 px-4 py-1 rounded-b-md">
                <span class="text-white text-2xl font-bold drop-shadow-lg select-none">topGoalie</span>
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
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { Match } from "~/models/match";
import { League } from "~/models/league";
import { Team } from "~/models/Team";
import type { PaginationResponse } from "~/models/pagination";

// Images
import teamPhoto from '@/assets/images/team-photo.jpg';
import topScorer from '@/assets/images/top scorer.jpg';
import topAssist from '@/assets/images/top assist.jpg';
import topGoalie from '@/assets/images/top goalie.jpg';

const route = useRoute();
const leagueId = route.params.leagueId as string;
const leagues = ref<League[]>([]);
const teams = ref<Team[]>([]);
const selectedLeagueId = ref('');
const matches = ref<Match[]>([]);
const error = ref("");
const scrollContainer = ref<HTMLDivElement | null>(null);

onMounted(() => {
  fetchMatches();
  fetchLeagues();
  fetchTeamsByLeague();
});

watch(selectedLeagueId, async (newVal) => {
  if (newVal) {
    await fetchTeamsByLeague();
  }
});

const fetchMatches = async () => {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - 7);
  const end = new Date(now);
  end.setDate(now.getDate() + 7);

  const startISO = start.toISOString().split('.')[0];
  const endISO = end.toISOString().split('.')[0];

  const matchesUrl = `/${leagueId}/match/date-range?start=${encodeURIComponent(startISO)}&end=${encodeURIComponent(endISO)}`;
  useFetchAPI<PaginationResponse<Match>>(matchesUrl, { method: "GET" })
    .then((res) => {
      matches.value = res.data.value?.content || [];
    })
    .catch((err) => {
      console.error("Failed to fetch matches in date range:", err);
      error.value = "Unable to load matches";
    });
};

const fetchLeagues = async () => {
  try {
    const res = await useFetchAPI('/league', { method: 'GET' });
    leagues.value = res.data.value?.content || [];
    if (leagues.value.length > 0) {
      selectedLeagueId.value = leagues.value[0].id;
      await fetchTeamsByLeague();
    }
  } catch (error) {
    console.error('Failed to fetch leagues:', error);
  }
};

const fetchTeamsByLeague = async () => {
  if (!selectedLeagueId.value) return;
  try {
    const res = await useFetchAPI<PaginationResponse<Team>>(`/${selectedLeagueId.value}/team`, { method: 'GET' });
    teams.value = res.data.value?.content || [];
  } catch (error) {
    console.error('Failed to fetch teams by league:', error);
  }
};

const formatDate = (date: string | Date) => {
  const d = new Date(date);
  return d.toLocaleString();
};

const scrollLeft = () => {
  scrollContainer.value?.scrollBy({ left: -320 * 3, behavior: 'smooth' });
};

const scrollRight = () => {
  scrollContainer.value?.scrollBy({ left: 320 * 3, behavior: 'smooth' });
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}

select {
  min-width: 200px;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
