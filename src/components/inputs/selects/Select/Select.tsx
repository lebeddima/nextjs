import React, { FC, useState, useEffect } from 'react'
import ReactSelect, {
  components,
  SingleValue,
  DropdownIndicatorProps
} from 'react-select'
import { Label } from '@/components/inputs/Label'
import cn from 'classnames'
import { TSelectProps, TSelectOptions } from '../types'

import s from './Select.module.scss'

export const Select: FC<TSelectProps> = ({
  placeholder = '',
  options,
  defaultValue,
  isSearchable = true,
  name,
  onBlur,
  id,
  onChange,
  isClearable,
  onInputChange,
  readOnly,
  disabled,
  error,
  label,
  clear,
  border = true
}) => {
  const [value, setValue] = useState<TSelectOptions[0] | null | undefined>(null)

  const getValue = (optionItem?: TSelectOptions[0]) => {
    if (!optionItem) return null
    return (
      options.find((item) => item.value.toString() === optionItem.value.toString()) ||
      null
    )
  }

  useEffect(() => {
    setValue(getValue(defaultValue))
  }, [defaultValue])

  useEffect(() => {
    if (!clear) return
    setValue(getValue(defaultValue))
  }, [clear])

  const onChangeValue = (e: SingleValue<TSelectOptions[0]>) => {
    setValue(e)
    if (onChange) {
      onChange(e)
    }
  }

  const DropdownIndicator = (props: DropdownIndicatorProps<TSelectOptions[0], false>) => (
    <components.DropdownIndicator {...props}>
      <div className={s.indicator} />
    </components.DropdownIndicator>
  )

  return (
    <div
      className={cn(s.select, {
        [s.readOnly]: readOnly,
        [s.disabled]: disabled,
        [s.error]: error,
        [s.border]: border
      })}
    >
      <Label {...label} error={error}>
        <ReactSelect
          classNamePrefix="rs"
          name={name}
          value={value}
          maxMenuHeight={200}
          placeholder={placeholder}
          options={options}
          isSearchable={isSearchable}
          onInputChange={onInputChange}
          onChange={onChangeValue}
          onBlur={onBlur}
          id={id}
          instanceId={id}
          isClearable={isClearable}
          components={{
            DropdownIndicator
          }}
        />
      </Label>
    </div>
  )
}
