<template>
  <div class="p-8 flex flex-col flex-1">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Matches</h1>
      <button
        @click="addMatch"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        + Create Match
      </button>
    </div>

    <!-- Table -->
    <Table v-if="matches.length > 0" class="overflow-x-auto" type="bordered" showHover>
      <thead>
        <tr>
          <TableHead>Match</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Score</TableHead> <!-- New Score column -->
          <TableHead>Actions</TableHead>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(match, index) in matches" :key="match.id">
          <TableCell>
              {{ match.matchName }}
          </TableCell>
          <TableCell>{{ formatDate(match.matchDate) }}</TableCell>
          <TableCell>{{ match.status || 'Scheduled' }}</TableCell>
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

    <!-- Empty state -->
    <EmptyStateCta
      v-if="matches.length === 0"
      icon="fas fa-futbol"
      :iconSize="160"
      title="No matches found"
      description="You haven't created any matches yet."
      ctaBtn="Create Match"
      @ctaClick="addMatch"
    />

    <!-- Match form modal/drawer -->
    <ModulesMatchForm
      v-if="selectedMatch"
      :match="selectedMatch"
      v-model="editMatchDrawer"
      @saved="handleMatchSaved"
      @update:modelValue="val => {
          editMatchDrawer = val
          if (!val) selectedMatch = null
      }"
    />
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { ref, onMounted } from 'vue'
import { Match } from '~/models/match';
import type { PaginationResponse } from '~/models/pagination';

const toast = useNuxtApp().$toast;
const matches = ref<Match[]>([])
const selectedMatch = ref<Match | null>(null)
const editMatchDrawer = ref(false)

const route = useRoute();
const leagueId = route.params.leagueId as string;

const fetchMatches = () => {
    useFetchAPI<PaginationResponse<Match>>(`/${leagueId}/match`, {
        method: 'GET',
    })
    .then((res) => {
        matches.value = res.data.value?.content || [];
    })
    .catch((error) => {
        toast('Something went wrong while fetching matches', 'error')
    })
}

const addMatch = () => {
  selectedMatch.value = new Match()
  editMatchDrawer.value = true
}

const editMatch = (index: number) => {
  selectedMatch.value = { ...matches.value[index] }
  editMatchDrawer.value = true
}

const deleteMatch = (index: number) => {
  if (confirm('Are you sure you want to delete this match?')) {
    const matchId = matches.value[index].id
    useFetchAPI<PaginationResponse<Match>>(`/${leagueId}/match/${matchId}`, {
        method: 'DELETE'
    })
    .then(() => {
        matches.value.splice(index, 1)
        toast('Match deleted successfully', 'success')
    })
    .catch((err) => {
      toast('Something went wrong while deleting match', 'error')
    })
  }
}

const handleMatchSaved = (match: Match) => {
  const index = matches.value.findIndex(m => m.id === match.id)
  if (index !== -1) {
    matches.value[index] = { ...match }
  } else {
    matches.value.push({ ...match })
  }
}

const formatDate = (date: string | Date) => {
  return dayjs(date).format("DD/MM/YYYY h:mm A");
};

onMounted(fetchMatches)
</script>
