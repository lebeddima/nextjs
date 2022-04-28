import { IconWrapper } from '@/components/IconWrapper'
import { Icon, TIconProps } from '@/components/Icon'
import cn from 'classnames'
import useTranslation from 'next-translate/useTranslation'
import s from './styles/Steps.module.scss'

export const Steps: React.FC = () => {
  const { t } = useTranslation('home')

  const renderIcon = (id: TIconProps['id']) => (
    <IconWrapper width={90} colorTheme="white" className={s.circle}>
      <IconWrapper width={76} className={s.circleInner}>
        <Icon id={id} size="big" colorStroke="white" />
      </IconWrapper>
    </IconWrapper>
  )

  return (
    <section className={s.container}>
      <div className={s.header}>
        <h3>
          {t('steps.title.part_1')}
          <br />
          {t('steps.title.part_2')}
        </h3>
        <p>{t('steps.title-desc')}</p>
      </div>
      <div className={s.steps}>
        <div className={cn(s.stepsItem, s.stepsItem_1)}>
          {renderIcon('user-plus')}
          <div className={s.stepText}>{t('steps.step_1')}</div>
          <div className={s.ripple} />
        </div>
        <div className={s.stepsLine} />
        <div className={cn(s.stepsItem, s.stepsItem_2)}>
          {renderIcon('card-holder')}
          <div className={s.stepText}>{t('steps.step_2')}</div>
          <div className={s.ripple} />
        </div>
        <div className={s.stepsLine} />
        <div className={cn(s.stepsItem, s.stepsItem_3)}>
          {renderIcon('money')}
          <div className={s.stepText}>{t('steps.step_3')}</div>
          <div className={s.ripple} />
        </div>
      </div>
    </section>
  )
}
