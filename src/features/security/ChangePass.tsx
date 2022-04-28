import { useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { ModalMessage } from '@/components/modals/ModalMessage'
import { useRedux } from '@/hooks/useRedux'
import { FormChangePass } from './containers/FormChangePass'
import { selectChangePass, setStep, reset } from './store/change-pass'

export const ChangePass: React.FC = () => {
  const { t } = useTranslation('security')
  const [select, dispatch] = useRedux()
  const { step } = select(selectChangePass)

  useEffect(
    () => () => {
      dispatch(reset())
    },
    []
  )

  const handleClosePass = () => dispatch(setStep(null))

  switch (step) {
    case 'change-pass':
      return <FormChangePass />
    case 'success':
      return (
        <ModalMessage
          status="success"
          title={t('change-pass.title-success')}
          description={t('change-pass.desc-success')}
          onClose={handleClosePass}
          onClickButton={handleClosePass}
        />
      )
    default:
      return <></>
  }
}
