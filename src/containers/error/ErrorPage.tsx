import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import cn from 'classnames'
import { ROUTES } from '@/routes'
import { useRedux } from '@/hooks/useRedux'
import useTranslation from 'next-translate/useTranslation'
import { setPageError, TErrorPage } from '@/store/error'
import s from '@/containers/error/styles/ErrorPage.module.scss'
import { Button } from '@/components/buttons/Button'
import image404 from '@/images/404_image.png'
import image500 from '@/images/500_image.png'
import { ErrorStatus } from '@/types/error'

type ErrorPage = {
  statusCode: TErrorPage
}

export const ErrorPage: React.FC<ErrorPage> = ({ statusCode }) => {
  const { t } = useTranslation('error')
  const [, dispatch] = useRedux()
  const [image, setImage] = useState<StaticImageData>()

  useEffect(
    () => () => {
      dispatch(setPageError(null))
    },
    []
  )

  useEffect(() => {
    switch (statusCode) {
      case ErrorStatus.NotFound:
        setImage(image404)
        break
      case ErrorStatus.Server:
        setImage(image500)
        break
      default:
    }
  }, [statusCode])

  return (
    <div className={s.container}>
      <div className={s.content}>
        <div className={s.image}>
          {image && (
            <Image alt={`${statusCode} error`} src={image.src} width="540" height="390" />
          )}
        </div>
        <div className={s.top}>
          <div className={s.code}>{statusCode}</div>
          <div className={cn(s.message, s[`message${statusCode}`])}>
            {t(`${statusCode}-message`)}
          </div>
        </div>
        {statusCode !== ErrorStatus.Server && (
          <Button
            theme="primary"
            type="button"
            label={t('home-btn')}
            font="text-medium"
            linkTo={ROUTES.HOME}
            width="100%"
            styleButton={{ maxWidth: '228px' }}
          />
        )}
      </div>
    </div>
  )
}
