<template>
    <div class="mx-auto mt-6 overflow-x-auto rounded-xl shadow-lg bg-base-100">
      <table class="table table-zebra w-full text-sm">
        <thead class="bg-base-200 text-base-content">
          <tr>
            <th>#</th>
            <th class="text-left">Team</th>
            <th>P</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GF</th>
            <th>GA</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(team, index) in standings" :key="team.id">
            <td class="text-center">{{ index + 1 }}</td>
            <td class="font-semibold text-left">{{ team.name }}</td>
            <td class="text-center">{{ team.played }}</td>
            <td class="text-center">{{ team.wins }}</td>
            <td class="text-center">{{ team.draws }}</td>
            <td class="text-center">{{ team.losses }}</td>
            <td class="text-center">{{ team.goalsFor }}</td>
            <td class="text-center">{{ team.goalsAgainst }}</td>
            <td class="text-center font-bold">{{ team.points }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup lang="ts">
  interface TeamStanding {
    id: string
    name: string
    played: number
    wins: number
    draws: number
    losses: number
    goalsFor: number
    goalsAgainst: number
    points: number
  }
  
  const standings: TeamStanding[] = [
    { id: '1', name: 'Team A', played: 5, wins: 3, draws: 1, losses: 1, goalsFor: 10, goalsAgainst: 5, points: 10 },
    { id: '2', name: 'Team B', played: 5, wins: 3, draws: 0, losses: 2, goalsFor: 8, goalsAgainst: 6, points: 9 },
    // Add more teams as needed
  ]
  </script>
  