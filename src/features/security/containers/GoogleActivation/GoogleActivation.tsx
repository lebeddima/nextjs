import { Button } from '@/components/buttons/Button'
import { Header } from '@/components/modals/Header'
import { ModalBase } from '@/components/modals/ModalBase'
import { useRedux } from '@/hooks/useRedux'
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import { selectGoogle2fa, setStep, reset } from '../../store/google2fa'
import s from './GoogleActivation.module.scss'

export const GoogleActivation: React.FC = () => {
  const { t } = useTranslation('security')
  const [select, dispatch] = useRedux()
  const { qrCode, secret } = select(selectGoogle2fa)

  const handleClose = () => dispatch(reset())

  const handleContinue = () => {
    dispatch(setStep('code'))
  }

  return (
    <ModalBase onClose={handleClose}>
      <Header
        title={t('2fa.title')}
        description={
          <>
            <span className={s.step}> {t('common:step')} 1/3</span>:{' '}
            {t('2fa.activate-desc')}
          </>
        }
      />
      <div className={s.qr}>
        {qrCode && <Image src={qrCode} alt="qr" width={130} height={130} />}
      </div>

      <div className={s.info}>{t('2fa.activate-info')}</div>

      <div className={s.secretCode}>{secret}</div>

      <Button
        theme="primary"
        label={t('common:continue')}
        width="100%"
        onClick={handleContinue}
        autofocus
      />
    </ModalBase>
  )
}
