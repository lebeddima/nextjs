import { IconWrapper } from '@/components/IconWrapper'
import { Button } from '@/components/buttons/Button'
import cn from 'classnames'
import s from './SecurityItem.module.scss'

type SecurityItem = {
  title: string
  icon: React.ReactNode
  subtitle?: string
  subTitleColor?: 'default' | 'red' | 'green'
  buttonLabel?: string
  action?: React.ReactNode
  onClickButton?: () => void
}

export const SecurityItem: React.FC<SecurityItem> = ({
  onClickButton,
  buttonLabel,
  title,
  subtitle,
  icon,
  action,
  subTitleColor = 'default'
}) => (
  <div className={s.container}>
    <div className={s.item_left}>
      <IconWrapper width={56} shape="circle" colorTheme="gradient">
        {icon}
      </IconWrapper>
      <div className={s.item_info}>
        <p className={s.item_title}>{title}</p>
        <p className={cn(s.item_subtitle, s[`subTitleColor_${subTitleColor}`])}>
          {subtitle}
        </p>
      </div>
    </div>

    {!onClickButton && action}
    {onClickButton && (
      <Button theme="text-blue" label={buttonLabel} onClick={onClickButton} underline />
    )}
  </div>
)
