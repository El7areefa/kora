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
import type { League } from "~/models/league";

const props = defineProps<{
  league: League;
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "league-created", league: League): void;
  (e: "league-updated", league: League): void;
}>();

const isLoading = ref(false);
const errorMessage = ref("");

const submitLeague = async () => {
  if (!props.league.name) {
    errorMessage.value = "League name is required";
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";

  try {
    const payload = {
      name: props.league.name,
      imageUrl: props.league.imageUrl,
      // Add other fields if needed
    };

    let response;
    if (props.league.id) {
      // Update existing league
      response = await $fetch(`http://localhost:8080/api/v1/league/${props.league.id}`, {
        method: 'PUT',
        body: payload,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      emit('league-updated', response);
    } else {
      // Create new league
      response = await $fetch('http://localhost:8080/api/v1/league', {
        method: 'POST',
        body: payload,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      emit('league-saved', response);
    }

    emit('update:modelValue', false);
  } catch (error) {
    console.error('Error submitting league:', error);
    errorMessage.value = "Failed to submit league. Please try again.";
  } finally {
    isLoading.value = false;
  }
};

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