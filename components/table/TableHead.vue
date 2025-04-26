<template>
  <th :class="props.sticky ? 'is-sticky' : ''">
    <div
    >
      <slot />
    </div>
  </th>
</template>

<script lang="ts" setup>
const props = defineProps<{
  sticky?: boolean,
}>();


</script>

