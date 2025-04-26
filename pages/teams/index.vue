<template>
  <div class="p-8">
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
          <Table-head class="pl-2 w-[65%]">Name</Table-head>
          <Table-head class="w-[25%]">players</Table-head>
          <Table-head class="w-[10%]">Actions</Table-head>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(team, index) in teams" :key="team.id">
          <Table-cell>{{ team.name }}</Table-cell>
          <Table-cell>{{ team.players }}</Table-cell>
          <Table-cell>
            <div class="flex gap-2">
              <button
                @click="editTeam(index)"
                class="text-yellow-500 hover:underline"
              >
                Edit
              </button>
              <button
                @click="deleteTeam(index)"
                class="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </Table-cell>
        </tr>
      </tbody>
    </Table>

    <!-- Button to open Drawer -->
    <button class="btn btn-primary" @click="drawerOpen = true">
      Edit Team
    </button>

    <!-- Drawer -->
    <div class="drawer drawer-end">
      <input
        id="drawer-edit-team"
        type="checkbox"
        class="drawer-toggle"
        :checked="drawerOpen"
        @change="drawerOpen = !drawerOpen"
      />

      <div class="drawer-content">
        <!-- Blank Content (main page) -->
      </div>

      <div class="drawer-side">
        <label for="drawer-edit-team" class="drawer-overlay"></label>

        <div class="min-h-full w-96 bg-white p-4">
          <h2 class="text-xl font-bold mb-4">Edit Team</h2>

          <!-- Tabs -->
          <div role="tablist" class="tabs tabs-bordered mb-4">
            <a
              role="tab"
              class="tab"
              :class="{ 'tab-active': activeTab === 'details' }"
              @click="activeTab = 'details'"
              >Details</a
            >
            <a
              role="tab"
              class="tab"
              :class="{ 'tab-active': activeTab === 'players' }"
              @click="activeTab = 'players'"
              >Players</a
            >
          </div>

          <!-- Tab Panels -->
          <div>
            <!-- Details Tab -->
            <div v-if="activeTab === 'details'" class="space-y-4">
              <div>
                <label class="label">
                  <span class="label-text">Team Name</span>
                </label>
                <input
                  v-model="team.name"
                  type="text"
                  class="input input-bordered w-full"
                />
              </div>

              <div>
                <label class="label">
                  <span class="label-text">Logo URL</span>
                </label>
                <input
                  v-model="team.logo"
                  type="text"
                  class="input input-bordered w-full"
                />
              </div>

              <div>
                <label class="label">
                  <span class="label-text">Description</span>
                </label>
                <textarea
                  v-model="team.description"
                  class="textarea textarea-bordered w-full"
                ></textarea>
              </div>
            </div>

            <!-- Players Tab -->
            <div v-if="activeTab === 'players'" class="space-y-4">
              <div class="overflow-x-auto">
                <table class="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Age</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="player in team.players" :key="player.id">
                      <td>{{ player.name }}</td>
                      <td>{{ player.age }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Add Player Form -->
              <div class="space-y-2">
                <h3 class="text-lg font-semibold">Add Player</h3>

                <input
                  v-model="newPlayerName"
                  type="text"
                  placeholder="Player Name"
                  class="input input-bordered w-full"
                />
                <input
                  v-model.number="newPlayerAge"
                  type="number"
                  placeholder="Player Age"
                  class="input input-bordered w-full"
                />

                <button @click="addPlayer" class="btn btn-success w-full">
                  Add Player
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
// Dummy team data
const teams = ref([
  {
    id: 1,
    name: "Team Alpha",
    players: 20,
    website: "https://alpha.com",
  },
  {
    id: 2,
    name: "Team Beta",
    players: 20,
    website: "https://beta.com",
  },
]);

// Add a new team
const addTeam = () => {
  const newId = teams.value.length + 1;
  teams.value.push({
    id: newId,
    name: `Team ${newId}`,
    players: 20,
    website: "https://example.com",
  });
};

// Edit team name (basic prompt)
const editTeam = (index) => {
  const team = teams.value[index];
  const newName = prompt("Edit Team Name:", team.name);
  if (newName !== null && newName.trim() !== "") {
    teams.value[index].name = newName;
  }
};

// Delete a team
const deleteTeam = (index) => {
  if (confirm("Are you sure you want to delete this team?")) {
    teams.value.splice(index, 1);
  }
};

// Team Data
const team = ref({
  id: "team-1",
  name: "Real Madrid",
  logo: "https://via.placeholder.com/100",
  description: "Best team in the world",
  players: [
    { id: "player-1", name: "Cristiano Ronaldo", age: 38 },
    { id: "player-2", name: "Luka Modrić", age: 37 },
  ],
});

// Drawer State
const drawerOpen = ref(false);

// Tab State
const activeTab = ref("details");

// New Player Form
const newPlayerName = ref("");
const newPlayerAge = ref(0);

// Add New Player
function addPlayer() {
  if (!newPlayerName.value || newPlayerAge.value === 0) return;

  team.value.players.push({
    id: `player-${Date.now()}`,
    name: newPlayerName.value,
    age: newPlayerAge.value,
  });

  newPlayerName.value = "";
  newPlayerAge.value = 0;
}
</script>

<style scoped>
.drawer-side {
  z-index: 9999;
}
</style>
