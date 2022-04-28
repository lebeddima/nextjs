import React from 'react'
import { Button } from '../buttons/Button'
import s from './Fallback.module.scss'

interface IFallbackProps {
  title: string
  buttonLabel?: string
  onClick?(): void
}

export const Fallback: React.FC<IFallbackProps> = ({ title, buttonLabel, onClick }) => (
  <div className={s.fallbackContainer}>
    <div>
      <div className={s.fallbackTitle}>{title}</div>
      {onClick && buttonLabel && (
        <Button theme="primary-small" label={buttonLabel} onClick={onClick} />
      )}
    </div>
  </div>
)
