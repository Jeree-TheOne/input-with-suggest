export type DropdownMenuProps<T> = {
  // items shown
  items?: T[]
  // items tht selected (needed to display tick)
  selected?: string[]
  // field value that will be displayed
  labelKey?: keyof T
  // filed value that will return on select
  valueKey?: keyof T
  // class for list
  listClass?: string
  // should modal close on select
  closeOnChoose?: boolean
  // should select return object or only valueKey of object
  returnObject?: boolean
  // is dropdown items loading
  loading?: boolean
}
