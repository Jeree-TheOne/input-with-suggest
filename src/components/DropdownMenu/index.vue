<template>
  <div v-click-outside="closeDropdown" :class="$style.container">
    <slot name="trigger">
      <button :class="$style.button" @click="toggleDropdown">
        <slot name="dropdown-text"> Dropdown </slot>
      </button>
    </slot>
    <Transition
      :enter-from-class="$style.fadeEnterFrom"
      :enter-to-class="$style.fadeEnterTo"
      :leave-active-class="$style.fadeLeave"
    >
      <div v-if="open" :class="[$style.list, listClass, !items?.length && $style.emptyList, loading && $style.loadingList]">
        <slot name="items" :items="items">
          <button
            @click="chooseItem(item)"
            v-for="item in items"
            :key="item[valueKey as keyof T]"
            :class="$style.listItem"
          >
            <slot name="item" :item="item">
              <span>{{ item[labelKey as keyof T] }}</span>
            </slot>
            <div :class="$style.iconWrapper">
              <TickIcon v-show="selected?.includes(item[valueKey as keyof T])" :class="$style.icon" />
            </div>
          </button>
        </slot>
        <div v-if="!items?.length && !loading" :class="$style.empty">
          <slot name="empty">
            <div :class="$style.emptyLitsContent">Ничего не найдено :(</div>
          </slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import TickIcon from '@/assets/svg/tick.svg'

import type { DropdownMenuProps } from '@/types/components/DropdownMenu'

// props & emits
const props = withDefaults(defineProps<DropdownMenuProps<T>>(), {
  labelKey: 'name',
  valueKey: 'id',
  closeOnChoose: true,
})

const emits = defineEmits<{
  (event: 'open'): void
  (event: 'close'): void
  (event: 'choose', item: T | T[keyof T]): void
}>()

// dropdown list visibility
const open = defineModel()

const openDropdown = () => {
  open.value = true
  emits('open')
}

const closeDropdown = () => {
  open.value = false
  emits('close')
}

const toggleDropdown = () => {
  open.value ? closeDropdown() : openDropdown()
}

// selecting dropdown list item
const chooseItem = (item: T) => {
  emits('choose', props.returnObject ? item : item[props.valueKey])
  props.closeOnChoose && closeDropdown()
}


defineSlots<{
  'trigger'(): void
  'dropdown-text'(): void
  'empty'(): void
  'items'(props: { items: T[] | undefined }): void
  'item'(props: { item: T }): void
}>()
</script>

<style scoped module>
.fadeEnterFrom {
  transform: translateY(-12px);
  opacity: 0;
}

.fadeEnterTo {
  transform: translateY(0);
  opacity: 1;
}

.fadeLeave {
  opacity: 0;
  transform: translateY(-12px);
}

.container {
  position: relative;
}

.button {
  padding: 8px 12px;
  border-radius: 6px;
}

.list {
  transition-property: transform, opacity;
  position: absolute;
  display: flex;
  flex-direction: column;

  margin-top: 12px;

  border-radius: 6px;

  max-height: 300px;
  overflow: auto;

  -webkit-box-shadow: 0px 0px 16px 0px #00000026;
  -moz-box-shadow: 0px 0px 16px 0px #00000026;
  box-shadow: 0px 0px 16px 0px #00000026;
}

.loadingList {
  filter: blur(2px);
  pointer-events: none;
}

.emptyList {
  max-width: 100%;
  width: 100%;
}

.emptyLitsContent {
  padding: 16px;
  text-align: center;
}

.listItem {
  display: flex;
  align-items: center;
  justify-content: start;

  padding: 14px 12px;

  transition-property: background-color;
}

.listItem,
.button {
  &:hover,
  &:focus &:focus-visible,
  &:focus-within {
    background-color: #eeeeee;
  }

  &:active {
    background-color: #eaeaea;
  }
}
.iconWrapper {
  position: relative;
  width: 10px;
  height: 10px;

  margin-left: auto;
  padding-left: 12px;
}
.icon {
  position: absolute;

  width: 100%;
  height: 100%;

  top: 0;
  left: 0;
}
</style>
