<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6">League Details</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Teams Card -->
      <NuxtLink
        :to="`/leagues/${leagueId}/teams`"
        class="block bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex items-center justify-between"
      >
        <div>
          <h2 class="text-xl font-semibold mb-2">Teams</h2>
          <p class="text-gray-600">View and manage teams in this league</p>
        </div>
        <i class="fas fa-users text-3xl text-blue-600"></i>
      </NuxtLink>

      <!-- Matches Card -->
      <NuxtLink
        :to="`/leagues/${leagueId}/matches`"
        class="block bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex items-center justify-between"
      >
        <div>
          <h2 class="text-xl font-semibold mb-2">Matches</h2>
          <p class="text-gray-600">View and manage matches for this league</p>
        </div>
        <i class="fas fa-futbol text-3xl text-green-600"></i>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const leagueId = route.params.leagueId
</script>
