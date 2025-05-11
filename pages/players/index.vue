<template>
    <div class="p-8 flex flex-col flex-1">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">Players</h1>
        <button
          @click="addPlayer"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add Player
        </button>
      </div>
  
      <!-- Table -->
      <Table v-if="players.length > 0" type="bordered" showHover>
        <thead>
          <tr>
            <TableHead class="pl-2 w-[65%]">Name</TableHead>
            <TableHead class="w-[25%]">Players</TableHead>
            <TableHead class="w-[10%]">Actions</TableHead>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(player, index) in players" :key="player.id">
            <TableCell>{{ player.name }}</TableCell>
            <TableCell>{{ player.team.name }}</TableCell>
            <TableCell>
              <div class="flex items-center gap-2">
                <a class="cursor-pointer" @click="editPlayer(index)">
                  <i class="fas fa-edit mr-2"></i>
                </a>
                <a class="cursor-pointer" @click="deletePlayer(index)">
                  <i class="fas fa-trash mr-2 text-red-500"></i>
                </a>
              </div>
            </TableCell>
          </tr>
        </tbody>
      </Table>

      <EmptyStateCta
      v-if="players.length === 0"
      icon="fas fa-exclamation-triangle"
      :iconSize="160"
      title="No players found"
      description="No players found"
      ctaBtn="Add Player"
      @ctaClick="addPlayer"
    />
  
      <ModulesPlayerEdit :player="selectedPlayer" v-model="editPlayerDrawer" />
    </div>
  </template>
  
  <script setup lang="ts">
import { Player } from '~/models/player';


  
  // Dummy team data
  const players = ref<Player[]>([]);
  
  const selectedPlayer = ref<Player>(new Player());
  
  // Drawer State
  const editPlayerDrawer = ref(false);
  
  // Add a new player
  const addPlayer = () => {
    selectedPlayer.value = new Player();
    editPlayerDrawer.value = true;
  };
  
  // Edit a player
  const editPlayer = (index: number) => {
    selectedPlayer.value = players.value[index];
    editPlayerDrawer.value = true;
  };
  
  // Delete a player
  const deletePlayer = (index: number) => {
    if (confirm("Are you sure you want to delete this player?")) {
      players.value.splice(index, 1);
    }
  };
  </script>
  
  <style scoped>
  .drawer-side {
    z-index: 9999;
  }
  </style>
  