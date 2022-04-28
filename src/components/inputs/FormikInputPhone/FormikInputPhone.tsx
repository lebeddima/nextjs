import { InputPhone } from '@/components/inputs/InputPhone'
import { TFormik } from '@/types/formik'
import { getFieldError } from '@/utils/getFieldError'
import useTranslation from 'next-translate/useTranslation'
import { TInputPhoneProps } from '../types'

type TProps = {
  formik: TFormik
} & TInputPhoneProps

export const FormikInputPhone: React.FC<TProps> = ({ formik, name, ...props }) => {
  const { t } = useTranslation('common')
  if (!name) return <></>

  const field = formik.getFieldProps(name)
  const { touched, error } = formik.getFieldMeta(name)

  if (formik.isSubmitting && !touched) {
    formik.setTouched({ [name]: true })
  }

  const handlerChange: TInputPhoneProps['onChange'] = (val) => {
    formik.setFieldValue(name, val)
    formik.setTouched({ [name]: true })
    // clear error
    if (error) return
    formik.setFieldError(name, '')
  }

  const fieldError = getFieldError({ touched, error, t })

  const hendlSubmit = () => {
    formik.submitForm()
  }

  return (
    <InputPhone
      {...props}
      {...field}
      value={field.value}
      onChange={handlerChange}
      error={fieldError}
      onEnterKey={hendlSubmit}
    />
  )
}
