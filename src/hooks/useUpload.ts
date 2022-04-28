import { useCallback, useEffect, useState } from 'react'
import { FileRejection, useDropzone, DropzoneState } from 'react-dropzone'
import useTranslation from 'next-translate/useTranslation'
import { UploadableFile } from '@/components/upload/types'

type TUseUploadProps = {
  onSetFiles: (files: UploadableFile[]) => void
  extensions?: string
  maxSize?: string
}

type TDropzoneProps = {
  getRootProps: DropzoneState['getRootProps']
  getInputProps: DropzoneState['getInputProps']
}

type TReturn = {
  dropzoneProps: TDropzoneProps
  removeFile: (file: File) => void
}

type TUseUpload = (props: TUseUploadProps) => TReturn

export const useUpload: TUseUpload = ({ onSetFiles, extensions, maxSize }) => {
  const { t } = useTranslation('error')
  const [files, setFiles] = useState<UploadableFile[]>([])

  useEffect(() => {
    onSetFiles(files)
  }, [files])

  const getErrorMessage = (file: FileRejection) => {
    const error = file.errors[0]
    if (error.code === 'file-invalid-type' && extensions) {
      return t('fileUploader.type', { var: extensions })
    }
    if (error.code === 'file-too-large' && maxSize) {
      return t('fileUploader.size', {
        var: (Number(maxSize) / 1024 / 1024).toString()
      })
    }
    return error.message
  }

  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    const mappedAcc = accFiles.map((file, index) => ({ file, id: index }))
    const mappedRej = rejFiles.map((rejectedFile, index) => ({
      file: rejectedFile.file,
      error: getErrorMessage(rejectedFile),
      id: index
    }))

    setFiles((current) => {
      const newFiles = [...mappedAcc, ...mappedRej]

      if (current.length === 0) {
        return newFiles
      }

      return removeFilesDuplicates(current, newFiles)
    })
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: extensions,
    maxSize: Number(maxSize)
  })

  const removeFile = (file: File) => {
    setFiles((curr) => curr.filter((fw) => fw.file !== file))
  }

  const dropzoneProps = { getRootProps, getInputProps }

  return { dropzoneProps, removeFile }
}

// helper function
function removeFilesDuplicates(
  current: UploadableFile[],
  newFiles: UploadableFile[]
): UploadableFile[] {
  const result = newFiles.filter(
    (newFile: UploadableFile) =>
      !current.some(
        (currentFile: UploadableFile) =>
          newFile.file.name === currentFile.file.name ||
          newFile.file.size === currentFile.file.size ||
          newFile.file.lastModified.toString() ===
            currentFile.file.lastModified.toString()
      )
  )

  return [...current, ...result]
}
