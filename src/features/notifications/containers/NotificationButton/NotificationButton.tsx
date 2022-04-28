import { CSSProperties } from 'react'
import cn from 'classnames'
import { Icon } from '@/components/Icon'
import { ButtonIcon } from '@/components/buttons/ButtonIcon'
import { useRedux } from '@/hooks/useRedux'
import { useRouter } from 'next/router'
import { ROUTES } from '@/routes'
import { selectorHasUnread } from '../../store/notifications'
import s from './NotificationButton.module.scss'

type TNotificationButton = {
  theme: 'icon' | 'button'
  styleContainer?: CSSProperties
}

export const NotificationButton: React.FC<TNotificationButton> = ({ theme }) => {
  const router = useRouter()
  const [select] = useRedux()
  const hasUnread = select(selectorHasUnread)

  const renderIcon = () => (
    <Icon
      className={cn(s.icon, { [s.unread]: hasUnread })}
      id="notifications"
      size="medium"
    />
  )

  if (theme === 'icon') return renderIcon()

  return (
    <ButtonIcon
      classContainer={s.button}
      theme="big"
      onClick={() => router.push(ROUTES.CABINET_NOTIFICATIONS)}
      iconComponent={renderIcon()}
    />
  )
}
