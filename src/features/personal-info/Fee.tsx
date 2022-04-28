import { Select } from '@/components/inputs/selects/Select'
import cn from 'classnames'
import useTranslation from 'next-translate/useTranslation'
import { Card } from './components/Card'
import s from './styles/Fee.module.scss'

const fakeOptions = [
  {
    label: 'BTC / USDT',
    value: 'BTC / USDT'
  },
  {
    label: 'UAH / USD',
    value: 'UAH / USD'
  },
  {
    label: 'BTC / UAH',
    value: 'BTC / UAH'
  }
]

export const Fee: React.FC = () => {
  const { t } = useTranslation('common')

  return (
    <Card
      title={t('fee')}
      navigation={
        <Select
          name="feeSelect"
          border={false}
          isSearchable={false}
          defaultValue={fakeOptions[0]}
          options={fakeOptions}
        />
      }
    >
      <div className={s.container}>
        <div className={s.infoContainer}>
          <div className={cn(s.item, s.horizontal)}>
            <div className={s.title}>{t('maker')}</div>
            <div>0%</div>
          </div>
          <div className={cn(s.item, s.horizontal)}>
            <div className={s.title}>{t('taker')}</div>
            <div>0%</div>
          </div>
        </div>
        <div className={s.item}>
          <div className={s.title}>{t('personal-info:fee.monthlyVolume')}</div>
          <div className={s.text}>{'<1,000,000,000 USDT'}</div>
        </div>
        <div className={s.item}>
          <div className={s.title}>{t('personal-info:fee.withdrawalLimit')}</div>
          <div className={s.text}>50,000,000 USDT</div>
        </div>
      </div>
    </Card>
  )
}
