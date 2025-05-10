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
      <Table type="bordered" showHover>
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
  
      <ModulesTeamEditPlayer :team="selectedTeam" v-model="editTeamDrawer" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { type Team } from "../../models/Team";
  
  // Dummy team data
  const teams = ref<Team[]>([
    {
        id: 1,
        name: "Team Alpha",
        players: new Array(20),
        logoUrl: "",
        numberOfSucessMatches: 0,
        numberOfDefeatsMatches: 0,
        numberOfDrawsMatches: 0,
        numberOfPoints: 0,
        league: {
            id: 1,
            name: "League 1",
            logo: "",
            teams: [],
            matches: [],
        },
        matches: [],
        registrationDate: new Date()
    },
    {
      id: 2,
      name: "Team Beta",
      players: new Array(20),
      logoUrl: "",
      numberOfSucessMatches: 0,
      numberOfDefeatsMatches: 0,
      numberOfDrawsMatches: 0,
      numberOfPoints: 0,
      league: {
        id: 1,
        name: "League 1",
        logo: "",
        teams: [],
        matches: [],
      },
      matches: [],
      registrationDate: new Date()
    },
  ]);
  
  const selectedTeam = ref<Team | null>(null);
  
  // Drawer State
  const editTeamDrawer = ref(false);
  
  // Add a new team
  const addTeam = () => {
    const newId = teams.value.length + 1;
    teams.value.push(    {
      id: newId,
      name: `Team ${newId}`,
      players: new Array(20),
      logoUrl: "",
      numberOfSucessMatches: 0,
      numberOfDefeatsMatches: 0,
      numberOfDrawsMatches: 0,
      numberOfPoints: 0,
      league: {
        id: 1,
        name: "League 1",
        logo: "",
        teams: [],
        matches: [],
      },
      matches: [],
      registrationDate: new Date()
    });
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
  