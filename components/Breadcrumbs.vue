<script setup lang="ts">
const route = useRoute()

const segments = computed(() => {
  const parts = route.path.split('/').filter(Boolean)
  return parts.map((segment, index) => {
    return {
      label: decodeURIComponent(segment).charAt(0).toUpperCase() + decodeURIComponent(segment).slice(1),
      to: '/' + parts.slice(0, index + 1).join('/'),
      isLast: index === parts.length - 1
    }
  })
})
</script>

<template>
  <div class="breadcrumbs text-sm p-4">
    <ul>
      <li v-for="segment in segments" :key="segment.to">
        <span v-if="segment.isLast" class="text-gray-500">{{ segment.label }}</span>
        <NuxtLink v-else :to="segment.to" class="text-blue-600">
          {{ segment.label }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
