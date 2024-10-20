export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number = 250,
): T {
  let timeoutID: number
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  } as T
}
