import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import pc from '@/images/pc.png'
import mobile from '@/images/mobile.png'
import tablet from '@/images/tablet.png'
import s from './styles/Start.module.scss'
import { StartForm } from './containers/StartForm'

export const Start: React.FC = () => {
  const { t } = useTranslation('home')

  return (
    <section className={s.container}>
      <div className={s.content}>
        <h1>{t('start.title')}</h1>
        <h2>{t('start.title-desc')}</h2>
        <StartForm />
        <div className={s.devices}>
          <div className={s.mobile}>
            <Image alt="mobile.png" src={mobile.src} width={131} height={230} priority />
          </div>
          <Image
            className={s.pc}
            alt="pc.png"
            src={pc.src}
            width={658}
            height={405}
            quality={90}
            priority
          />
          <div className={s.tablet}>
            <Image alt="tablet.png" src={tablet.src} width={305} height={293} priority />
          </div>
        </div>
        <div className={s.startDecore} />
      </div>
    </section>
  )
}
