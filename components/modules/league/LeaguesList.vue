<template>
  <div>
    <!-- Table View -->
    <Table v-if="leagues.length > 0" type="bordered" showHover>
      <thead>
        <tr>
          <TableHead class="pl-2 w-[65%]">Name</TableHead>
          <TableHead class="w-[25%]">Teams</TableHead>
          <TableHead class="w-[10%]">Actions</TableHead>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(league, index) in leagues" :key="league.id">
          <TableCell>{{ league.name }}</TableCell>
          <TableCell>{{ league.teams?.length || 0 }}</TableCell>
          <TableCell>
            <div class="flex items-center gap-2">
              <a class="cursor-pointer" @click="$emit('edit-league', index)">
                <i class="fas fa-edit mr-2"></i>
              </a>
              <a class="cursor-pointer" @click="$emit('delete-league', index)">
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
      icon="fas fa-exclamation-triangle"
      :iconSize="160"
      title="No leagues found"
      description="No leagues found"
      ctaBtn="Add League"
      @ctaClick="$emit('add-league')"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  leagues: {
    type: Array,
    required: true
  }
});

defineEmits(['edit-league', 'delete-league', 'add-league']);
</script>