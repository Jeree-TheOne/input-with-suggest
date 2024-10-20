import type { Ref } from 'vue'

export default async function useActionWithLoading<T = void>(
  func: () => Promise<T>,
  isLoading: Ref<boolean>,
) {
  isLoading.value = true
  try {
    return await func()
  } finally {
    isLoading.value = false
  }
}
