import type { InputProps } from '.'
import type { DropdownMenuProps } from '../DropdownMenu'

export type InputWithSuggestProps<T> = {
  // function that should loads data (if no items given)
  fetchFunc?: () => Promise<T[]>
  // items of suggest
  items?: T[]
  // tags in input
  tags: string[]
  // max amount of tags
  maxTags?: number
  // min chars to trigger suggest dropdown
  minCharsSuggest?: number
  // props that should be passed to dropdown
  dropdownOptions?: DropdownMenuProps<T>
  // props that should be passed to input
  inputOptions?: InputProps
}
