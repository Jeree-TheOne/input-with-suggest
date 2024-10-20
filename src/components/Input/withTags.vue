<template>
  <Input v-bind="inputOptions" v-model="search" :class="$style.input">
    <template #prepend-input>
      <div v-for="(tag, index) in tags" :key="index" :class="$style.tag">
        <span :class="$style.tagText">
          <slot name="prepend-tag" />{{ tag }}<slot name="append-tag" />
        </span>
        <button
          @click="removeTag(tag)"
          :data-tag="tag"
          :class="$style.closeButton"
        >
          <CloseIcon :class="$style.icon" />
        </button>
      </div>
    </template>
  </Input>
</template>

<script setup lang="ts">
import type { InputWithTagsProps } from '@/types/components/Input/withTags'
import Input from './index.vue'
import CloseIcon from '@/assets/svg/close.svg'

// search model
const search = defineModel({ default: '' })

// props
defineProps<InputWithTagsProps>()

// tags
const tags = defineModel<string[]>('tags', { default: [] as string[] })

const removeTag = (value: string) => {
  tags.value = tags.value?.filter(tag => tag !== value)
}

// slots
defineSlots<{
  'prepend-tag'(): void
  'append-tag'(): void
}>()
</script>

<style scoped module>
.tags {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.tag {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 4px 6px;

  border-radius: 2px;

  color: white;
  background-color: #92a8ba;
}

.tagText {
  font-size: 10px;
  font-weight: 600;
  white-space: nowrap;
}

.closeButton {
  position: relative;
  width: 10px;
  height: 10px;
  padding: 2px;
  border-radius: 2px;

  color: inherit;

  &:hover {
    color: #eeeeee;
  }

  &:focus-visible {
    box-shadow: 0 0 0 1px #eeeeee;
  }

  &:active {
    box-shadow: 0 0 0 1px #eaeaea;
  }
}

.icon {
  position: absolute;
  width: 100%;
  height: 100%;

  top: 0;
  left: 0;
}
</style>
