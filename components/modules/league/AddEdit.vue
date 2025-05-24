<template>
  <!-- Drawer -->
  <div class="drawer drawer-end">
    <input
      id="drawer-edit-league"
      type="checkbox"
      class="drawer-toggle"
      :checked="modelValue"
      @change="emit('update:modelValue', !modelValue)"
    />

    <div class="drawer-content">
      <!-- Blank Content (main page) -->
    </div>

    <div class="drawer-side">
      <label for="drawer-edit-league" class="drawer-overlay"></label>

      <div class="min-h-full flex flex-col w-96 bg-white p-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold mb-4">
            {{ league?.id ? "Edit" : "Add" }} League
          </h2>
          <button
            class="btn btn-sm btn-circle btn-ghost"
            @click="emit('update:modelValue', false)"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="space-y-4">
          <InputField label="League Name" v-model="league.name" type="text" />
          <InputField label="League Logo" v-model="league.imageUrl" type="file" @change="handleFileUpload" />
        </div>

        <div class="flex justify-end mt-auto">
          <button
            class="btn btn-sm btn-ghost"
            @click="emit('update:modelValue', false)"
          >
            Cancel
          </button>
          <button class="btn btn-sm btn-primary" @click="submitLeague" :disabled="isLoading">
            <span v-if="isLoading">
              <i class="fas fa-spinner fa-spin"></i> Processing...
            </span>
            <span v-else>
              <i class="fas fa-plus"></i> {{ league?.id ? "Update" : "Add" }} League
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { League, LeaguePayload } from "~/models/league";

const toast = useNuxtApp().$toast;
const props = defineProps<{
  league: League;
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "league-created"): void;
  (e: "league-updated"): void;
}>();

const isLoading = ref(false);

const submitLeague = async () => {

  isLoading.value = true;
  const payload: LeaguePayload= {
    name: props.league.name,
    imageUrl: props.league.imageUrl,
    // Add other fields if needed
  };

  try {
    if (props.league.id) {
      // Update existing league
      updateLeague(payload);
    } else {
      // Create new league
      createLeague(payload);
    }

  } catch (error) {
    console.error('Error submitting league:', error);
  } finally {
    isLoading.value = false;
  }
};

const onError = (error: any) => {
  console.error('Error submitting league:', error);
  toast('Failed to submit league. Please try again.', 'error');
}

const createLeague = (payload: LeaguePayload) => {
  useFetchAPI<League>('/league', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: payload,
  }).then((response) => {
    if (response.data.value) {
      emit('league-created');
      toast('League created successfully.', 'success');
    }
  }).catch(onError);
}

const updateLeague = (payload: LeaguePayload) => {
  useFetchAPI<League>(`/league/${props.league.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: payload,
  }).then((response) => {
    if (response.data.value) {
      emit('league-updated');
      toast('League updated successfully.', 'success');
    }
  }).catch(onError);
}

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    // Here you would typically upload the file to a server and get the URL
    // For now, we'll just store the file name
    props.league.imageUrl = file.name;
  }
};
</script>

<style>
.drawer-side {
  z-index: 9999;
}
</style>