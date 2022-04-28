import { ModalMessage } from '@/components/modals/ModalMessage'
import { useRedux } from '@/hooks/useRedux'
import { setModalError, selectError } from '@/store/error'
import { useCallback } from 'react'

export const ModalError: React.FC = () => {
  const [select, dispatch] = useRedux()
  const { modalError } = select(selectError)

  const onClose = useCallback(() => {
    dispatch(setModalError(''))
  }, [])

  if (!modalError) return null

  return (
    <ModalMessage
      onClickButton={onClose}
      description={modalError}
      onClose={onClose}
      status="error"
    />
  )
}
