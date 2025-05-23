<template>
  <div>
    <!-- Table View -->
    <Table v-if="leagues.length > 0" type="bordered" showHover>
      <thead>
        <tr>
          <TableHead class="pl-2 w-[90%]">Name</TableHead>
          <TableHead class="w-[10%]">Actions</TableHead>
        </tr>
      </thead>
      <tbody>
        <tr v-for="league in leagues" :key="league.id">
          <TableCell>
            <router-link
              :to="`/leagues/${league.id}`"
              class="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
            >
              {{ league.name }}
            </router-link>
          </TableCell>
          <TableCell>
            <div class="flex items-center gap-2">
              <a class="cursor-pointer" @click="emit('edit-league', league)">
                <i class="fas fa-edit mr-2"></i>
              </a>
              <a class="cursor-pointer" @click="emit('delete-league', league)">
                <i class="fas fa-trash mr-2 text-red-500"></i>
              </a>
            </div>
          </TableCell>
        </tr>
      </tbody>
    </Table>

    <!-- Empty State -->
    <EmptyStateCta
      v-if="leagues.length === 0"
      icon="fas fa-trophy"
      :iconSize="160"
      title="No leagues found"
      description="Get started by creating a new league"
      ctaBtn="Add League"
      @ctaClick="emit('add-league')"
    />
  </div>
</template>

<script setup lang="ts">
import type { League } from "~/models/league";


defineProps<{
  leagues: League[];
}>();

const emit = defineEmits<{
  (event: "edit-league", league: League): void;
  (event: "delete-league", league: League): void;
  (event: "add-league"): void;
}>();
</script>
