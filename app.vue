<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <SideNav :class="sidebarClass" />

    <!-- Main content area -->
    <div class="flex-1 transition-all duration-300 ease-in-out overflow-auto">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

const isSidebarOpen = ref(true);
const screenWidth = ref(window.innerWidth);

const handleResize = () => {
  screenWidth.value = window.innerWidth;
  if (screenWidth.value < 768) {
    isSidebarOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

const updateSidebar = (value: boolean) => {
  isSidebarOpen.value = value;
};

const sidebarClass = computed(() =>
  isSidebarOpen.value
    ? 'w-64 md:relative fixed md:static z-20 h-full bg-white border-r transition-all duration-300'
    : 'w-0 md:w-64 md:relative fixed md:static z-20 h-full overflow-hidden transition-all duration-300'
);
</script>
