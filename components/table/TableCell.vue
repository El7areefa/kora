<template>
  <td
    :class="{
      'is-sticky': props.sticky,
    }"
  >
    <slot />
  </td>
</template>

<script lang="ts" setup>
const props = defineProps<{
  sticky?: boolean,
}>();
</script>




