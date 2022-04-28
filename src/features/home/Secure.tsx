import { IconWrapper } from '@/components/IconWrapper'
import { Icon } from '@/components/Icon'
import useTranslation from 'next-translate/useTranslation'
import s from './styles/Secure.module.scss'

export const Secure: React.FC = () => {
  const { t } = useTranslation('home')
  return (
    <section className={s.container}>
      <div className={s.textBlock}>
        <h3 className={s.header}>
          <span>{t('secure.title.line_1')}</span>
          <span>{t('secure.title.line_2')}</span>
          <span>{t('secure.title.line_3')}</span>
        </h3>
        <p className={s.description}>{t('secure.title-desc')}</p>
      </div>

      <div className={s.cardBlock_left}>
        <div className={s.cardCont_1}>
          <div className={s.card}>
            <IconWrapper width={56} colorTheme="white">
              <Icon id="circle-wavy-check" size="big" />
            </IconWrapper>
            <p className={s.cardHeader}>{t('secure.industry-card.title')}</p>
            <p className={s.cardDesc}>{t('secure.industry-card.desc')}</p>
          </div>
          <div className={s.ripple} />
        </div>
      </div>

      <div className={s.cardBlock_right}>
        <div className={s.cardCont_2}>
          <div className={s.card}>
            <IconWrapper width={56} colorTheme="white">
              <Icon id="fingerprint" size="big" />
            </IconWrapper>
            <p className={s.cardHeader}>{t('secure.insurance-card.title')}</p>
            <p className={s.cardDesc}>{t('secure.insurance-card.desc')}</p>
          </div>
          <div className={s.ripple} />
        </div>
        <div className={s.cardCont_3}>
          <div className={s.card}>
            <IconWrapper width={56} colorTheme="white">
              <Icon id="security" size="big" colorStroke="malibu" />
            </IconWrapper>
            <p className={s.cardHeader}>{t('secure.secure-card.title')}</p>
            <p className={s.cardDesc}>{t('secure.secure-card.desc')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
