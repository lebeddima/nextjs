import { CSSProperties } from 'react'
import cn from 'classnames'
import { Icon, TIconProps } from '@/components/Icon'
import { createClass } from '@/utils/createClass'
import s from './ButtonIcon.module.scss'

interface TClassThemes {
  shape?: 'square-small' | 'square-medium' | 'square-big'
  color?: 'opacity'
  size?: TIconProps['size']
}

export type TButtonIcon = {
  theme?: 'small' | 'medium' | 'big'
  type?: JSX.IntrinsicElements['button']['type']
  loading?: boolean
  disabled?: boolean
  notActive?: boolean
  additionalState?: boolean
  iconColor?: TIconProps['colorStroke']
  fill?: TIconProps['fill']
  icon?: TIconProps['id']
  onClick?: () => void
  iconComponent?: React.ReactNode
  classContainer?: string
  styleContainer?: CSSProperties
} & TClassThemes

export const ButtonIcon: React.FC<TButtonIcon> = ({
  theme,
  shape,
  color,
  icon,
  size,
  iconColor = 'blue',
  fill,
  type = 'button',
  loading,
  disabled,
  notActive,
  additionalState,
  classContainer,
  onClick,
  styleContainer,
  iconComponent
}) => {
  const propsThemes: TClassThemes = {
    ...(theme === 'small' && {
      shape: 'square-small',
      color: 'opacity',
      size: 'small'
    }),
    ...(theme === 'medium' && {
      shape: 'square-medium',
      color: 'opacity',
      size: 'medium'
    }),
    ...(theme === 'big' && {
      shape: 'square-big',
      color: 'opacity',
      size: 'big'
    }),
    ...(shape && { shape }),
    ...(color && { color }),
    ...(size && { size })
  }

  const { size: iconSize, ...classThemes } = propsThemes

  const classes = createClass<TClassThemes>(classThemes, s)

  const renderIcon = () =>
    iconComponent ?? (
      <Icon
        id={icon}
        size={iconSize}
        colorStroke={iconColor}
        disabled={disabled}
        fill={fill}
      />
    )

  return (
    <button
      className={cn(
        s.button,
        {
          [s.loading]: loading,
          [s.notActive]: notActive,
          [s.additionalState]: additionalState
        },
        classes,
        classContainer
      )}
      /* eslint-disable-next-line react/button-has-type */
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{ ...styleContainer }}
    >
      {!loading && renderIcon()}
      {loading && <Icon size={iconSize} colorStroke="blue" id="spinner-gap" spin />}
    </button>
  )
}
