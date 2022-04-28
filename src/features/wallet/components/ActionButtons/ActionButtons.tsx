import { Button } from '@/components/buttons/Button'
import useTranslation from 'next-translate/useTranslation'
import s from './ActionButtons.module.scss'

type TActionButtons = {
  linkWith: string
  linkDepos: string
  disabledWith: boolean
  disabledDepos: boolean
}

export const ActionButtons: React.FC<TActionButtons> = ({
  linkWith,
  linkDepos,
  disabledWith,
  disabledDepos
}) => {
  const { t } = useTranslation('wallet')

  return (
    <div className={s.container}>
      <Button
        theme="secondary"
        label={t('common:withdraw')}
        shape="small"
        linkTo={linkWith}
        disabled={disabledWith}
      />
      <Button
        theme="primary"
        label={t('common:deposit')}
        shape="small"
        linkTo={linkDepos}
        disabled={disabledDepos}
      />
    </div>
  )
}
