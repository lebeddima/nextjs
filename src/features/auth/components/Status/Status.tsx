import { Card } from '@/components/Card'
import { Header } from '@/components/modals/Header'
import { Button, TButton } from '@/components/buttons/Button'
import useTranslation from 'next-translate/useTranslation'
import s from './Status.module.scss'

type TMessageStatus = {
  IconEl?: React.ReactNode | false
  title?: string
  buttonLabel?: React.ReactNode | string
  onClose?: () => void
  onClickButton?: () => void
  description?: React.ReactNode | string
  status?: 'success' | 'error'
  additionalContent?: React.ReactNode
  btnTheme?: TButton['theme']
}

export const Status: React.FC<TMessageStatus> = ({
  IconEl,
  title,
  buttonLabel,
  onClose,
  onClickButton = onClose,
  description,
  status,
  additionalContent,
  btnTheme = 'primary'
}) => {
  const { t } = useTranslation('common')

  return (
    <Card theme="small" maxWidth="485px" onClose={onClose}>
      <Header title={title} description={description} status={status} IconEl={IconEl} />
      {additionalContent && (
        <div className={s.additionalContent}>{additionalContent}</div>
      )}
      <div className={s.button}>
        <Button
          theme={btnTheme}
          type="submit"
          label={buttonLabel || t('close')}
          width="100%"
          classButton={s.submit}
          onClick={onClickButton}
          autofocus
        />
      </div>
    </Card>
  )
}
