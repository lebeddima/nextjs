import { IDevice } from '@/types/device'
import { DATE_FORMATS, TIME_FORMATS } from '@/constants/date'
import useTranslation from 'next-translate/useTranslation'
import { format } from 'date-fns'
import cn from 'classnames'
import s from './styles/Devices.module.scss'
import { Card } from './components/Card'

const fakeDevices: IDevice[] = [
  {
    name: 'Safari V15.0.1 (Mac OS)',
    id: 1,
    version: '0.87469715',
    date: new Date(2021, 11, 23, 14, 28, 2),
    ip: '172.184.157.104'
  },
  {
    name: 'Safari V15.0.1 (Mac OS)',
    id: 2,
    version: '0.87469715',
    date: new Date(2021, 11, 23, 14, 28, 2),
    ip: '172.184.157.104'
  },
  {
    name: 'Safari V15.0.1 (Mac OS)',
    id: 3,
    version: '0.87469715',
    date: new Date(2021, 11, 23, 14, 28, 2),
    ip: '172.184.157.104'
  },
  {
    name: 'Safari V15.0.1 (Mac OS)',
    id: 4,
    version: '0.87469715',
    date: new Date(2021, 11, 23, 14, 28, 2),
    ip: '172.184.157.104'
  }
]

export const Devices: React.FC = () => {
  const { lang, t } = useTranslation()

  return (
    <Card title={t('common:devices')}>
      <div className={s.container}>
        {fakeDevices.map((x) => (
          <div key={x.id} className={s.item}>
            <div className={s.group}>
              <div className={s.title}>{x.name}</div>
              <div className={s.subTitle}>{x.version}</div>
            </div>
            <div className={cn(s.group, s.right)}>
              <div className={s.title}>{x.ip}</div>
              <div className={s.subTitle}>
                {format(x.date, DATE_FORMATS[lang])}; {format(x.date, TIME_FORMATS[lang])}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
