import { useEffect } from 'react'
import { Button } from '@/components/buttons/Button'
import { Card } from '@/components/Card'
import { Icon } from '@/components/Icon'
import { useRedux } from '@/hooks/useRedux'
import { IconWrapper } from '@/components/IconWrapper'
import useTranslation from 'next-translate/useTranslation'
import { reset, setStep } from './store/deactivate'
import s from './styles/Deactivation.module.scss'

export const Deactivation: React.FC = () => {
  const { t } = useTranslation('deactivation')
  const [, dispatch] = useRedux()

  useEffect(
    () => () => {
      dispatch(reset())
    },
    []
  )

  const handleDeactivationClick = () => {
    dispatch(setStep('password'))
  }

  return (
    <>
      <div className={s.description}> {t('description')}</div>
      <Card theme="small">
        <div className={s.cardContainer}>
          <IconWrapper width={56} shape="circle" colorTheme="gradient">
            <Icon size="mid-big" id="user" colorStroke="white" />
          </IconWrapper>

          <div>
            <div className={s.accountTitle}>{t('card.title')}</div>
            <div className={s.accountStatus}>{t('status.active')}</div>
          </div>

          <Button
            theme="text-red"
            underline
            label={t('deactivate')}
            onClick={handleDeactivationClick}
          />
        </div>
      </Card>
    </>
  )
}
