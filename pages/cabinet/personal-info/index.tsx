import type { NextPage } from 'next'
import { LayoutCabinet } from '@/layouts/LayoutCabinet'
import useTranslation from 'next-translate/useTranslation'
import { Devices } from '@/features/personal-info/Devices'
import { User } from '@/features/personal-info/User'
import { ROUTES } from '@/constants/routes'
import { Button } from '@/components/buttons/Button'
import { WalletShort } from '@/features/wallet/WalletShort'
import { NotificationsShort } from '@/features/notifications/NotificationsShort'
import { Fee } from '@/features/personal-info/Fee'
import { OpenOrders } from '@/features/personal-info/OpenOrders'
import { Card } from '@/features/personal-info/components/Card'
import s from './PersonalInfo.module.scss'

const PersonalInfoPage: NextPage = () => {
  const { t } = useTranslation('personal-info')

  return (
    <LayoutCabinet>
      <h4 className="cabinet-title"> {t('header')} </h4>
      <div className={s.container}>
        <User />
        <Fee />
        <Card
          title={t('personal-info:currencyWallets')}
          navigation={
            <Button
              label={t('common:seeAll')}
              theme="text-blue"
              underline
              linkTo={ROUTES.WALLET}
            />
          }
        >
          <WalletShort />
        </Card>
        <OpenOrders />
        <Devices />
        <NotificationsShort />
      </div>
    </LayoutCabinet>
  )
}

export default PersonalInfoPage
