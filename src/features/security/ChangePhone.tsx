import { useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { ModalMessage } from '@/components/modals/ModalMessage'
import { useRedux } from '@/hooks/useRedux'
import { FormChangePhone } from './containers/FormChangePhone/FormChangePhone'
import { selectChangePhone, setStep, reset } from './store/change-phone'
import { Sms } from './containers/Sms'

export const ChangePhone: React.FC = () => {
  const { t } = useTranslation('security')
  const [select, dispatch] = useRedux()
  const { step } = select(selectChangePhone)

  useEffect(
    () => () => {
      dispatch(reset())
    },
    []
  )

  const handleClosePhone = () => dispatch(setStep(null))

  switch (step) {
    case 'prev-confirm': {
      return <Sms variant="prev" />
    }
    case 'new-phone':
      return <FormChangePhone />
    case 'new-confirm': {
      return <Sms variant="new" />
    }
    case 'success':
      return (
        <ModalMessage
          status="success"
          title={t('change-phone.title-success')}
          description={t('change-phone.desc-success')}
          onClose={handleClosePhone}
          onClickButton={handleClosePhone}
        />
      )
    default:
      return <></>
  }
}
