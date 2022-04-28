import { Select } from '@/components/inputs/selects/Select'
import { SingleValue } from 'react-select'
import { TFormik } from '@/types/formik'
import { getFieldError } from '@/utils/getFieldError'
import useTranslation from 'next-translate/useTranslation'
import { TSelectOptions, TSelectProps } from '../types'

type TProps = {
  formik: TFormik
} & TSelectProps

export const FormikSelect: React.FC<TProps> = ({ formik, ...props }) => {
  const { t } = useTranslation('common')
  const field = formik.getFieldProps(props.name)
  const { touched, error } = formik.getFieldMeta(props.name)

  const handlerChange = (e: SingleValue<TSelectOptions[0]>) => {
    if (!e) return
    formik.setFieldValue(props.name, e.value)

    // clear error
    if (error) return
    formik.setFieldError(props.name, '')
  }

  const fieldError = getFieldError({ touched, error, t })

  return (
    <Select
      {...props}
      {...field}
      onChange={handlerChange}
      error={fieldError}
      clear={!field.value}
    />
  )
}
