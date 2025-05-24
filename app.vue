<template>
  <div>
    <NuxtLayout>
      <!-- <SideNav @update-sidebar="updateSidebar" /> -->
      <div class="ml-64 md:ml-40 transition-all duration-300 ease-in-out flex flex-col h-full"  :class="{ 'md:!ml-0': !isSidebarOpen }">
        <!-- <Breadcrumbs /> -->
        <NuxtPage />
      </div>
    </NuxtLayout>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';

const isSidebarOpen = ref(false);

const updateSidebar = (value: boolean) => {
  isSidebarOpen.value = value;
};
</script>
