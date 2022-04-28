import cn from 'classnames'
import { numberFormat } from '@/utils/numberFormat'
import { Icon } from '@/components/Icon/Icon'
import s from './CurrencyChip.module.scss'

type TCurrencyChip = {
  hasBigger: boolean
  amount: number
}

export const CurrencyChip: React.FC<TCurrencyChip> = ({ hasBigger = false, amount }) => (
  <div className={cn(s.container, { [s.bigger]: hasBigger })}>
    <div className={s.icon}>
      <Icon id="caret-down" fill={hasBigger ? 'green' : 'red'} />
    </div>
    <span className={s.amount}>{numberFormat(amount, 2)}</span>
    <span className={s.procent}>%</span>
  </div>
)
