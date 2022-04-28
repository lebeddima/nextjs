import React, { useRef, useEffect, useState } from 'react'
import ReactCodeInput from 'react-verification-code-input'
import cn from 'classnames'
import { Label } from '@/components/inputs/Label'
import { TLabelProps } from '../types'
import s from './Code.module.scss'

type Code = {
  onComplete?: (x: string) => void
  onChange?: (x: string) => void
  error?: string
  type?: 'text' | 'number'
  onSubmitCode?: () => void
  label?: TLabelProps
  classContainer?: string
}

export const Code: React.FC<Code> = ({
  onComplete,
  onChange,
  error,
  type = 'number',
  onSubmitCode,
  label,
  classContainer
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const codeRef = useRef<ReactCodeInput>(null)
  const valRef = useRef<string>('')
  const submitFunc = useRef<null | ((e: KeyboardEvent) => void)>(null)
  const [focus, setFocus] = useState(false)

  const clear = () => {
    if (!codeRef.current) return
    codeRef.current.__clearvalues__()
  }

  const onSubmit = (e: KeyboardEvent) => {
    if (!onSubmitCode) return
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      onSubmitCode()
    }
  }

  useEffect(() => {
    if (!containerRef.current) return
    const inputs = containerRef.current.querySelectorAll('input')
    const onFocus = () => setFocus(true)
    const onBlur = () => {
      if (valRef.current) return
      setFocus(false)
    }

    inputs.forEach((input) => {
      input.addEventListener('focus', onFocus)
      input.addEventListener('blur', onBlur)
    })

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener('focus', onFocus)
        input.removeEventListener('blur', onBlur)
      })
    }
  }, [])

  useEffect(() => {
    if (submitFunc.current) {
      document.removeEventListener('keydown', submitFunc.current)
    }
    submitFunc.current = onSubmit
    document.addEventListener('keydown', submitFunc.current)

    return () => {
      if (!submitFunc.current) return
      document.removeEventListener('keydown', submitFunc.current)
    }
  }, [onSubmitCode])

  useEffect(() => {
    if (!error) return
    clear()
  }, [error])

  const onChangeValue = (val: string) => {
    valRef.current = val
    if (!onChange) return
    onChange(val)
  }

  return (
    <div
      className={cn(s.container, classContainer, { [s.focus]: focus, [s.error]: error })}
      ref={containerRef}
    >
      <Label {...label} error={error}>
        <ReactCodeInput
          onComplete={onComplete}
          onChange={onChangeValue}
          className={s.code}
          placeholder={['_', '_', '_', '_', '_', '_']}
          type={type}
          ref={codeRef}
        />
      </Label>
    </div>
  )
}
