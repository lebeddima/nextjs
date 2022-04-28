import { ChangeEvent, CSSProperties, ReactElement } from 'react'

export type TInputThemes = {
  theme?: 'primary' | 'primary-small'
  shape?: 'small' | 'big'
  color?: 'primary'
  font?: 'small' | 'big'
}

export type TLabelProps = {
  label?: string
  additionalLabel?: string
  additionalButton?: ReactElement
  htmlFor?: string
  error?: string
  style?: CSSProperties
  className?: string
}

export type TInputProps = {
  placeholder?: string
  className?: string
  type?: string
  style?: CSSProperties
  textarea?: boolean
  disabled?: boolean
  value?: string
  name: string
  onChange?:
    | ((e: ChangeEvent<HTMLInputElement>) => void)
    | ((e: ChangeEvent<HTMLTextAreaElement>) => void)
  onBlur?:
    | ((e: ChangeEvent<HTMLInputElement>) => void)
    | ((e: ChangeEvent<HTMLTextAreaElement>) => void)
  id?: string
  readOnly?: boolean
  error?: string
  label?: TLabelProps
  mask?: string
  maxLength?: number
  countable?: boolean
} & TInputThemes

export type TInputPhoneProps = {
  name?: string
  disabled?: boolean
  readOnly?: boolean
  onChange?: (value: string) => void
  placeholder?: string
  styleContainer?: CSSProperties
  classContainer?: string
  label?: TLabelProps
  error?: string
  menuShort?: boolean
  value?: string
  id?: string
  onEnterKey?: () => void
} & TInputThemes

export type TCheckBoxProps = {
  theme?: 'square' | 'circle' | 'slider'
  font?: 'caption-1'
  disabled?: boolean
  notActive?: boolean
  style?: CSSProperties
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  error?: string
  type: 'checkbox' | 'radio'
  value?: string
  name: string
  id?: string
  checked?: boolean
  label?: string
  htmlFor?: string
}

export type TDatePickerType = {
  firstDayOfWeek: number
  range?: boolean
  onDateFrom?: (e: Date) => void
  onDateTo?: (d: Date) => void
  clear?: boolean
  disable?: boolean
  error?: string
  label?: TLabelProps
  id?: string
  name: string
  type?: string
  placeholder?: string
  format?: string
  readOnly?: boolean
  fromMonth: Date
  toMonth: Date
} & TInputThemes
