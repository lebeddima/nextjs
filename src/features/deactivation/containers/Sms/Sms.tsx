import useTranslation from 'next-translate/useTranslation'
import { useRedux } from '@/hooks/useRedux'
import { ModalBase } from '@/components/modals/ModalBase'
import { SendCode } from '@/components/SendCode'
import { SEND_PHONE_CODE_TIMEOUT } from '@/constants/timeouts'
import { selectDeactivate, setError, setStep } from '../../store/deactivate'

export const Sms: React.FC = () => {
  const { t } = useTranslation('auth')
  const [select, dispatch] = useRedux()
  const { error, fetching, fetchingResend } = select(selectDeactivate)

  const handlClose = () => {
    dispatch(setStep(null))
  }

  const handleClearError = () => {
    dispatch(setError(''))
  }

  const handlResend = () => {
    // dispatch(sendSmsAsync())
  }

  const onSubmit = () => {
    dispatch(setStep('success'))
    // dispatch(sendSmsCodeAsync(code))
  }

  return (
    <ModalBase onClose={handlClose}>
      <SendCode
        icon="phone"
        title={t('verify-phone.title')}
        description={t('verify-phone.description')}
        clearError={handleClearError}
        onClickEgain={handlResend}
        onSubmit={onSubmit}
        error={error}
        sendEgainTimeout={SEND_PHONE_CODE_TIMEOUT}
        fetchingResend={fetchingResend}
        loading={fetching}
      />
    </ModalBase>
  )
}
