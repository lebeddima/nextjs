import { IconWrapper } from '@/components/IconWrapper'
import { Icon } from '@/components/Icon'
import useTranslation from 'next-translate/useTranslation'
import { CSSProperties } from 'react'
import s from './Header.module.scss'

export type THeader = {
  IconEl?: React.ReactNode | false
  title?: string
  description?: React.ReactNode | string
  status?: 'success' | 'error'
  stylesTitle?: CSSProperties
}

export const Header: React.FC<THeader> = ({
  title,
  IconEl,
  description,
  status,
  stylesTitle
}) => {
  const { t } = useTranslation('common')

  const getTitle = () => {
    if (title) return title
    if (status) {
      return status === 'success' ? t('success') : t('error')
    }
    return ''
  }

  const textTitle = getTitle()

  return (
    <div className={s.container}>
      {status && (
        <div className={s.icon}>
          <IconWrapper width={80} colorTheme="back-icon" className={s.circle}>
            <Icon
              id={status === 'success' ? 'payment-1' : 'warning-circle'}
              size="extra-big"
              colorStroke="blue"
            />
          </IconWrapper>
        </div>
      )}
      {IconEl && <div className={s.icon}>{IconEl}</div>}
      {textTitle && (
        <p style={{ ...stylesTitle }} className={s.title}>
          {textTitle}
        </p>
      )}
      {description && <p className={s.description}>{description}</p>}
    </div>
  )
}
