<template>
  <div :class="$style.card">
    <Avatar :src="avatarSrc" />
    <div :class="$style.info">
      <span :class="$style.upperText">{{ upperText }}</span>
      <span class="secondary-text">{{ lowerText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import Avatar from '@/components/Avatar/index.vue'

defineProps<{
  avatarSrc?: string | null
  upperText?: string
  lowerText?: string
}>()
</script>

<style scoped module>
.card {
  display: flex;
  gap: 12px;

  align-items: center;
  justify-content: center;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 2px;

  justify-content: center;
  align-items: start;
}

.upperText {
  white-space: nowrap;
}
</style>
