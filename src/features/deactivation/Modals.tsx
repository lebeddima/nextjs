import useTranslation from 'next-translate/useTranslation'
import { useRedux } from '@/hooks/useRedux'
import { ModalMessage } from '@/components/modals/ModalMessage'
import { selectDeactivate, setStep } from './store/deactivate'
import { Password } from './containers/Password'
import { Sms } from './containers/Sms'

export const Modals: React.FC = () => {
  const { t } = useTranslation('deactivation')
  const [select, dispatch] = useRedux()
  const { step } = select(selectDeactivate)

  const handleClose = () => dispatch(setStep(null))

  switch (step) {
    case 'password':
      return <Password />
    case 'sms':
      return <Sms />
    case 'success':
      return (
        <ModalMessage
          status="success"
          title={t('success.title')}
          description={t('success.description')}
          buttonLabel={t('common:done')}
          onClose={handleClose}
          onClickButton={handleClose}
        />
      )
    default:
      return <></>
  }
}
