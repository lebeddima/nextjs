import useTranslation from 'next-translate/useTranslation'
import { useRedux } from '@/hooks/useRedux'
import { ModalBase } from '@/components/modals/ModalBase'
import { SendCode } from '@/components/SendCode'
import { SEND_PHONE_CODE_TIMEOUT } from '@/constants/timeouts'
import {
  selectChangeEmail,
  setStep,
  setError,
  getOldCode,
  sendNewCode,
  sendOldCode,
  getNewCode
} from '../../store/change-email'

type TChangeEmailConfirmProps = {
  variant: 'old' | 'new'
}

export const ChangeEmailConfirm: React.FC<TChangeEmailConfirmProps> = ({ variant }) => {
  const { t } = useTranslation('security')
  const [select, dispatch] = useRedux()
  const { fetching, error, fetchingResend } = select(selectChangeEmail)

  const handleClose = () => {
    dispatch(setStep(null))
  }

  const handleClearError = () => {
    dispatch(setError(''))
  }

  const handleResend = () => {
    if (variant === 'old') {
      dispatch(getOldCode())
      return
    }
    dispatch(getNewCode())
  }

  const onSubmit = (code: string) => {
    if (variant === 'old') {
      dispatch(sendOldCode(code))
      return
    }
    dispatch(sendNewCode(code))
  }

  return (
    <ModalBase onClose={handleClose}>
      <SendCode
        icon="email"
        title={t('change-email.title-email')}
        description={t('change-email.desc-confirm', { variant })}
        clearError={handleClearError}
        onSubmit={onSubmit}
        onClickEgain={handleResend}
        error={error}
        sendEgainTimeout={SEND_PHONE_CODE_TIMEOUT}
        fetchingResend={fetchingResend}
        loading={fetching}
      />
    </ModalBase>
  )
}
