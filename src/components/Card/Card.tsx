import cn from 'classnames'
import { ButtonIcon, TButtonIcon } from '@/components/buttons/ButtonIcon'
import s from './Card.module.scss'

export type TCard = {
  theme: 'micro' | 'small' | 'big'
  onClose?: () => void
  closeSize?: TButtonIcon['theme']
  maxWidth?: string
  className?: string
  closeClassName?: string
  btnAbsolute?: boolean
}

export const Card: React.FC<TCard> = ({
  children,
  maxWidth,
  theme,
  onClose,
  closeSize = 'medium',
  className,
  closeClassName,
  btnAbsolute
}) => (
  <div
    className={cn(s.container, s[theme], className, {
      [s.btnAbsolute]: btnAbsolute
    })}
    style={{ ...(maxWidth && { maxWidth }) }}
  >
    {onClose && (
      <div className={cn(s.button, closeClassName)}>
        <ButtonIcon
          theme={closeSize}
          type="button"
          icon="x"
          iconColor="none"
          onClick={onClose}
        />
      </div>
    )}
    {children}
  </div>
)
