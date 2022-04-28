import { useRedux } from '@/hooks/useRedux'
import useTranslation from 'next-translate/useTranslation'
import { Card } from '@/components/Card'
import { SendCode } from '@/components/SendCode'
import { SEND_PHONE_CODE_TIMEOUT } from '@/constants/timeouts'
import {
  selectSignUp,
  setError,
  setStep,
  sendSmsAsync,
  sendSmsCode
} from '../../store/sign-up'

export const ConfirmPhone: React.FC = () => {
  const { t } = useTranslation('auth')
  const [select, dispatch] = useRedux()
  const { error, fetching, fetchingResend } = select(selectSignUp)

  const handlClose = () => {
    dispatch(setStep(null))
  }

  const handleClearError = () => {
    dispatch(setError(''))
  }

  const handlResend = () => {
    dispatch(sendSmsAsync())
  }

  const onSubmit = (code: string) => {
    dispatch(sendSmsCode(code))
  }

  return (
    <Card theme="small" maxWidth="485px" onClose={handlClose}>
      <SendCode
        icon="phone"
        title={t('confirm-phone.title')}
        description={t('confirm-phone.description')}
        clearError={handleClearError}
        onClickEgain={handlResend}
        onClickLink={handlClose}
        onSubmit={onSubmit}
        error={error}
        sendEgainTimeout={SEND_PHONE_CODE_TIMEOUT}
        fetchingResend={fetchingResend}
        loading={fetching}
        linkText={t('confirm-email.link-text')}
        linkButtonText={t('confirm-email.link-button')}
      />
    </Card>
  )
}
