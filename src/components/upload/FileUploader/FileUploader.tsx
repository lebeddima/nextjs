import { useUpload } from '@/hooks/useUpload'
import cn from 'classnames'
import { UploadableFile } from '../types'
import { DropZone } from '../DropZone'
import { FileCard } from '../FileCard'
import s from './FileUploader.module.scss'

export type TFileUploader = {
  onSetFiles: (files: UploadableFile[]) => void
  fetching?: boolean
  extensions?: string
  maxSize?: string
  classCont?: string
  files?: UploadableFile[]
}

export const FileUploader: React.FC<TFileUploader> = ({
  onSetFiles,
  fetching,
  extensions,
  maxSize,
  classCont,
  files
}) => {
  const { dropzoneProps, removeFile } = useUpload({
    onSetFiles,
    extensions,
    maxSize
  })

  return (
    <section className={cn(classCont)}>
      <DropZone {...dropzoneProps} fetching={fetching} />
      {files?.length !== 0 &&
        files?.map((file) => (
          <FileCard
            key={`${file.file.name}${file.file.size}`}
            file={file.file}
            error={file.error}
            onRemove={removeFile}
            classCont={s.fileCard}
          />
        ))}
    </section>
  )
}
