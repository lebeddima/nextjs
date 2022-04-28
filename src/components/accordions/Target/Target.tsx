import React from 'react'
import cn from 'classnames'
import { Icon } from '@/components/Icon'
import s from './Target.module.scss'

type TTarget = {
  text: string
  isActive?: boolean
  onClick?: () => void
}

export const Target: React.FC<TTarget> = ({ text, isActive, onClick }) => (
  <div
    className={cn(s.container, { [s.isActive]: isActive })}
    role="button"
    tabIndex={0}
    onClick={onClick}
    onKeyPress={onClick}
  >
    <div className={s.text}>{text}</div>
    <div className={s.icon}>
      <Icon id="chevron-right" fill="blue" size="big" />
    </div>
  </div>
)
