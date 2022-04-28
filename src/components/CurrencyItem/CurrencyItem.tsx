import Image from 'next/image'
import cn from 'classnames'
import { IconWrapper } from '@/components/IconWrapper'
import s from './CurrencyItem.module.scss'

type TFont = 'button-big' | 'text-big'

interface ICurrencyItem {
  img: string
  text?: string
  additionalText?: string
  alt: string
  color?: string
  imgWidth?: number
  textStyle?: TFont
  addTextStyle?: TFont
}

export const CurrencyItem: React.FC<ICurrencyItem> = ({
  img,
  text,
  additionalText,
  alt,
  color,
  imgWidth = 32,
  textStyle = 'button-big',
  addTextStyle = 'text-big'
}) => (
  <div className={s.container}>
    <IconWrapper width={32} color={color} shape="circle">
      <Image src={img} width={imgWidth} height={imgWidth} alt={alt} />
    </IconWrapper>
    {text && <span className={cn([s[`main_text_${textStyle}`]])}>{text}</span>}
    {additionalText && (
      <span className={cn([s[`add_text_${addTextStyle}`]])}>{additionalText}</span>
    )}
  </div>
)
