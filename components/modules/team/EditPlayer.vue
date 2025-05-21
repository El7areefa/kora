<template>
  <div class="drawer drawer-end">
    <input
      id="drawer-edit-team"
      type="checkbox"
      class="drawer-toggle"
      :checked="modelValue"
      @change="updateModelValue(!modelValue)"
    />

    <div class="drawer-content"><!-- optional page content --></div>

    <div class="drawer-side">
      <label for="drawer-edit-team" class="drawer-overlay"></label>

      <div class="min-h-full w-96 flex flex-col bg-white p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">Edit Team</h2>
          <button class="btn btn-sm btn-circle btn-ghost" @click="closeDrawer">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <form @submit.prevent="saveTeam" class="flex flex-col gap-4">
          <div>
            <label class="label">Team Name</label>
            <input v-model="form.name" type="text" class="input" required autofocus />
          </div>

          <div>
            <label class="label">Logo URL</label>
            <input v-model="form.logoUrl" type="text" class="input" />
          </div>

          <div>
            <label class="label">Matches</label>
            <input v-model.number="form.numOfMatches" type="number" class="input" />
          </div>

          <div>
            <label class="label">Success Matches</label>
            <input v-model.number="form.numOfSuccessMatches" type="number" class="input" />
          </div>

          <div>
            <label class="label">Loss Matches</label>
            <input v-model.number="form.numOfLossMatches" type="number" class="input" />
          </div>

          <div>
            <label class="label">Draw Matches</label>
            <input v-model.number="form.numOfDrawMatches" type="number" class="input" />
          </div>

          <div>
            <label class="label">Points</label>
            <input v-model.number="form.numOfPoints" type="number" class="input" />
          </div>

          <div class="flex justify-end gap-2 mt-6">
            <button type="button" class="btn btn-sm" @click="closeDrawer">Cancel</button>
            <button type="submit" class="btn btn-sm btn-primary">
              <i class="fas fa-save mr-1"></i> Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import type { Team } from '~/models/team';

const props = defineProps<{
  team: Team;
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'saved', updatedTeam: Team): void;
}>();

const route = useRoute();
const leagueId = route.params.leagueId as string;

const form = ref<Team>({ ...props.team });

watch(
  () => props.team,
  (newTeam) => {
    form.value = { ...newTeam };
  },
  { immediate: true }
);

const updateModelValue = (value: boolean) => {
  emit('update:modelValue', value);
};

const closeDrawer = () => {
  emit('update:modelValue', false);
};

const saveTeam = async () => {
  try {
    const res = await fetch(
      `http://localhost:8080/api/v1/${leagueId}/team/${form.value.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form.value),
      }
    );
    if (!res.ok) throw new Error('Failed to update team');

    const updatedTeam = await res.json();
    emit('saved', updatedTeam);
    closeDrawer();
  } catch (err) {
    console.error('Save failed:', err);
    alert('Failed to update team');
  }
};
</script>

<style scoped>
.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.label {
  font-weight: 600;
  margin-bottom: 0.25rem;
  display: block;
  color: #333;
}

.btn-primary {
  background-color: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  font-weight: 600;
  transition: background-color 0.2s ease-in-out;
}

.btn-primary:hover {
  background-color: #1d4ed8;
}

.btn-sm {
  padding: 0.3rem 0.8rem;
  font-size: 0.875rem;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: white;
  color: #333;
  transition: background-color 0.15s ease-in-out;
}

.btn-sm:hover {
  background-color: #f0f0f0;
}

.btn-ghost {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  color: #666;
}

.btn-circle {
  border-radius: 50%;
  padding: 0.2rem 0.4rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.drawer-side {
  z-index: 9999;
}
</style>
