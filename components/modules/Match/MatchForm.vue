<template>
  <div class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" @click.self="close">
    <div class="bg-white w-full max-w-xl p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold mb-4">{{ match.id ? 'Edit Match' : 'Create Match' }}</h2>

      <form @submit.prevent="save">
        <!-- Home Team -->
        <div class="mb-4">
          <label class="block mb-1">Home Team</label>
          <select v-model="match.homeTeamId" class="w-full border p-2 rounded" required>
            <option disabled value="">-- Select Home Team --</option>
            <option v-for="team in teams" :key="team.id" :value="team.id">
              {{ team.name }}
            </option>
          </select>
        </div>

        <!-- Away Team -->
        <div class="mb-4">
          <label class="block mb-1">Away Team</label>
          <select v-model="match.awayTeamId" class="w-full border p-2 rounded" required>
            <option disabled value="">-- Select Away Team --</option>
            <option v-for="team in teams" :key="team.id" :value="team.id">
              {{ team.name }}
            </option>
          </select>
        </div>

        <!-- Scores -->
        <div class="mb-4 flex gap-4">
          <div class="flex-1">
            <label class="block mb-1">Home Score</label>
            <input type="number" v-model.number="match.homeTeamScore" class="w-full border p-2 rounded" min="0" />
          </div>
          <div class="flex-1">
            <label class="block mb-1">Away Score</label>
            <input type="number" v-model.number="match.awayTeamScore" class="w-full border p-2 rounded" min="0" />
          </div>
        </div>

        <!-- Date -->
        <div class="mb-4">
          <label class="block mb-1">Match Date</label>
          <input type="datetime-local" v-model="formattedDate" class="w-full border p-2 rounded" />
        </div>

        <!-- Status -->
        <div class="mb-4">
          <label class="block mb-1">Status</label>
          <select v-model="match.status" class="w-full border p-2 rounded">
            <option>Scheduled</option>
            <option>Live</option>
            <option>Finished</option>
            <option>Cancelled</option>
          </select>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-2 mt-6">
          <button type="button" @click="close" class="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRef, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Match } from '~/models/Match'
import { Team } from '~/models/Team'

const props = defineProps<{
  match: Match
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'saved', match: Match): void
}>()

const match = toRef(props, 'match')
const route = useRoute()
const router = useRouter()
const leagueId = route.params.leagueId as string

const teams = ref<Team[]>([])

const fetchTeams = async () => {
  try {
    const res = await fetch(`http://localhost:8080/api/v1/${leagueId}/team`)
    if (!res.ok) throw new Error("Failed to fetch teams")
    const data = await res.json()
    teams.value = data.content
  } catch (error) {
    console.error("Error fetching teams:", error)
  }
}

onMounted(fetchTeams)

const formattedDate = computed({
  get: () => new Date(match.value.matchDate).toISOString().slice(0, 16),
  set: (value: string) => {
    match.value.matchDate = new Date(value)
  }
})

const close = () => emit('update:modelValue', false)

const save = async () => {
  try {
    match.value.league = leagueId
    const response = await fetch(`http://localhost:8080/api/v1/${leagueId}/match`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(match.value)
    })

    if (!response.ok) throw new Error('Failed to save match')

    const savedMatch = await response.json()
    emit('saved', savedMatch)
    // Navigate to /matches after saving
    location.reload();
  } catch (error) {
    console.error("Failed to save match:", error)
  }
}
</script>
