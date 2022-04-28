import useTranslation from 'next-translate/useTranslation'
import { Card } from '@/components/Card'
import { useRedux } from '@/hooks/useRedux'
import { ModalMessage } from '@/components/modals/ModalMessage'
import { selectSupport, setModalOpen } from './store/support'
import { SupportForm } from './containers/SupportForm'
import s from './styles/Support.module.scss'

export const Support: React.FC = () => {
  const { t } = useTranslation('support')
  const [select, dispatch] = useRedux()
  const { modalOpen } = select(selectSupport)

  const handleCloseModal = () => {
    dispatch(setModalOpen(false))
  }

  return (
    <>
      <h4 className={s.title}>{t('header')}</h4>
      <p className={s.text}>{t('headerText')}</p>

      <Card theme="big" maxWidth="1158">
        <SupportForm />
      </Card>

      {modalOpen && (
        <ModalMessage
          status="success"
          title={t('modal.title')}
          description={t('modal.description')}
          onClose={handleCloseModal}
          onClickButton={handleCloseModal}
        />
      )}
    </>
  )
}
