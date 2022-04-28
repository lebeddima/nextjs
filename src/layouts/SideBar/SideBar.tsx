import { Icon } from '@/components/Icon'
import useTranslation from 'next-translate/useTranslation'
import { IconWrapper } from '@/components/IconWrapper'
import { ReactNode } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ROUTES } from '@/routes'
import { NotificationButton } from '@/features/notifications/containers/NotificationButton'
import s from './SideBar.module.scss'

type SideBarItem = {
  text: string
  icon: ReactNode
  isActive: boolean
  link: string
}

export const SideBar: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation('sidebar')
  return (
    <div className={s.container}>
      <div className={s.stickly}>
        <SideBarItem
          icon={<Icon id="user" size="medium" />}
          link={ROUTES.CABINET_PERSONAL_INFO}
          isActive={router.pathname === ROUTES.CABINET_PERSONAL_INFO}
          text={t('items.personal-info')}
        />
        <SideBarItem
          icon={<Icon id="user-focus" size="medium" />}
          link={ROUTES.CABINET_KYC}
          isActive={router.pathname === ROUTES.CABINET_KYC}
          text={t('items.kyc')}
        />
        <SideBarItem
          icon={<Icon id="security" size="medium" />}
          link={ROUTES.CABINET_SECURITY}
          isActive={router.pathname === ROUTES.CABINET_SECURITY}
          text={t('items.security')}
        />
        <SideBarItem
          icon={<Icon id="envelope-open" size="medium" />}
          link={ROUTES.CABINET_OPEN_ORDERS}
          isActive={router.pathname === ROUTES.CABINET_OPEN_ORDERS}
          text={t('items.open-orders')}
        />
        <SideBarItem
          icon={<Icon id="list-dashes" size="medium" />}
          link={ROUTES.CABINET_HISTORY}
          isActive={router.pathname === ROUTES.CABINET_HISTORY}
          text={t('items.history')}
        />
        <SideBarItem
          icon={<NotificationButton theme="icon" />}
          link={ROUTES.CABINET_NOTIFICATIONS}
          isActive={router.pathname === ROUTES.CABINET_NOTIFICATIONS}
          text={t('items.notifications')}
        />
        <SideBarItem
          icon={<Icon id="support" size="medium" />}
          link={ROUTES.CABINET_SUPPORT}
          isActive={router.pathname === ROUTES.CABINET_SUPPORT}
          text={t('items.support')}
        />
        <SideBarItem
          icon={<Icon id="user-circle-minus" size="medium" />}
          link={ROUTES.CABINET_DEACTIVATION}
          isActive={router.pathname === ROUTES.CABINET_DEACTIVATION}
          text={t('items.account-deactivation')}
        />
      </div>
    </div>
  )
}

const SideBarItem: React.FC<SideBarItem> = ({ text, icon, link, isActive }) => (
  <Link href={link} passHref>
    <div className={cn(s.itemLink, `${isActive ? `${s.active}` : ''}`)}>
      <IconWrapper width={28} shape="rectangle" borderRadius={6} colorTheme="background">
        {icon}
      </IconWrapper>
      <span className={s.itemText}>{text}</span>
    </div>
  </Link>
)
