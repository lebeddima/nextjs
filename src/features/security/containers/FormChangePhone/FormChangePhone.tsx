/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import { Header } from '@/components/modals/Header'

import { Button } from '@/components/buttons/Button'
import { useRedux } from '@/hooks/useRedux'
import { ModalBase } from '@/components/modals/ModalBase'
import useTranslation from 'next-translate/useTranslation'
import { useFormik } from 'formik'
import { validation } from '@/utils/validation'
import * as yup from 'yup'
import { InlineError } from '@/containers/error/InlineError'
import { FormikInputPhone } from '@/components/inputs/FormikInputPhone'
import { setInlineError } from '@/store/error'
import { selectChangePhone, sendNewPhone, reset } from '../../store/change-phone'
import s from './FormChangePhone.module.scss'

export const FormChangePhone: React.FC = () => {
  const { t } = useTranslation('security')
  const [select, dispatch] = useRedux()
  const { fetching } = select(selectChangePhone)

  const formik = useFormik({
    initialValues: {
      newPhone: ''
    },
    validationSchema: yup.object().shape({
      newPhone: validation.phone
    }),
    onSubmit: (formData) => {
      dispatch(sendNewPhone({ formData, formik }))
      dispatch(setInlineError(''))
    }
  })

  const handleClose = () => dispatch(reset())

  return (
    <ModalBase onClose={handleClose}>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <Header
          title={t('change-phone.title-phone')}
          description={t('change-phone.desc-new-phone')}
        />

        <FormikInputPhone
          name="newPhone"
          label={{ label: t('common:phone-number') }}
          placeholder="12 345 6789"
          id="newPhone"
          formik={formik}
          classContainer={s.input}
          menuShort
        />
        <InlineError />
        <Button
          theme="primary"
          type="submit"
          label={t('common:confirm')}
          width="100%"
          loading={fetching}
          disabled={!(formik.isValid && formik.dirty)}
          classButton={s.submit}
        />
      </form>
    </ModalBase>
  )
}
