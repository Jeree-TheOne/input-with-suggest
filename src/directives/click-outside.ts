import type { Directive, DirectiveBinding, VNode } from 'vue'

type Element = HTMLElement & { clickOutsideEvent: (event: Event) => void }

export const vClickOutside: Directive<Element, string> = {
  beforeMount: (el: Element, binding: DirectiveBinding, vnode: VNode) => {
    el.clickOutsideEvent = function (event) {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event)
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el: Element) {
    document.removeEventListener('click', el.clickOutsideEvent)
  },
}
