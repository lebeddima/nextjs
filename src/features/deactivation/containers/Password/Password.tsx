import { Header } from '@/components/modals/Header'
import { Button } from '@/components/buttons/Button'
import useTranslation from 'next-translate/useTranslation'
import { FormikInput } from '@/components/inputs/FormikInput'
import { useFormik } from 'formik'
import { useRedux } from '@/hooks/useRedux'
import * as yup from 'yup'
import { validation } from '@/utils/validation'
import { ModalBase } from '@/components/modals/ModalBase'
import { setStep, selectDeactivate } from '../../store/deactivate'
import s from './Password.module.scss'

export const Password: React.FC = () => {
  const [select, dispatch] = useRedux()
  const { t } = useTranslation('deactivation')
  const { fetching } = select(selectDeactivate)

  const formik = useFormik({
    initialValues: {
      password: ''
    },
    validationSchema: yup.object().shape({
      password: validation.password
    }),
    onSubmit: () => {
      dispatch(setStep('sms'))
    }
  })

  const handleClose = () => {
    dispatch(setStep(null))
  }

  return (
    <ModalBase onClose={handleClose}>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <Header title={t('password.title')} description={t('password.description')} />
        <div className={s.input}>
          <FormikInput
            name="password"
            type="password"
            label={{ label: t('password') }}
            placeholder={t('inputs:type-here')}
            id="password"
            formik={formik}
          />
        </div>
        <Button
          theme="primary"
          type="submit"
          label={t('deactivate')}
          width="100%"
          disabled={!formik.values.password || !formik.isValid}
          loading={fetching}
        />
      </form>
    </ModalBase>
  )
}
