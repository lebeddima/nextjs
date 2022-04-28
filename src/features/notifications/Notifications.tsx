import { useEffect } from 'react'
import { useRedux } from '@/hooks/useRedux'
import { DATE_FORMATS, TIME_FORMATS } from '@/constants/date'
import { format } from 'date-fns'
import useTranslation from 'next-translate/useTranslation'
import { Pagination } from '@/components/navigations/Pagination'
import { NotificationCard } from './components/NotificationCard'
import s from './styles/Notifications.module.scss'
import { selectNotifications, sendUnread } from './store/notifications'

export const Notifications: React.FC = () => {
  const { lang } = useTranslation()
  const [select, dispatch] = useRedux()
  const { notifications } = select(selectNotifications)

  useEffect(() => {
    dispatch(sendUnread())
  }, [])

  return (
    <div className={s.container}>
      {notifications.map(({ id, type, title, message, date, unread }) => (
        <NotificationCard
          key={id}
          id={id}
          type={type}
          title={title}
          message={message}
          date={`${format(date, TIME_FORMATS[lang])} ${format(date, DATE_FORMATS[lang])}`}
          unread={unread}
        />
      ))}
      <Pagination currentPage={1} lastPage={2} />
    </div>
  )
}
