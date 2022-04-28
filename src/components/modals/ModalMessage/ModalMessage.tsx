import { Header, THeader } from '@/components/modals/Header'
import { Button } from '@/components/buttons/Button'
import useTranslation from 'next-translate/useTranslation'
import { ModalBase } from '../ModalBase'
import s from './ModalMessage.module.scss'

type TModalMessage = {
  buttonLabel?: string
  onClose?: () => void
  onClickButton?: () => void
} & THeader

export const ModalMessage: React.FC<TModalMessage> = ({
  onClose,
  onClickButton = onClose,
  buttonLabel,
  ...props
}) => {
  const { t } = useTranslation('common')

  return (
    <ModalBase onClose={onClose} style={{ zIndex: 9999 }}>
      <Header {...props} />
      <div className={s.button}>
        <Button
          theme="primary"
          type="submit"
          label={buttonLabel || t('close')}
          width="100%"
          classButton={s.submit}
          onClick={onClickButton}
          autofocus
        />
      </div>
    </ModalBase>
  )
}
