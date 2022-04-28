import { Button } from '@/components/buttons/Button'
import { Header } from '@/components/modals/Header'
import { ModalBase } from '@/components/modals/ModalBase'
import { useRedux } from '@/hooks/useRedux'
import useTranslation from 'next-translate/useTranslation'
import { selectGoogle2fa, reset, setStep } from '../../store/google2fa'
import s from './GoogleAccessCodes.module.scss'

export const GoogleAccessCodes: React.FC = () => {
  const { t } = useTranslation('security')
  const [select, dispatch] = useRedux()
  const { fetching, backupCodes } = select(selectGoogle2fa)

  const handleClose = () => dispatch(reset())

  const handleDone = () => {
    dispatch(setStep('success'))
  }

  return (
    <ModalBase onClose={handleClose}>
      <Header
        title={t('2fa.title')}
        description={
          <>
            <span className={s.step}> {t('common:step')} 3/3</span>:{' '}
            {t('2fa.access-codes-title')}
          </>
        }
      />
      <div className={s.info}>{t('2fa.access-codes-info')}</div>

      <div className={s.accessCodesContainer}>
        {backupCodes.map((x) => (
          <div className={s.accessCode} key={x}>
            {x}
          </div>
        ))}
      </div>

      <Button
        theme="primary"
        label={t('common:done')}
        width="100%"
        loading={fetching}
        onClick={handleDone}
        autofocus
      />
    </ModalBase>
  )
}
