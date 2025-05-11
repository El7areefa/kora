<template>
  <div class="p-8 flex flex-col flex-1">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Leagues</h1>
      <button
        @click="addLeague"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        + Add League
      </button>
    </div>

    <!-- Table -->
    <Table v-if="leagues.length > 0" type="bordered" showHover>
      <thead>
        <tr>
          <TableHead class="pl-2 w-[65%]">Name</TableHead>
          <TableHead class="w-[25%]">Players</TableHead>
          <TableHead class="w-[10%]">Actions</TableHead>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(league, index) in leagues" :key="league.id">
          <TableCell>{{ league.name }}</TableCell>
          <TableCell>{{ league.teams.length }}</TableCell>
          <TableCell>
            <div class="flex items-center gap-2">
              <a class="cursor-pointer" @click="editLeague(index)">
                <i class="fas fa-edit mr-2"></i>
              </a>
              <a class="cursor-pointer" @click="deleteLeague(index)">
                <i class="fas fa-trash mr-2 text-red-500"></i>
              </a>
            </div>
          </TableCell>
        </tr>
      </tbody>
    </Table>
    
    <EmptyStateCta
      icon="fas fa-exclamation-triangle"
      :iconSize="160"
      title="No leagues found"
      description="No leagues found"
      ctaBtn="Add League"
      @ctaClick="addLeague"
    />

    <ModulesLeagueAddEdit :league="selectedLeague" v-model="editLeagueDrawer" />
  </div>
</template>

<script setup lang="ts">
import { League } from '~/models/league';


// Dummy team data
const leagues = ref<League[]>([

]);

const selectedLeague = ref<League>(new League(0, ''));

// Drawer State
const editLeagueDrawer = ref(false);

// Add a new team
const addLeague = () => {
  selectedLeague.value = new League(0, '');
  editLeagueDrawer.value = true;
};

// Edit a team
const editLeague = (index: number) => {
  selectedLeague.value = leagues.value[index];
  editLeagueDrawer.value = true;
};

// Delete a team
const deleteLeague = (index: number) => {
  if (confirm("Are you sure you want to delete this league?")) {
    leagues.value.splice(index, 1);
  }
};
</script>

<style scoped>
.drawer-side {
  z-index: 9999;
}
</style>
