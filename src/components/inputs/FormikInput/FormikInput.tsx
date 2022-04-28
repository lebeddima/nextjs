import React, { ChangeEvent } from 'react'
import { Input } from 'components/inputs/Input'
import { TFormik } from '@/types/formik'
import { getFieldError } from '@/utils/getFieldError'
import useTranslation from 'next-translate/useTranslation'
import { TInputProps } from '../types'

type TProps = {
  formik: TFormik
} & TInputProps

export const FormikInput: React.FC<TProps> = ({ formik, ...props }) => {
  const { t } = useTranslation('common')
  const field = formik.getFieldProps(props.name)
  const { touched, error } = formik.getFieldMeta(props.name)

  const handlerChange = (e: ChangeEvent) => {
    field.onChange(e)

    if (error) return
    formik.setFieldError(props.name, '')
  }

  const fieldError = getFieldError({ touched, error, t })

  return <Input {...props} {...field} onChange={handlerChange} error={fieldError} />
}
