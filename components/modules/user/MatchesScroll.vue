<template>
  <div class="relative">
    <button
      @click="scrollLeft"
      class="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
      aria-label="Scroll Left"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-gray-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
    <div
      ref="scrollContainer"
      class="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-8"
    >
      <div
        v-for="match in matches"
        :key="match.id"
        class="min-w-[300px] bg-white rounded-lg shadow-md p-4 mb-2"
      >
        <div class="flex justify-between mb-2 border-b border-gray-800">
          <p class="text-sm text-gray-900">
            {{ formatDate(match.matchDate) }}
          </p>
          <p class="text-sm text-gray-900">
            {{ formatTime(match.matchDate) }}
          </p>
        </div>
        <div class="flex justify-between">
          <div class="flex flex-col flex-grow">
            <div class="flex items-center justify-between gap-2 pt-2">
              <p class="font-semibold">{{ match.homeTeam.name }}</p>
              <img :src="match.homeTeam.logoUrl" alt="Team Logo" class="w-9" />
            </div>
            <div class="flex items-center justify-between gap-2">
              <p class="font-semibold">{{ match.awayTeam.name }}</p>
              <img :src="match.awayTeam.logoUrl" alt="Team Logo" class="w-9" />
            </div>
          </div>
          <div class="flex flex-col border-2 border-gray-200 match-score">
            <p class="text-lg font-bold">
              {{ match.homeTeamScore || "-" }}
            </p>
            <p class="text-lg font-bold pt-1">
              {{ match.awayTeamScore || "-" }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <button
      @click="scrollRight"
      class="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
      aria-label="Scroll Right"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-gray-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import type { Match } from "~/models/match";

defineProps<{
  matches: Match[];
}>();
const scrollContainer = ref<HTMLDivElement | null>(null);

const formatDate = (date: Date) => {
  return dayjs(date).format("DD/MM/YYYY");
};

const formatTime = (date: Date) => {
  return dayjs(date).format("h:mm A");
};

const scrollLeft = () => {
  scrollContainer.value?.scrollBy({ left: -320 * 3, behavior: "smooth" });
};

const scrollRight = () => {
  scrollContainer.value?.scrollBy({ left: 320 * 3, behavior: "smooth" });
};
</script>

<style lang="scss" scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.match-score {
  padding: 10px;
  min-width: 47px;
  text-align: center;
  margin-left: 8px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 3px;
  border-radius: 10px;
}
</style>
