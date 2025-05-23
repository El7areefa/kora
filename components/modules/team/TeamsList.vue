<template>
  <div>
    <!-- Table View -->
    <Table v-if="teams.length > 0" type="bordered" showHover>
      <thead>
        <tr>
          <TableHead class="pl-2 w-[65%]">Name</TableHead>
          <TableHead class="w-[25%]">Players</TableHead>
          <TableHead class="w-[10%]">Actions</TableHead>
        </tr>
      </thead>
      <tbody>
        <tr v-for="team in teams" :key="team.id">
          <TableCell>
            <router-link
              :to="`/leagues/${leagueId}/teams/${team.id}`"
              class="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
            >
              {{ team.name }}
            </router-link>
          </TableCell>
          <TableCell>
            {{ team.players?.length || 0 }}
          </TableCell>
          <TableCell>
            <div class="flex items-center gap-2">
              <a class="cursor-pointer" @click="emit('edit-team', team)">
                <i class="fas fa-edit mr-2"></i>
              </a>
              <a class="cursor-pointer" @click="emit('delete-team', team)">
                <i class="fas fa-trash mr-2 text-red-500"></i>
              </a>
            </div>
          </TableCell>
        </tr>
      </tbody>
    </Table>

    <!-- Empty State -->
    <EmptyStateCta
      v-if="teams.length === 0"
      icon="fas fa-users"
      :iconSize="160"
      title="No teams found"
      description="Get started by creating a new team"
      ctaBtn="Add Team"
      @ctaClick="emit('add-team')"
    />
  </div>
</template>

<script setup lang="ts">
import type { Team } from "~/models/Team";

const route = useRoute();

const leagueId = computed(() => route.params.leagueId);

defineProps<{
  teams: Team[];
}>();

const emit = defineEmits<{
  (event: "edit-team", team: Team): void;
  (event: "delete-team", team: Team): void;
  (event: "add-team"): void;
}>();
</script>
