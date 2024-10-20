<template>
  <Card :avatar-src="item.avatar" :upper-text="upperText" lower-text="Компания" />
</template>

<script setup lang="ts">
import Card from '@/components/Cards/index.vue'
import type { Publication } from '@/types/models/publication';
import { computed } from 'vue';

const props = defineProps<{
  item: Publication
}>();

const upperText = computed(() => props.item.name ?? props.item.alias);
</script>