import { FocusEventHandler } from 'react'
import { TLabelProps } from '@/components/inputs/types'
import { InputActionMeta, SingleValue } from 'react-select'

export type TSelectOptions = {
  value: string
  label: string | React.ReactNode
}[]
export type TSelectProps = {
  placeholder?: string
  options: TSelectOptions
  defaultValue?: TSelectOptions[0]
  isSearchable?: boolean
  name: string
  onChange?: (e: SingleValue<TSelectOptions[0]>) => void
  onBlur?: FocusEventHandler<HTMLInputElement>
  id?: string
  isClearable?: boolean
  onInputChange?: (newValue: string, actionMeta: InputActionMeta) => void
  readOnly?: boolean
  disabled?: boolean
  error?: string
  label?: TLabelProps
  border?: boolean
  clear?: boolean
}
