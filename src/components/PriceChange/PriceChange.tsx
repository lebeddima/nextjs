import { numberFormat } from '@/utils/numberFormat'
import cn from 'classnames'
import s from './PriceChange.module.scss'

type PriceChange = {
  theme?: 'default'
  value: number
}

export const PriceChange: React.FC<PriceChange> = ({ theme = 'default', value }) => {
  const hasSign = theme === 'default'
  const hasUp = value >= 0

  return (
    <div className={cn(s.container, s[theme], { [s.up]: hasUp })}>
      {hasSign && <span className={s.sign}>{value > 0 ? '+' : ''}</span>}
      <span className={s.value}>{numberFormat(value, 2)}</span>
      <span className={s.procent}>%</span>
    </div>
  )
}
