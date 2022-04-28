import Image from 'next/image'
import { CurrencyChip } from '@/components/CurrencyChip/CurrencyChip'
import s from './CurrencyCard.module.scss'
import btc from '../../../../../public/img/btc-large.png'

interface ICurrencyCard {
  data: {
    price: number
    hasBigger: boolean
    name: string
    percent: number
  }
}

export const CurrencyCard: React.FC<ICurrencyCard> = ({ data }) => {
  const { price, hasBigger, name, percent } = data

  return (
    <div className={s.container}>
      <div className={s.card_icon}>
        <Image src={btc.src} width={72} height={72} />
      </div>
      <div className={s.data}>
        <div className={s.data_top}>
          <div className={s.currency_name}>{name}</div>
          <CurrencyChip hasBigger={hasBigger} amount={percent} />
        </div>
        <div className={s.data_bottom}>{`$${price}`}</div>
      </div>
    </div>
  )
}
