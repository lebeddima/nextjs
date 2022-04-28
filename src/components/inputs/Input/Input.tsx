import { ChangeEvent, useState, useEffect } from 'react'
import InputMask from 'react-input-mask'
import cn from 'classnames'
import { createClass } from '@/utils/createClass'
import { Label } from '@/components/inputs/Label'
import { Eye } from '../Eye'
import { TInputProps, TInputThemes } from '../types'

import s from './input.module.scss'

export const Input: React.FC<TInputProps> = ({
  theme = 'primary',
  placeholder,
  className,
  type = 'text',
  style,
  textarea,
  disabled,
  value,
  name,
  onChange,
  onBlur,
  id,
  color,
  shape,
  font,
  readOnly,
  mask,
  error,
  label,
  maxLength,
  countable
}) => {
  const [eyeOpen, setEyeOpen] = useState(false)
  const [charCount, setCharCount] = useState(0)

  const propsThemes: TInputThemes = {
    ...(theme === 'primary' && {
      shape: 'big',
      color: 'primary',
      font: 'big'
    }),
    ...(theme === 'primary-small' && {
      shape: 'small',
      color: 'primary',
      font: 'small'
    }),
    ...(color && { color }),
    ...(shape && { shape }),
    ...(font && { font })
  }

  const classes = createClass<TInputThemes>(propsThemes, s)

  useEffect(() => {
    if (countable) {
      setCharCount(value?.length || 0)
    }
  }, [countable, value])

  if (textarea) {
    return (
      <div className={s.container}>
        <Label {...label} error={error} htmlFor={id}>
          <textarea
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            className={cn(s.input, className, classes, { [s.error]: error })}
            style={style}
            name={name}
            onChange={onChange as (e: ChangeEvent<HTMLTextAreaElement>) => void}
            onBlur={onBlur as (e: ChangeEvent<HTMLTextAreaElement>) => void}
            id={id}
            readOnly={readOnly}
            maxLength={maxLength}
          />
          {countable && (
            <div className={s.count}>
              {charCount}/{maxLength}
            </div>
          )}
        </Label>
      </div>
    )
  }

  const handlerClickEye = () => {
    if (disabled) return
    setEyeOpen(!eyeOpen)
  }

  const inputType = type === 'password' && eyeOpen ? 'text' : type

  return (
    <div className={s.container}>
      <Label {...label} error={error} htmlFor={id}>
        {mask ? (
          <InputMask
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            className={cn(s.input, className, classes, { [s.error]: error })}
            type={inputType}
            style={style}
            name={name}
            onChange={onChange as (e: ChangeEvent<HTMLInputElement>) => void}
            onBlur={onBlur as (e: ChangeEvent<HTMLInputElement>) => void}
            id={id}
            readOnly={readOnly}
            mask={mask}
          />
        ) : (
          <div className={s.inputCont}>
            <input
              value={value}
              disabled={disabled}
              placeholder={placeholder}
              className={cn(s.input, className, classes, s[`type_${type}`], {
                [s.error]: error
              })}
              type={inputType}
              style={style}
              name={name}
              onChange={onChange as (e: ChangeEvent<HTMLInputElement>) => void}
              onBlur={onBlur as (e: ChangeEvent<HTMLInputElement>) => void}
              id={id}
              readOnly={readOnly}
            />
            {type === 'password' && (
              <div className={s.eyeContainer}>
                <Eye open={eyeOpen} disabled={disabled} onClick={handlerClickEye} />
              </div>
            )}
          </div>
        )}
      </Label>
    </div>
  )
}
