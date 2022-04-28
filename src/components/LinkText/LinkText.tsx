import cn from 'classnames'
import { Button } from '@/components/buttons/Button'
import s from './LinkText.module.scss'

type TLinkText = {
  text: string
  buttonText?: string
  link?: string
  center?: boolean
  onClick?: () => void
}

export const LinkText: React.FC<TLinkText> = ({
  text,
  buttonText,
  link,
  center,
  onClick
}) => (
  <div className={cn(s.container, { [s.center]: center })}>
    <span className={s.text}>{text}</span>
    <Button
      theme="text-blue"
      type="button"
      label={buttonText}
      font="text-medium"
      linkTo={link}
      onClick={onClick}
    />
  </div>
)
