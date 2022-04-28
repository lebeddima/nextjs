import { useEffect } from 'react'
import { useRedux } from '@/hooks/useRedux'
import { SendEgain } from '@/components/SendEgain'
import useTranslation from 'next-translate/useTranslation'
import { SEND_EMAIL_CODE_TIMEOUT } from '@/constants/timeouts'
import { Status } from './components/Status'
import { RecoveryPassword as RecoveryPasswordContainer } from './containers/RecoveryPassword'
import {
  selectRecoveryPass,
  reset,
  sendEmailAgain,
  setStep
} from './store/recovery-password'

export const RecoveryPassword: React.FC = () => {
  const { t } = useTranslation('auth')
  const [select, dispatch] = useRedux()
  const {
    step: { step, email },
    fetching
  } = select(selectRecoveryPass)

  useEffect(
    () => () => {
      dispatch(reset())
    },
    []
  )

  const handlResend = () => {
    dispatch(sendEmailAgain())
  }

  switch (step) {
    case null:
      return <RecoveryPasswordContainer />
    case 'success':
      return (
        <Status
          status="success"
          btnTheme="secondary-small"
          description={t('password-recovery-sent.description', { var: email })}
          buttonLabel={t('common:go-back')}
          onClickButton={() => dispatch(setStep({ step: null, email: '' }))}
          additionalContent={
            <SendEgain
              onClick={handlResend}
              labelButton={t('common:send-again')}
              time={SEND_EMAIL_CODE_TIMEOUT}
              fetching={fetching}
              underline={false}
            />
          }
        />
      )
    default:
      return <></>
  }
}
