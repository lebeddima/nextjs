import { IconWrapper } from '@/components/IconWrapper'
import { PriceChange } from '@/components/PriceChange'
import btcImg from '@/images/currencies/BTC.png'
import s from './styles/Commercial.module.scss'

export const Commercial: React.FC = () => (
  <section className={s.container}>
    <div className={s.item}>
      <div className={s.commercialCard} />
      <div className={s.currencyCard}>
        <IconWrapper width={48} shape="circle" colorTheme="white">
          <IconWrapper imgLink={btcImg.src} width={32} shape="circle" color="#F7931A" />
        </IconWrapper>
        <div className={s.currencyCard_info}>
          <div className={s.currencyCard_top}>BTC/BUSD</div>
          <div className={s.currencyCard_bottom}>
            <div className={s.currencyCard_price}>$1.80</div>
            <PriceChange value={3.3} />
          </div>
        </div>
      </div>
    </div>
    <div className={s.item}>
      <div className={s.commercialCard} />
      <div className={s.currencyCard}>
        <IconWrapper width={48} shape="circle" colorTheme="white">
          <IconWrapper imgLink={btcImg.src} width={32} shape="circle" color="#F7931A" />
        </IconWrapper>
        <div className={s.currencyCard_info}>
          <div className={s.currencyCard_top}>BTC/BUSD</div>
          <div className={s.currencyCard_bottom}>
            <div className={s.currencyCard_price}>$1.80</div>
            <PriceChange value={3.39} />
          </div>
        </div>
      </div>
    </div>
    <div className={s.item}>
      <div className={s.commercialCard} />
      <div className={s.currencyCard}>
        <IconWrapper width={48} shape="circle" colorTheme="white">
          <IconWrapper imgLink={btcImg.src} width={32} shape="circle" color="#F7931A" />
        </IconWrapper>
        <div className={s.currencyCard_info}>
          <div className={s.currencyCard_top}>BTC/BUSD</div>
          <div className={s.currencyCard_bottom}>
            <div className={s.currencyCard_price}>$1.80</div>
            <PriceChange value={-3.39} />
          </div>
        </div>
      </div>
    </div>
    <div className={s.item}>
      <div className={s.commercialCard} />
      <div className={s.currencyCard}>
        <IconWrapper width={48} shape="circle" colorTheme="white">
          <IconWrapper imgLink={btcImg.src} width={32} shape="circle" color="#F7931A" />
        </IconWrapper>
        <div className={s.currencyCard_info}>
          <div className={s.currencyCard_top}>BTC/BUSD</div>
          <div className={s.currencyCard_bottom}>
            <div className={s.currencyCard_price}>$1.80</div>
            <PriceChange value={0} />
          </div>
        </div>
      </div>
    </div>
  </section>
)
