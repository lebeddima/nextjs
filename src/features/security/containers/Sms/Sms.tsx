import useTranslation from 'next-translate/useTranslation'
import { useRedux } from '@/hooks/useRedux'
import { ModalBase } from '@/components/modals/ModalBase'
import { SendCode } from '@/components/SendCode'
import { SEND_PHONE_CODE_TIMEOUT } from '@/constants/timeouts'
import {
  selectChangePhone,
  checkOldCode,
  setError,
  checkNewCode,
  sendOldCode,
  reset,
  resendCodeForNewPhone
} from '../../store/change-phone'

interface IFormChangePhoneProps {
  variant: 'prev' | 'new'
}

export const Sms: React.FC<IFormChangePhoneProps> = ({ variant }) => {
  const { t } = useTranslation('auth')
  const [select, dispatch] = useRedux()
  const { fetching, error, fetchingResend } = select(selectChangePhone)

  const handleClose = () => {
    dispatch(reset())
  }

  const handleClearError = () => {
    dispatch(setError(''))
  }

  const handleResend = () => {
    if (variant === 'prev') {
      dispatch(sendOldCode({ hasResend: true }))
      return
    }
    dispatch(resendCodeForNewPhone())
  }

  const onSubmit = (code: string) => {
    if (variant === 'prev') {
      dispatch(checkOldCode(code))
      return
    }
    dispatch(checkNewCode(code))
  }

  return (
    <ModalBase onClose={handleClose}>
      <SendCode
        icon="phone"
        title={t('verify-phone.title')}
        description={t('verify-phone.description')}
        clearError={handleClearError}
        onClickEgain={handleResend}
        onSubmit={onSubmit}
        error={error}
        sendEgainTimeout={SEND_PHONE_CODE_TIMEOUT}
        fetchingResend={fetchingResend}
        loading={fetching}
      />
    </ModalBase>
  )
}
