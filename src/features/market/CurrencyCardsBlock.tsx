import { useRedux } from '@/hooks/useRedux'
import { CurrencyCard } from './components/CurrencyCard'
import s from './styles/CurrencyCardsBlock.module.scss'
import { selectCurrencyData } from './store/market'

export const CurrencyCardsBlock: React.FC = () => {
  const [select] = useRedux()
  const currencyData = select(selectCurrencyData)

  return (
    <div className={s.container}>
      {currencyData.map((item) => (
        <CurrencyCard key={item.name} data={item} />
      ))}
    </div>
  )
}
