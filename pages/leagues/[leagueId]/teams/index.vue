<template>
  <div class="p-8 flex flex-col flex-1">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Teams</h1>
    </div>

    <!-- Teams Table -->
    <table v-if="teams.length > 0" class="min-w-full table-auto border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="border border-gray-300 px-4 py-2 text-left w-[65%]">Name</th>
          <th class="border border-gray-300 px-4 py-2 w-[25%]">Players</th>
          <th class="border border-gray-300 px-4 py-2 w-[10%]">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(team, index) in teams" :key="team.id" class="hover:bg-gray-50">
          <td class="border border-gray-300 px-4 py-2">
            <router-link
              :to="`/leagues/${leagueId}/teams/${team.id}`"
              class="text-blue-600 hover:underline"
            >
              {{ team.name }}
            </router-link>
          </td>
          <td class="border border-gray-300 px-4 py-2 text-center">{{ team.players?.length ?? 0 }}</td>
          <td class="border border-gray-300 px-4 py-2 text-center">
            <button @click="editTeam(index)" class="text-blue-600 hover:underline mr-2" title="Edit Team">
              <i class="fas fa-edit"></i>
            </button>
            <button @click="deleteTeam(index)" class="text-red-600 hover:underline" title="Delete Team">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Empty state -->
    <div v-else class="text-center text-gray-500 mt-20">
      <p class="mb-4 text-xl">No teams found.</p>
      <button @click="addTeam" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add Team
      </button>
    </div>

    <!-- Team Edit Drawer (Modal) -->
    <teleport to="body">
      <EditTeamDrawer
        v-model="editTeamDrawer"
        :team="selectedTeam"
        @saved="handleTeamSaved"
        @close="closeDrawer"
        v-if="editTeamDrawer"
      />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import EditTeamDrawer from '@/components/modules/team/EditPlayer.vue'; // Your drawer component path

interface Team {
  id: string;
  name: string;
  leagueId: string;
  players?: any[];
}

const route = useRoute();
const leagueId = route.params.leagueId as string;

const teams = ref<Team[]>([]);
const selectedTeam = ref<Team | null>(null);
const editTeamDrawer = ref(false);

const fetchTeams = async () => {
  try {
    const res = await fetch(`http://localhost:8080/api/v1/${leagueId}/team`);
    if (!res.ok) throw new Error("Failed to fetch teams");
    const data = await res.json();
    teams.value = data.content ?? [];
  } catch (error) {
    console.error("Error fetching teams:", error);
  }
};

const addTeam = () => {
  selectedTeam.value = { id: '', name: '', leagueId, players: [] };
  editTeamDrawer.value = true;
};

const editTeam = (index: number) => {
console.log("EDITING TEAM");
  selectedTeam.value = { ...teams.value[index] }; // clone to avoid direct mutations
  editTeamDrawer.value = true;
};

const deleteTeam = async (index: number) => {
  if (!confirm("Are you sure you want to delete this team?")) return;

  const teamToDelete = teams.value[index];
  try {
    const res = await fetch(`http://localhost:8080/api/v1/team/${teamToDelete.id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error("Failed to delete team");

    teams.value.splice(index, 1);
  } catch (error) {
    console.error("Error deleting team:", error);
    alert("Failed to delete team");
  }
};

const handleTeamSaved = (updatedTeam: Team) => {
  const index = teams.value.findIndex(t => t.id === updatedTeam.id);
  if (index !== -1) {
    teams.value[index] = updatedTeam;
  } else {
    // New team added
    teams.value.push(updatedTeam);
  }
  editTeamDrawer.value = false;
  selectedTeam.value = null;
};

const closeDrawer = () => {
  editTeamDrawer.value = false;
  selectedTeam.value = null;
};

onMounted(fetchTeams);
</script>

<style scoped>
/* Optional: make sure the drawer overlays everything */
.drawer-side {
  z-index: 9999;
}

/* Simple table styling */
table {
  border-collapse: collapse;
  width: 100%;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
}
tr:hover {background-color: #f5f5f5;}
</style>
