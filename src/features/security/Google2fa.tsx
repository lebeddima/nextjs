import { useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { ModalMessage } from '@/components/modals/ModalMessage'
import { useRedux } from '@/hooks/useRedux'
import { GoogleActivation } from './containers/GoogleActivation'
import { selectGoogle2fa, setStep, reset } from './store/google2fa'
import { GoogleCode } from './containers/GoogleCode'
import { GoogleAccessCodes } from './containers/GoogleAccessCodes'

export const Google2fa: React.FC = () => {
  const { t } = useTranslation('security')
  const [select, dispatch] = useRedux()
  const { step } = select(selectGoogle2fa)

  useEffect(
    () => () => {
      dispatch(reset())
    },
    []
  )

  const handleCloseSuccess = () => dispatch(setStep(null))

  switch (step) {
    case 'activate':
      return <GoogleActivation />
    case 'code':
      return <GoogleCode variant="activate" />
    case 'accessCodes':
      return <GoogleAccessCodes />
    case 'disable':
      return <GoogleCode variant="disable" />
    case 'success':
      return (
        <ModalMessage
          status="success"
          title={t('2fa.success.title')}
          description={t('2fa.success.description')}
          onClose={handleCloseSuccess}
          onClickButton={handleCloseSuccess}
        />
      )
    case 'disableSuccess':
      return (
        <ModalMessage
          status="success"
          title={t('2fa.disable-success.title')}
          description={t('2fa.disable-success.description')}
          onClose={handleCloseSuccess}
          onClickButton={handleCloseSuccess}
        />
      )
    default:
      return <></>
  }
}
