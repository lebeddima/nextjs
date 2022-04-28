import React from 'react'
import { Icon } from '@/components/Icon'
import { DropzoneState } from 'react-dropzone/typings/react-dropzone'
import useTranslation from 'next-translate/useTranslation'
import cn from 'classnames'
import s from './DropZone.module.scss'

type TDropZone = {
  getRootProps: DropzoneState['getRootProps']
  getInputProps: DropzoneState['getInputProps']
  fetching?: boolean
  classCont?: string
}

export const DropZone: React.FC<TDropZone> = ({
  getRootProps,
  getInputProps,
  fetching,
  classCont
}) => {
  const { t } = useTranslation('inputs')
  return (
    <div
      {...getRootProps({
        className: cn(s.dropzone, classCont, { [s.disabled]: fetching })
      })}
    >
      <input type="file" {...getInputProps()} />
      <div className={s.content}>
        <Icon id="folder" size="medium" colorStroke="blue" />
        <p>{t('attach-files')}</p>
      </div>
    </div>
  )
}
