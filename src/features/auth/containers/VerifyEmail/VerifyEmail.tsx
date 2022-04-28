import useTranslation from 'next-translate/useTranslation'
import { useRedux } from '@/hooks/useRedux'
import { Card } from '@/components/Card'
import { SendCode } from '@/components/SendCode'
import { SEND_EMAIL_CODE_TIMEOUT } from '@/constants/timeouts'
import {
  selectSignIn,
  setError,
  setStep,
  sendEmailAsync,
  sendEmailCodeAsync
} from '../../store/sign-in'

export const VerifyEmail: React.FC = () => {
  const { t } = useTranslation('auth')
  const [select, dispatch] = useRedux()
  const { error, fetching, fetchingResend } = select(selectSignIn)

  const handlClose = () => {
    dispatch(setStep(null))
  }

  const handleClearError = () => {
    dispatch(setError(''))
  }

  const handlResend = () => {
    dispatch(sendEmailAsync())
  }

  const onSubmit = (code: string) => {
    dispatch(sendEmailCodeAsync(code))
  }

  return (
    <Card theme="small" maxWidth="485px" onClose={handlClose}>
      <SendCode
        icon="email"
        title={t('verify-email.title')}
        description={t('verify-email.description')}
        clearError={handleClearError}
        onClickEgain={handlResend}
        onSubmit={onSubmit}
        error={error}
        sendEgainTimeout={SEND_EMAIL_CODE_TIMEOUT}
        fetchingResend={fetchingResend}
        loading={fetching}
      />
    </Card>
  )
}
