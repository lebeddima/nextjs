import { LayoutCabinet } from '@/layouts/LayoutCabinet'
import { Wallet } from '@/features/wallet/Wallet'
import { VerifyNotification } from '@/features/kyc/VerifyNotification'
import { TwoFaNotification } from '@/features/security/TwoFaNotification'
import useTranslation from 'next-translate/useTranslation'
import s from './Wallet.module.scss'

const WalletPage: React.FC = () => {
  const { t } = useTranslation('wallet')

  return (
    <LayoutCabinet sidebar={false}>
      <div className={s.notificationBlock}>
        <VerifyNotification />
        <TwoFaNotification />
      </div>

      <h4 className="cabinet-title"> {t('header')} </h4>
      <Wallet />
    </LayoutCabinet>
  )
}

export default WalletPage
