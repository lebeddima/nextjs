import useTranslation from 'next-translate/useTranslation'
import { DATE_FORMATS, TIME_FORMATS } from '@/constants/date'
import { format } from 'date-fns'
import { useRedux } from '@/hooks/useRedux'
import { Button } from '@/components/buttons/Button'
import { ROUTES } from '@/constants/routes'
import { IconStatus } from './components/IconStatus'
import { Card } from '../personal-info/components/Card'
import { selectUnread } from './store/notifications'
import s from './styles/NotificationsShort.module.scss'

export const NotificationsShort: React.FC = () => {
  const { lang, t } = useTranslation()
  const [select] = useRedux()
  const unreadNotifications = select(selectUnread)

  return (
    <Card
      title={t('common:notifications')}
      navigation={
        <Button
          label={t('common:seeAll')}
          theme="text-blue"
          underline
          linkTo={ROUTES.CABINET_NOTIFICATIONS}
        />
      }
    >
      <div className={s.container}>
        {unreadNotifications.map((x) => (
          <div className={s.notificationItem} key={x.id}>
            <div className={s.titleContainer}>
              <IconStatus type={x.type} />
              <span className={s.notificationTitle}>{x.title}</span>
            </div>
            <div className={s.timeContainer}>
              <span className={s.date}>{format(x.date, TIME_FORMATS[lang])}</span>
              <span className={s.date}>{format(x.date, DATE_FORMATS[lang])}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
