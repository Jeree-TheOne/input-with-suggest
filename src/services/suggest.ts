import type { Publication } from '@/types/models/publication'

export const suggestRequest = async (
  query: string | undefined,
): Promise<Publication[]> => {
  if (!query || query.length < 3) return []
  try {
    const response = await fetch(
      `https://habr.com/kek/v2/publication/suggest-mention?q=${query}`,
      {
        method: 'GET',
        signal: AbortSignal.timeout(5000),
      },
    )
    const json = await response.json()

    if (response.ok) {
      return json.data
    }

    throw json
  } catch (error) {
    const err = error as Error
    if (err.name === 'TimeoutError') {
      console.error('Timeout: It took more than 5 seconds to get the result!')
    } else if (err.name === 'AbortError') {
      console.error(
        'Fetch aborted by user action (browser stop button, closing tab, etc.',
      )
    } else {
      const err = error as any
      console.error(`${err.errorCode}:${400}\n${err.message}`)
    }
    return []
  }
}
