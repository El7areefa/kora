<template>
  <div class="p-6 md:p-10 w-full max-w-6xl mx-auto">
    <div v-if="loading" class="text-gray-500 text-lg">Loading team info...</div>

    <div v-else-if="team" class="space-y-8">
      <h1 class="text-4xl font-bold">{{ team.name }}</h1>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-lg font-semibold mb-2">Players</h2>
          <p class="text-2xl font-bold">{{ team.players?.length ?? 0 }}</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-lg font-semibold mb-2">Matches Played</h2>
          <p class="text-2xl font-bold">{{ team.numOfMatches ?? 0 }}</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-lg font-semibold mb-2">Wins</h2>
          <p class="text-2xl font-bold">{{ team.numOfSuccessMatches ?? 0 }}</p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">Players</h2>
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr class="bg-gray-50">
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
              <th class="px-4 py-2 text-sm">Age</th>
              <th class="px-4 py-2 text-sm">Goals</th>
              <th class="px-4 py-2 text-sm">Assists</th>
              <th class="px-4 py-2 text-sm">Yellow Cards</th>
              <th class="px-4 py-2 text-sm">Red Cards</th>
              <th class="px-4 py-2 text-sm">Received Goals</th>
              <th class="px-4 py-2 text-sm">Weight</th>
              <th class="px-4 py-2 text-sm">Height</th>
              <th class="px-4 py-2 text-sm">Goalkeeper</th>
              <th class="px-4 py-2 text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="player in team.players ?? []" :key="player.id">
              <td class="px-4 py-2">{{ player.name }}</td>
              <td class="px-2 py-2 text-center">{{ player.age }}</td>
              <td class="px-2 py-2 text-center">{{ player.numOfGoals }}</td>
              <td class="px-2 py-2 text-center">{{ player.numOfAssists }}</td>
              <td class="px-2 py-2 text-center">{{ player.numOfYellowCards }}</td>
              <td class="px-2 py-2 text-center">{{ player.numOfRedCards }}</td>
              <td class="px-2 py-2 text-center">{{ player.numOfReceivedGoals }}</td>
              <td class="px-2 py-2 text-center">{{ player.weight }}</td>
              <td class="px-2 py-2 text-center">{{ player.height }}</td>
              <td class="px-2 py-2 text-center">{{ player.goalKeeper ? 'Yes' : 'No' }}</td>
              <td class="px-4 py-2 text-right">
                <div class="flex justify-end gap-3">
                  <i class="fas fa-edit text-blue-600 cursor-pointer" @click="openEditDrawer(player)"></i>
                  <i class="fas fa-trash text-red-600 cursor-pointer" @click="deletePlayer(player.id)"></i>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <EditPlayerDrawer
      v-if="selectedPlayer"
      v-model="drawerOpen"
      :player="selectedPlayer"
      :teamId="teamId"
      @player-updated="fetchTeam"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import EditPlayerDrawer from '@/components/modules/player/Edit.vue';
import type { Player } from '~/models/player';
import type { Team } from '~/models/Team';


const toast = useNuxtApp().$toast;
const route = useRoute();
const leagueId = route.params.leagueId as string;
const teamId = route.params.teamId as string;

const team = ref<any>(null);
const loading = ref(true);
const drawerOpen = ref(false);
const selectedPlayer = ref<Player | null>(null);

const fetchTeam = () => {
  loading.value = true;
  useFetchAPI<Team>(`/${leagueId}/team/${teamId}`)
    .then((res) => {
      team.value = res.data.value;
    })
    .catch(() => {
      toast('Something went wrong while fetching team', 'error');
    })
    .finally(() => {
      loading.value = false;
    });
};

const deletePlayer = (playerId: string) => {
  if (!confirm('Are you sure you want to delete this player?')) return;
  useFetchAPI<Team>(`/${leagueId}/team/${teamId}/player/${playerId}`, {
      method: 'DELETE',
    })
    .then(() => {
      toast('Player deleted successfully', 'success');
      fetchTeam();
    })
    .catch(() => {
      toast('Something went wrong while deleting player', 'error');
    });
};

const openEditDrawer = (player: Player) => {
  selectedPlayer.value = player;
  drawerOpen.value = true;
};

onMounted(fetchTeam);
</script>
