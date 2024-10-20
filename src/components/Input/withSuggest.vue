<template>
  <div>
    <DropdownMenu
      @keyup.esc="showSuggest = false"
      v-bind="dropdownOptions"
      v-model="showSuggest"
      :items="formattedItems"
      :loading="loading"
      :close-on-choose="false"
      @choose="chooseItem"
    >
      <template #trigger>
        <InputWithTags
          :input-options="inputOptions"
          v-model="search"
          v-model:tags="localTags"
          @focus="onFocusInput"
        >
          <template #prepend-tag>@</template>
        </InputWithTags>
      </template>
      <template #item="{ item }">
        <slot name="item" :item="item" />
      </template>
    </DropdownMenu>
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, any>, K">
import InputWithTags from '@/components/Input/withTags.vue'
import DropdownMenu from '@/components/DropdownMenu/index.vue'
import { computed, ref, watch } from 'vue'
import useActionWithLoading from '@/composables/useActionWithLoading'
import type { InputWithSuggestProps } from '@/types/components/Input/withSuggest'


// props & emits
const props = withDefaults(defineProps<InputWithSuggestProps<T>>(), {
  minCharsSuggest: 3,
})

const emits = defineEmits<{
  (event: 'update:tags', tags: string[]): void
}>()

// loading model
const loading = defineModel('loading', { default: false })

// search & show state
const showSuggest = ref(false)
const search = defineModel({ default: '' })

watch(search, async () => {
  const suggestVisible = search.value!.length >= props.minCharsSuggest
  showSuggest.value = suggestVisible
  if (!props.fetchFunc) return

  localItems.value = await useActionWithLoading(props.fetchFunc, loading)
})

const onFocusInput = () => {
  showSuggest.value = search.value!.length >= props.minCharsSuggest
}

// items
const formattedItems = computed(() => localItems.value ?? props.items)
const localItems = ref<T[]>()

// tags
const localTags = ref<string[]>([])

const chooseItem = (item: T[keyof T] | T) => {
  const isAdded = localTags.value.includes(item)
  if (!isAdded && localTags.value.length === props.maxTags) return

  isAdded
    ? (localTags.value = localTags.value.filter(tag => tag !== item))
    : localTags.value.push(item)

  if (localTags.value.length === props.maxTags) showSuggest.value = false
}

watch(
  localTags,
  () => {
    emits('update:tags', localTags.value)
  },
  { deep: true },
)


// slots
defineSlots<{
  'item'(props: { item: T }): void
}>()
</script>
