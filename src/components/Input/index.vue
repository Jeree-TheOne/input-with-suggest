<template>
  <div :class="$style.container">
    <div v-if="label" :class="$style.labelWrapper">
      <span v-if="required" :class="$style.asterisk">*</span>
      <span>{{ label }}</span>
    </div>
    <div @click.self="focusInput" :class="$style.inputWrapper">
      <slot name="prepend-input" />
      <input
        ref="inputRef"
        v-bind="$attrs"
        v-model="localInput"
        placeholder="Введите"
        :class="$style.input"
      />
      <slot name="append-input" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { debounce } from '@/utils/debounce';
import type { InputProps } from '@/types/components/Input';
import { ref, watch } from 'vue'

// value
const localInput = ref('')
const inputValue = defineModel()

const debouncedSearch = debounce(() => inputValue.value = localInput.value);

watch(localInput, debouncedSearch)

// input ref
const inputRef = ref<HTMLInputElement>()

const focusInput = () => {
  inputRef.value?.focus()
}

// props
defineProps<InputProps>()

// slots
defineSlots<{
  'prepend-input'(): void
  'append-input'(): void
}>()

</script>

<style scoped module>
.container {
  display: flex;
  flex-direction: column;
}

.labelWrapper {
  margin-bottom: 8px;
  display: flex;
  gap: 2px;
  font-size: 14px;
  font-weight: 600;
  color: #454545;
}

.asterisk {
  color: #f09389;
}

.inputWrapper {
  border: 1px solid #d6dedf;
  border-radius: 2px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  padding: 4px;

  font-size: 14px;
}

.input {
  display: flex;
  font-size: 14px;
  line-height: 21px;
  min-width: 100px;
  flex: 1;
}
</style>
