import type { NextPage } from 'next'
import { LayoutCabinet } from '@/layouts/LayoutCabinet'
import useTranslation from 'next-translate/useTranslation'
import { Notifications } from '@/features/notifications/Notifications'

const NotificationsPage: NextPage = () => {
  const { t } = useTranslation('notifications')

  return (
    <LayoutCabinet>
      <h4 className="cabinet-title ">{t('header')}</h4>
      <Notifications />
    </LayoutCabinet>
  )
}

export default NotificationsPage
