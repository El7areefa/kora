<template>
  <!-- Main container with flex layout -->
  <div class="flex min-h-screen">
    <!-- Sidebar (fixed width) -->
    <!-- Main content area (flex-1 to take remaining space) -->
    <div class="flex-1 p-8">
      <!-- Your leagues content -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">Leagues</h1>
        <button
          @click="addLeague"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add League
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
        <p>Error loading leagues: {{ error }}</p>
        <button @click="fetchLeagues(0)" class="mt-2 text-blue-600 hover:text-blue-800">
          <i class="fas fa-sync-alt mr-1"></i> Try Again
        </button>
      </div>

      <!-- Data Table -->
      <div v-else-if="leagues.content.length > 0" class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="league in leagues.content" :key="league.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <router-link
                    :to="`/leagues/${league.id}`"
                    class="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {{ league.name }}
                  </router-link>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-4">
                  <button @click="editLeague(league)" class="text-blue-600 hover:text-blue-900">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button @click="deleteLeague(league)" class="text-red-600 hover:text-red-900">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <div class="mx-auto w-24 h-24 text-gray-400 mb-4">
          <i class="fas fa-trophy text-5xl"></i>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-1">No leagues found</h3>
        <p class="text-gray-500 mb-4">Get started by creating a new league</p>
        <button
          @click="addLeague"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <i class="fas fa-plus mr-2"></i> Add League
        </button>
      </div>

      <ModulesLeagueAddEdit
        :league="selectedLeague"
        v-model="editLeagueDrawer"
        @league-created="handleLeagueSaved"
        @league-updated="handleLeagueSaved"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { League } from '~/models/league';

const router = useRouter();

interface PaginatedResponse {
  content: League[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  number: number;
}

// State
const leagues = ref<PaginatedResponse>({
  content: [],
  pageable: { pageNumber: 0, pageSize: 10 },
  last: true,
  totalElements: 0,
  totalPages: 0,
  first: true,
  number: 0
});
const selectedLeague = ref<League>(new League('',''));
const editLeagueDrawer = ref(false);
const loading = ref(true);
const error = ref<string | null>(null);
const currentPage = ref(0);
const toast = useNuxtApp().$toast;

const fetchLeagues = (page: number = 0) => {
  loading.value = true;
  error.value = null;
  currentPage.value = page;
  useFetchAPI(`/league?page=${page}&size=10`, {
    method: 'GET'
  })
  .then((response) => {
    leagues.value = response.data.value as PaginatedResponse;
  })
  .catch((err) => {
    error.value = err instanceof Error ? err.message : 'Failed to load leagues';
  })
  .finally(() => {
    loading.value = false;
  });
};

// Handle saved league
const handleLeagueSaved = () => {
  editLeagueDrawer.value = false;
  fetchLeagues(0);
};

// CRUD operations
const addLeague = () => {
  selectedLeague.value = new League('','');
  editLeagueDrawer.value = true;
};

const editLeague = (league: League) => {
  selectedLeague.value = { ...league };
  editLeagueDrawer.value = true;
};

const deleteLeague = (league: League) => {
  if (!confirm(`Are you sure you want to delete "${league.name}"?`)) return;

  try {
     useFetchAPI(`/league/${league.id}`, {
      method: 'DELETE'
    }).then(res => {
      toast('League deleted successfully', 'success');
      fetchLeagues(currentPage.value)
    });

  } catch (err) {
    toast('Failed to delete league', 'error');
    // error.value = err instanceof Error ? err.message : 'Failed to delete league';
    console.error('Delete Error:', err);
  }
};

// Initial fetch
onMounted(() => fetchLeagues(0));
</script>

<style>
/* Ensure proper layout */
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

/* If you need to make the sidebar scrollable */
.sidebar {
  height: 100vh;
  overflow-y: auto;
}

/* Make sure modals/drawers appear above everything */
.modal, .drawer {
  z-index: 50;
}
</style>