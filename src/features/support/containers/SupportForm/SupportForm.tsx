import { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { validation } from '@/utils/validation'
import { FormikSelect } from '@/components/inputs/selects/FormikSelect'
import { FormikInput } from '@/components/inputs/FormikInput'
import { useRedux } from '@/hooks/useRedux'
import { selectSupport, setModalOpen } from '@/features/support/store/support'
import { Button } from '@/components/buttons/Button'
import { FileUploader } from '@/components/upload/FileUploader'
import { UploadableFile } from '@/components/upload/types'
import s from './SupportForm.module.scss'

const EXTENSIONS = 'image/jpeg,image/png,image/jpg'
const MAX_SIZE = `${5 * 1024 * 1024}`

export const SupportForm: React.FC = () => {
  const { t } = useTranslation('support')
  const [select, dispatch] = useRedux()
  const { problems } = select(selectSupport)
  const [files, setFiles] = useState<UploadableFile[]>([])

  const formik = useFormik({
    initialValues: {
      category: '',
      message: ''
    },
    validationSchema: yup.object().shape({
      category: validation.required,
      message: validation.required
    }),
    onSubmit: () => {
      formik.resetForm({ values: { category: '', message: '' } })
      setFiles([])
      dispatch(setModalOpen(true))
    }
  })

  const handlAddFiles = (files: UploadableFile[]) => {
    setFiles(files)
  }

  const hasFileError = files?.some((item) => !!item.error)

  return (
    <div className={s.container}>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <div className={s.mainContainer}>
          <FormikSelect
            name="category"
            label={{ label: t('supportForm.categoryLabel') }}
            placeholder={t('supportForm.categoryPlaceholder')}
            id="country"
            options={problems}
            formik={formik}
          />
          <FormikInput
            name="message"
            type="text"
            label={{ label: t('supportForm.messageLabel') }}
            placeholder={t('supportForm.messagePlaceholder')}
            id="message"
            textarea
            countable
            formik={formik}
            maxLength={200}
            value={formik.values.message}
          />
          <FileUploader
            onSetFiles={handlAddFiles}
            extensions={EXTENSIONS}
            maxSize={MAX_SIZE}
            classCont={s.upload}
            files={files}
          />
          <div className={s.submit}>
            <Button
              theme="primary"
              type="submit"
              label={t('supportForm.button')}
              width="100%"
              styleButton={{ maxWidth: '420px' }}
              disabled={!formik.isValid || !formik.dirty || hasFileError}
            />
          </div>
        </div>
      </form>
    </div>
  )
}
