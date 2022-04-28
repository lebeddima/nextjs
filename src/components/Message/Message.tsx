import { useMemo } from 'react'
import { Card, TCard } from '@/components/Card'
import { TButtonIcon } from '@/components/buttons/ButtonIcon'
import { Icon } from '@/components/Icon'
import { IconWrapper } from '../IconWrapper'
import s from './Message.module.scss'

interface IMessageProps {
  size: TCard['theme']
  theme: 'warning'
  title: string
  description?: string
  additionalButton?: React.ReactNode
  onClose?(): void
  closeSize?: TButtonIcon['theme']
}

export const Message: React.FC<IMessageProps> = ({
  size,
  theme,
  title,
  description,
  additionalButton,
  onClose,
  ...props
}) => {
  const getIcon = useMemo(() => {
    switch (theme) {
      case 'warning':
        return (
          <IconWrapper width={40} colorTheme="red-secondary" shape="circle">
            <Icon id="warning-circle" colorStroke="red" />
          </IconWrapper>
        )
      default:
        return null
    }
  }, [theme])

  return (
    <Card onClose={onClose} className={s.card} theme={size} btnAbsolute {...props}>
      <div className={s.titleContainer}>
        {getIcon}
        <div className={s.title}>{title}</div>
      </div>
      <div>
        {description && <span className={s.description}>{`${description} `}</span>}
        {additionalButton}
      </div>
    </Card>
  )
}
