<template>
  <div class="p-8 flex flex-col flex-1">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Teams</h1>
      <button
        @click="addTeam"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        + Add Team
      </button>
    </div>

    <!-- Table -->
    <Table v-if="teams.length > 0" type="bordered" showHover>
      <thead>
        <tr>
          <TableHead class="pl-2 w-[65%]">Name</TableHead>
          <TableHead class="w-[25%]">Players</TableHead>
          <TableHead class="w-[10%]">Actions</TableHead>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(team, index) in teams" :key="team.id">
          <TableCell>{{ team.name }}</TableCell>
          <TableCell>{{ team.players.length }}</TableCell>
          <TableCell>
            <div class="flex items-center gap-2">
              <a class="cursor-pointer" @click="editTeam(index)">
                <i class="fas fa-edit mr-2"></i>
              </a>
              <a class="cursor-pointer" @click="deleteTeam(index)">
                <i class="fas fa-trash mr-2 text-red-500"></i>
              </a>
            </div>
          </TableCell>
        </tr>
      </tbody>
    </Table>

    <EmptyStateCta
      v-if="teams.length === 0"
      icon="fas fa-exclamation-triangle"
      :iconSize="160"
      title="No teams found"
      description="No teams found"
      ctaBtn="Add Team"
      @ctaClick="addTeam"
    />

    <ModulesTeamEditPlayer :team="selectedTeam" v-model="editTeamDrawer" />
  </div>
</template>

<script setup lang="ts">
import { Team } from "../../models/Team";

// Dummy team data
const teams = ref<Team[]>([
  new Team(1,'Team 1'),
  new Team(2,'Team 2'),
  new Team(3,'Team 3'),
  new Team(4,'Team 4'),
  new Team(5,'Team 5'),
  new Team(6,'Team 6'),
  new Team(7,'Team 7'),
  new Team(8,'Team 8'),
  new Team(9,'Team 9'),
  new Team(10,'Team 10'),
  new Team(11,'Team 11'),
  new Team(12,'Team 12'),
  new Team(13,'Team 13'),
  new Team(14,'Team 14'),
  new Team(15,'Team 15'),
  new Team(16,'Team 16'),
  new Team(17,'Team 17'),
  new Team(18,'Team 18'),
  new Team(19,'Team 19'),
  new Team(20,'Team 20'),
]);

const selectedTeam = ref<Team>(new Team(0, ''));

// Drawer State
const editTeamDrawer = ref(false);

// Add a new team
const addTeam = () => {
    selectedTeam.value = new Team(0, '');
    editTeamDrawer.value = true;
};

// Edit a team
const editTeam = (index: number) => {
  selectedTeam.value = teams.value[index];
  editTeamDrawer.value = true;
};

// Delete a team
const deleteTeam = (index: number) => {
  if (confirm("Are you sure you want to delete this team?")) {
    teams.value.splice(index, 1);
  }
};
</script>

<style scoped>
.drawer-side {
  z-index: 9999;
}
</style>
