<template>
  <div>
    <!-- Hamburger button -->
    <button
      v-if="!isOpen && isMobile"
      @click.stop="openSidebar"
      class="fixed top-4 left-4 z-50 p-2 rounded"
    >
      ☰
    </button>

    <!-- Sidebar -->
    <aside
      v-click-outside="handleClickOutside"
      :class="[
        'fixed top-0 left-0 h-screen  bg-white shadow-md transform transition-transform duration-300 z-40',
        isOpen || !isMobile ? 'translate-x-0' : '-translate-x-full',
        isMobile ? 'w-40' : 'w-64'
      ]"
    >
      <div class="p-6 font-bold text-xl border-b">el7areefa</div>
      <nav class="mt-4 flex flex-col gap-2 p-4">
        <NuxtLink @click="closeSidebar" to="/" class="p-2 rounded hover:bg-gray-100 transition">🏠 Home</NuxtLink>
      </nav>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isOpen = ref(false)
const isMobile = ref(false)
const emit = defineEmits<{
  (e: 'update-sidebar', value: boolean): void
}>();

const checkIsMobile = () => {
  isMobile.value = window.innerWidth < 1280
  if (!isMobile.value) {
    isOpen.value = true // Always open sidebar on desktop
  } else {
    isOpen.value = false // Sidebar closed by default on mobile
  }
}

const openSidebar = () => {
  isOpen.value = true
  if (isMobile.value) {
    emit('update-sidebar', true)
  }
}

// Handle click outside
const handleClickOutside = () => {
  if (isMobile.value && isOpen.value) {
    isOpen.value = false
    emit('update-sidebar', false)
  }
}

const closeSidebar = () => {
  if (isMobile.value) {
    isOpen.value = false
  }
}

onMounted(() => {
  checkIsMobile()
  window.addEventListener('resize', checkIsMobile)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkIsMobile)
})

</script>
