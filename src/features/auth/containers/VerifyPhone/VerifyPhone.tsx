import useTranslation from 'next-translate/useTranslation'
import { useRedux } from '@/hooks/useRedux'
import { Card } from '@/components/Card'
import { SendCode } from '@/components/SendCode'
import { SEND_PHONE_CODE_TIMEOUT } from '@/constants/timeouts'
import {
  selectSignIn,
  setError,
  setStep,
  sendSmsAsync,
  sendSmsCodeAsync
} from '../../store/sign-in'

export const VerifyPhone: React.FC = () => {
  const { t } = useTranslation('auth')
  const [select, dispatch] = useRedux()
  const { error, fetching, fetchingResend } = select(selectSignIn)

  const handelClose = () => {
    dispatch(setStep(null))
  }

  const handleClearError = () => {
    dispatch(setError(''))
  }

  const handlResend = () => {
    dispatch(sendSmsAsync())
  }

  const onSubmit = (code: string) => {
    dispatch(sendSmsCodeAsync(code))
  }

  return (
    <Card theme="small" maxWidth="485px" onClose={handelClose}>
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
    </Card>
  )
}
