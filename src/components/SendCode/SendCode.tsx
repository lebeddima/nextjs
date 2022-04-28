import { useState } from 'react'
import { Header } from '@/components/modals/Header'
import { IconWrapper } from '@/components/IconWrapper'
import { Icon, TIconProps } from '@/components/Icon'
import { Code } from '@/components/inputs/Code'
import { SendEgain } from '@/components/SendEgain'
import { Button } from '@/components/buttons/Button'
import useTranslation from 'next-translate/useTranslation'
import { LinkText } from '@/components/LinkText'
import cn from 'classnames'
import s from './SendCode.module.scss'

type TSendCode = {
  icon: 'email' | 'phone' | 'google'
  title: string
  description: string | React.ReactNode
  loading: boolean

  error?: string
  fetchingResend?: boolean
  sendEgainTimeout?: number
  linkText?: string
  linkButtonText?: string
  confirmButtonClassName?: string

  onSubmit: (x: string) => void
  onClickLink?: () => void
  clearError?: () => void
  onClickEgain?: () => void
}

export const SendCode: React.FC<TSendCode> = ({
  icon,
  title,
  description,
  clearError,
  onClickEgain,
  error,
  sendEgainTimeout,
  fetchingResend,
  loading,
  onSubmit,
  linkText,
  linkButtonText,
  onClickLink,
  confirmButtonClassName
}) => {
  const { t } = useTranslation('common')
  const [code, setCode] = useState('')

  const getIcon = (): TIconProps['id'] => {
    switch (icon) {
      case 'email':
        return 'envelope-open'
      case 'phone':
        return 'phone-disconnect'
      case 'google':
        return 'google'
      default:
        return 'envelope-open'
    }
  }

  const hasDisabled = code?.length < 6 || Boolean(error)

  const handleCode = (code: string) => {
    if (error && clearError) {
      clearError()
    }
    setCode(code)
  }

  return (
    <div className={s.content}>
      <Header
        title={title}
        description={description}
        IconEl={
          <IconWrapper width={80} colorTheme="back-icon" className={s.circle}>
            <Icon id={getIcon()} size="extra-big" colorStroke="blue" />
          </IconWrapper>
        }
      />
      <Code
        classContainer={s.code}
        onChange={handleCode}
        error={error}
        onSubmitCode={() => onSubmit(code)}
        type="text"
      />
      {onClickEgain && sendEgainTimeout && (
        <SendEgain
          onClick={onClickEgain}
          labelButton={t('send-again')}
          time={sendEgainTimeout}
          fetching={fetchingResend}
          classContainer={s.sendEgain}
        />
      )}
      <Button
        theme="primary"
        type="submit"
        label={t('common:confirm')}
        width="100%"
        classButton={cn(s.submit, confirmButtonClassName)}
        disabled={hasDisabled}
        loading={loading}
        onClick={() => onSubmit(code)}
      />
      {linkText && (
        <LinkText
          text={linkText}
          buttonText={linkButtonText}
          center
          onClick={onClickLink}
        />
      )}
    </div>
  )
}
