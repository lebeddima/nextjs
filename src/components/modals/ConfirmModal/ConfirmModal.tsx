import { Button } from '@/components/buttons/Button'
import { Header } from '../Header/Header'
import s from './ConfirmModal.module.scss'
import { ModalBase } from '../ModalBase'

type TConfirmModalProps = {
  onClose?: () => void
  onConfirm?: () => void
  onCancel?: () => void
  title?: string
  description?: string
  labelConfirm?: string
  labelCancel?: string
  fetching?: boolean
  content?: React.ReactNode
}

export const ConfirmModal: React.FC<TConfirmModalProps> = ({
  onClose,
  onConfirm,
  onCancel,
  title,
  labelConfirm,
  labelCancel,
  description,
  fetching,
  content
}) => (
  <ModalBase onClose={onClose}>
    <Header title={title} description={description} />
    {content}
    <div className={s.button}>
      {onCancel && (
        <Button
          theme="secondary"
          label={labelCancel}
          onClick={onCancel}
          disabled={fetching}
        />
      )}

      <Button
        theme="primary"
        label={labelConfirm}
        onClick={onConfirm}
        disabled={fetching}
      />
    </div>
  </ModalBase>
)
