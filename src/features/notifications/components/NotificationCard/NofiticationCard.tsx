import cn from 'classnames'
import { IconStatus } from '../IconStatus'
import s from './NotificationCard.module.scss'
import { TNotification } from '../../store/notifications'

type TNotificationCard = {
  type: TNotification['type']
  title: string
  message: string
  date: string
  id: number
  unread?: boolean | undefined
}

export const NotificationCard: React.FC<TNotificationCard> = ({
  id,
  type,
  title,
  message,
  date,
  unread
}) => (
  <div className={cn(s.container, { [s.unread]: unread })}>
    <div className={s.titleBlock}>
      <div className={s.leftBlock}>
        {unread && <div className={s.indicator} />}
        <IconStatus type={type} />
        <div className={s.notificationTitle}>{`#${id} ${title}`}</div>
      </div>
      <div className={s.notificationDate}>{date}</div>
    </div>

    <div className={s.notificationMessage}>{message}</div>
  </div>
)
