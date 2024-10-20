<template>
  <div :class="$style.flex">
    <InputWithSuggest
      :items="items"
      :loading="loading"
      v-model:tags="tagsLocal"
      v-model="searchLocal"
      style="width: 100%"
      :dropdown-options="{
        valueKey: 'alias',
        listClass: $style.dropdownList,
        selected: tagsLocal,
      }"
      :input-options="{ label: 'Пользователь или компания', required: true }"
      :max-tags="1"
    >
      <template #item="{ item }">
        <component
          :is="item.type === 'company' ? CompanyCard : UserCard"
          :item="item"
        />
      </template>
    </InputWithSuggest>

    <!-- <InputWithSuggest
      :fetch-func="fetchPublicationsFunc"
      v-model:tags="tagsFetch"
      v-model="searchFetch"
      style="width: 100%"
      :dropdown-options="{
        valueKey: 'alias',
        listClass: $style.dropdownList,
        selected: tagsFetch,
      }"
      :input-options="{ label: 'Пользователь или компания' }"
      :max-tags="1"
    >
      <template #item="{ item }">
        <component
          :is="item.type === 'company' ? CompanyCard : UserCard"
          :item="item"
        />
      </template>
    </InputWithSuggest> -->
  </div>
</template>

<script setup lang="ts">
import CompanyCard from '@/components/Cards/CompanyCard.vue'
import UserCard from '@/components/Cards/UserCard.vue'

import InputWithSuggest from '@/components/Input/withSuggest.vue'
import { ref, watch } from 'vue'
import { suggestRequest } from '@/services/suggest'
import type { Publication } from '@/types/models/publication'
import useActionWithLoading from '@/composables/useActionWithLoading'

// with fetchFunc
const searchFetch = ref('')
const tagsFetch = ref<string[]>([])
const fetchPublicationsFunc = async () =>
  await suggestRequest(searchFetch.value)

// with local items
const loading = ref(false)
const searchLocal = ref('')
const tagsLocal = ref<string[]>([])
const items = ref<Publication[]>([])

const fetchPublicationsLocal = async () => {
  items.value = await useActionWithLoading(() => suggestRequest(searchLocal.value), loading)
}

watch(searchLocal, fetchPublicationsLocal)
</script>

<style module>
.dropdownList {
  max-width: 320px;
  max-height: 256px !important;
  width: fit-content;
}

.flex {
  display: flex;
  gap: 32px;
}
</style>
