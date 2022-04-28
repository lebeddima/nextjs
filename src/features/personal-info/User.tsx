import { Icon } from '@/components/Icon'
import { IconWrapper } from '@/components/IconWrapper'
import { useAuth } from '@/hooks/useAuth'
import useTranslation from 'next-translate/useTranslation'
import { Copy } from '@/components/Copy'
import cn from 'classnames'
import { Card } from './components/Card'
import s from './styles/User.module.scss'

export const User: React.FC = () => {
  const { user } = useAuth()
  const { t } = useTranslation()

  if (!user) {
    return null
  }

  return (
    <Card>
      <div className={s.container}>
        <IconWrapper
          shape="rectangle"
          borderRadius={10}
          colorTheme="gradient"
          width={135}
        >
          <Icon id="user-profile" />
        </IconWrapper>
        <div className={s.userInfo}>
          <div className={s.title}>
            {user.name} {user.surname}
          </div>
          <div className={s.row}>
            <span className={s.label}>{t('common:id')}:</span>
            <span className={s.id}>{user._id}</span>
            <Copy text={user._id} />
          </div>
          <div className={s.label}>Entered from: Safari V14.0.1 (Mac OS)</div>

          <div className={cn(s.status, { [s.active]: user.activated })}>
            <div className={s.dot} />
            {t(user.activated ? 'common:verified' : 'common:notVerified')}
          </div>
        </div>
      </div>
    </Card>
  )
}
