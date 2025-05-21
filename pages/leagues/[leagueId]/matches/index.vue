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
      icon="fas fa-exclamation-triangle"
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
import { ref, onMounted } from 'vue'
import { Match } from '~/models/Match'

const matches = ref<Match[]>([])
const selectedMatch = ref<Match | null>(null)
const editMatchDrawer = ref(false)

const route = useRoute();
const leagueId = route.params.leagueId as string;

const fetchMatches = async () => {
  try {
    const res = await fetch(`http://localhost:8080/api/v1/${leagueId}/match`);
    if (!res.ok) throw new Error('Failed to fetch matches')
    const data = await res.json()
    matches.value = data.content;
  } catch (error) {
    console.error('Error loading matches:', error)
  }
}

const addMatch = () => {
  selectedMatch.value = new Match()
  editMatchDrawer.value = true
}

const editMatch = (index: number) => {
  selectedMatch.value = { ...matches.value[index] }
  editMatchDrawer.value = true
}

const deleteMatch = async (index: number) => {
  if (confirm('Are you sure you want to delete this match?')) {
    const matchId = matches.value[index].id
    try {
      const res = await fetch(`http://localhost:8080/api/v1/${leagueId}/match/${matchId}`, {
        method: 'DELETE'
      })
      if (!res.ok) throw new Error('Failed to delete match')
      matches.value.splice(index, 1)
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }
}

const handleMatchSaved = (match: Match) => {
  const index = matches.value.findIndex(m => m.id === match.id)
  if (index !== -1) {
    matches.value[index] = { ...match }
  } else {
    match.id = Date.now() // Temporary ID if not persisted yet
    matches.value.push({ ...match })
  }
}

const formatDate = (date: string | Date) => {
  const d = new Date(date)
  return d.toLocaleString()
}

onMounted(fetchMatches)
</script>
