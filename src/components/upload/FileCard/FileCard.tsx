import React from 'react'
import { Icon } from '@/components/Icon'
import cn from 'classnames'
import { ButtonIcon } from '@/components/buttons/ButtonIcon'
import s from './FileCard.module.scss'

type TFileCard = {
  file: File
  onRemove: (file: File) => void
  error?: string
  classCont?: string
}

export const FileCard: React.FC<TFileCard> = ({ file, onRemove, error, classCont }) => (
  <>
    <div className={cn(s.card, classCont)} key={file.name}>
      <div className={s.file}>
        <Icon id="file" size="medium" colorStroke="blue" />
        <span className={s.name}>{file.name}</span>
      </div>
      <ButtonIcon
        theme="medium"
        icon="cancel-file"
        onClick={() => onRemove(file)}
        iconColor="none"
        styleContainer={{ marginRight: '10px' }}
      />
    </div>
    {error && <div className={s.fileError}>{error}</div>}
  </>
)
