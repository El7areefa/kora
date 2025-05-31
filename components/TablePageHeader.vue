<template>
    <!-- Header -->
    <div class="flex flex-wrap justify-between items-center mb-6 gap-2">
      <h1 class="text-3xl font-bold">{{ title }}</h1>
      <div class="flex items-center gap-2 min-w-[50%]">
        <div class="relative flex-grow">
          <input
            v-model="searchQuery"
            @input="handleSearch"
            type="text"
            :placeholder="`Search ${title}...`"
            class="input input-bordered w-full pr-10"
          />
          <button
            v-if="searchQuery.length > 0"
            @click="clearSearch"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 z-10"
          >
            <i class="fa-regular fa-circle-xmark"></i>
          </button>
        </div>
        <button
          @click="addButtonAction"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition min-w-[135px]"
        >
          {{ addButtonText }}
        </button>
      </div>
    </div>
</template>

<script lang="ts" setup>
import { debounce } from 'lodash';


const props = defineProps<{
  title: string;
  addButtonText: string;
  addButtonAction: () => void;
  searchQuery: string;
  handleSearch: () => void;
}>();

const emit = defineEmits<{
  (e: "update:searchQuery", query: string): void;
}>();



const searchQuery = computed({
  get: () => props.searchQuery,
  set: (value) => emit("update:searchQuery", value),
});

const handleSearch = debounce(() => {
  props.handleSearch();
}, 500);

const clearSearch = () => {
  searchQuery.value = "";
  props.handleSearch();
};




</script>
