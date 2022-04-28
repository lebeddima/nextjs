import { CSSProperties, useEffect, useRef } from 'react'
import cn from 'classnames'
import { Icon } from '@/components/Icon'
import { createClass } from '@/utils/createClass'
import Link from 'next/link'
import { useRouter } from 'next/router'
import s from './Button.module.scss'

type TButtonThemes = {
  shape?: 'small' | 'big' | 'tab-big' | 'tab-small' | 'tab-xs' | 'nav-underline' | 'text'
  color?:
    | 'primary'
    | 'secondary'
    | 'tab-green'
    | 'tab-red'
    | 'tab-blue'
    | 'nav-text-black'
    | 'text-white'
    | 'text-blue'
    | 'text-red'
  font?: 'small' | 'big' | 'text-big' | 'text-medium'
}

export type TButton = {
  id?: string
  theme?:
    | 'primary'
    | 'primary-small'
    | 'secondary'
    | 'secondary-small'
    | 'tab-green-big'
    | 'tab-red-big'
    | 'tab-blue-small'
    | 'tab-blue-xs'
    | 'nav-underline'
    | 'text-white'
    | 'text-blue'
    | 'text-red'
  label?: React.ReactNode | string | number
  type?: JSX.IntrinsicElements['button']['type']
  loading?: boolean
  disabled?: boolean
  notActive?: boolean
  additionalState?: boolean
  width?: string
  onClick?: () => void
  linkTo?: string
  navLinkTo?: string
  styleButton?: CSSProperties
  styleLabel?: CSSProperties
  classButton?: string
  classLabel?: string
  dynamicUnderline?: boolean
  underline?: boolean
  autofocus?: boolean
} & TButtonThemes

export const Button: React.FC<TButton> = ({
  theme,
  label,
  color,
  shape,
  font,
  type = 'button',
  loading,
  disabled,
  notActive,
  additionalState,
  onClick,
  linkTo,
  navLinkTo,
  width,
  styleButton,
  styleLabel,
  classButton,
  classLabel,
  dynamicUnderline,
  underline,
  autofocus
}) => {
  const router = useRouter()

  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (autofocus && btnRef.current) {
      btnRef.current.focus()
    }
  }, [])

  const propsThemes: TButtonThemes = {
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
    ...(theme === 'secondary' && {
      shape: 'big',
      color: 'secondary',
      font: 'big'
    }),
    ...(theme === 'secondary-small' && {
      shape: 'small',
      color: 'secondary',
      font: 'small'
    }),
    ...(theme === 'tab-green-big' && {
      shape: 'tab-big',
      color: 'tab-green',
      font: 'big'
    }),
    ...(theme === 'tab-red-big' && {
      shape: 'tab-big',
      color: 'tab-red',
      font: 'big'
    }),
    ...(theme === 'tab-blue-small' && {
      shape: 'tab-small',
      color: 'tab-blue',
      font: 'big'
    }),
    ...(theme === 'tab-blue-xs' && {
      shape: 'tab-xs',
      color: 'tab-blue',
      font: 'small'
    }),
    ...(theme === 'nav-underline' && {
      shape: 'nav-underline',
      color: 'nav-text-black',
      font: 'text-big'
    }),
    ...(theme === 'text-white' && {
      shape: 'text',
      color: 'text-white',
      font: 'text-big'
    }),
    ...(theme === 'text-blue' && {
      shape: 'text',
      color: 'text-blue',
      font: 'text-big'
    }),
    ...(theme === 'text-red' && {
      shape: 'text',
      color: 'text-red',
      font: 'text-big'
    }),
    ...(color && { color }),
    ...(shape && { shape }),
    ...(font && { font })
  }

  const themeClasses = createClass(propsThemes, s)

  if (linkTo || navLinkTo) {
    const href = linkTo || navLinkTo || ''

    return (
      <Link href={href}>
        <a
          className={cn(
            s.button,
            {
              [s.loading]: loading,
              [s.notActive]: notActive || router.pathname === navLinkTo,
              [s.additionalState]: router.pathname === navLinkTo,
              [s.dynamicUnderline]: dynamicUnderline,
              [s.underline]: underline,
              [s.disabled]: disabled
            },
            themeClasses,
            classButton
          )}
          style={{ ...styleButton, width }}
          href={href}
        >
          <span className={cn(s.label, classLabel)} style={styleLabel}>
            {label}
          </span>
          {loading && (
            <Icon className={s.loadingIcon} id="spinner-gap" size="medium" spin />
          )}
        </a>
      </Link>
    )
  }

  return (
    <button
      className={cn(
        s.button,
        {
          [s.loading]: loading,
          [s.notActive]: notActive,
          [s.additionalState]: additionalState,
          [s.dynamicUnderline]: dynamicUnderline,
          [s.underline]: underline
        },
        themeClasses,
        classButton
      )}
      style={{ ...styleButton, width }}
      /* eslint-disable-next-line react/button-has-type */
      type={type}
      onClick={onClick}
      disabled={disabled}
      ref={btnRef}
    >
      <div className={cn(s.label, classLabel)} style={styleLabel}>
        {label}
      </div>
      {loading && <Icon className={s.loadingIcon} id="spinner-gap" size="medium" spin />}
    </button>
  )
}
