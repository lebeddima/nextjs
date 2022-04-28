import { TFormik } from '@/types/formik'
import { DatePicker } from '@/components/inputs/DatePicker'
import { getFieldError } from '@/utils/getFieldError'
import useTranslation from 'next-translate/useTranslation'
import { TDatePickerType } from '../types'

type TProps = {
  formik: TFormik
} & TDatePickerType

export const FormikDatePicker: React.FC<TProps> = ({ formik, ...props }) => {
  const { t } = useTranslation('common')

  const field = formik.getFieldProps(props.name)
  const { touched, error } = formik.getFieldMeta(props.name)

  const handlerChange = (date: Date) => {
    formik.setFieldValue(props.name, date.toISOString())
    // clear error
    if (error) return
    formik.setFieldError(props.name, '')
  }

  const fieldError = getFieldError({ touched, error, t })

  return (
    <DatePicker
      {...props}
      clear={!field.value}
      onDateFrom={handlerChange}
      error={fieldError}
    />
  )
}
