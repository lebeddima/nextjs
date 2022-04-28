import React from 'react'
import { Header } from '@/components/modals/Header'
import { Button } from '@/components/buttons/Button'
import { useRedux } from '@/hooks/useRedux'
import { ModalBase } from '@/components/modals/ModalBase'
import useTranslation from 'next-translate/useTranslation'
import { FormikInput } from '@/components/inputs/FormikInput'
import { useFormik } from 'formik'
import { validation } from '@/utils/validation'
import * as yup from 'yup'
import { selectChangeEmail, sendNewEmail, setStep } from '../../store/change-email'
import s from './FormChangeEmail.module.scss'

export const FormChangeEmail: React.FC = () => {
  const { t } = useTranslation('security')
  const [select, dispatch] = useRedux()
  const { fetching } = select(selectChangeEmail)

  const formik = useFormik({
    initialValues: {
      newEmail: ''
    },
    validationSchema: yup.object().shape({
      newEmail: validation.email
    }),
    onSubmit: (formData) => {
      dispatch(sendNewEmail({ formData, formik }))
    }
  })

  const handleClose = () => dispatch(setStep(null))

  return (
    <ModalBase onClose={handleClose}>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <Header
          title={t('change-email.title-email')}
          description={t('change-email.desc-email')}
        />
        <div className={s.input}>
          <FormikInput
            name="newEmail"
            type="email"
            label={{ label: t('inputs:new-email') }}
            placeholder={t('inputs:type-here')}
            id="newEmail"
            formik={formik}
          />
        </div>
        <Button
          theme="primary"
          type="submit"
          label={t('common:continue')}
          width="100%"
          loading={fetching}
          disabled={!(formik.isValid && formik.dirty)}
          classButton={s.submit}
        />
      </form>
    </ModalBase>
  )
}
