import { Button } from '@/components/buttons/Button'
import useTranslation from 'next-translate/useTranslation'
import { ROUTES } from '@/routes'
import { useAuth } from '@/hooks/useAuth'
import { Icon } from '@/components/Icon'
import { NotificationButton } from '@/features/notifications/containers/NotificationButton'
import s from './Header.module.scss'

export const Header: React.FC = () => {
  const { t } = useTranslation('common')
  const { hasAuth, logout } = useAuth()

  const renderDesktop = () => (
    <div className={s.desktop}>
      <div className={s.left}>
        <Button theme="nav-underline" label="Spot trading" />
        <Button theme="nav-underline" label="Market" navLinkTo={ROUTES.MARKET} />
        {hasAuth && (
          <Button theme="nav-underline" label="Wallet" navLinkTo={ROUTES.WALLET} />
        )}
      </div>
      <div className={s.right}>
        {hasAuth && (
          <>
            <NotificationButton theme="button" />
            <Button
              theme="primary-small"
              label={<Icon id="user-circle" />}
              styleLabel={{ position: 'absolute', top: '8px' }}
              linkTo={ROUTES.CABINET_PERSONAL_INFO}
            />
            <Button
              label={t('logout')}
              theme="secondary-small"
              onClick={() => logout()}
            />
          </>
        )}
        {!hasAuth && (
          <>
            <Button label={t('login')} theme="secondary-small" linkTo={ROUTES.SIGN_IN} />
            <Button label={t('sign-up')} theme="primary-small" linkTo={ROUTES.SIGN_UP} />
          </>
        )}
      </div>
    </div>
  )

  return (
    <>
      <header className={s.container}>
        <div className={s.content}>{renderDesktop()}</div>
      </header>
    </>
  )
}
