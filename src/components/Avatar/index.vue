<template>
  <img :src="src ?? '/avatar-dummy.webp'" :class="$style.avatar">
</template>

<script setup lang="ts">
defineProps<{
  src?: string | null
}>()
</script>

<style scoped module>
.avatar {
  object-fit: cover;
  width: 32px;
  height: 32px;
  border-radius: 6px;
}
</style>