import useTranslation from 'next-translate/useTranslation'
import { useRedux } from '@/hooks/useRedux'
import { useFormik } from 'formik'
import { validation } from '@/utils/validation'
import { FormikInput } from '@/components/inputs/FormikInput'
import { Button } from '@/components/buttons/Button'
import * as yup from 'yup'
import { selectUser } from '@/store/auth'
import s from './StartForm.module.scss'
import { selectHomeState, sendEmailAsync } from '../../store/home'

export const StartForm: React.FC = () => {
  const { t } = useTranslation('home')
  const [select, dispatch] = useRedux()
  const { fetching } = select(selectHomeState)
  const { hasAuth } = select(selectUser)

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: yup.object().shape({
      email: validation.email
    }),
    onSubmit: ({ email }) => {
      if (formik.isValid && formik.dirty) {
        dispatch(sendEmailAsync(email))
      }
    }
  })

  return (
    <div className={s.container}>
      {!hasAuth && (
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className={s.formContainer}>
            <FormikInput
              name="email"
              type="email"
              placeholder={t('inputs:email')}
              id="email"
              formik={formik}
            />
            <Button
              theme="primary"
              type="submit"
              label={t('start.get-started')}
              width="100%"
              styleButton={{ maxWidth: '152px' }}
              loading={fetching}
            />
          </div>
        </form>
      )}
    </div>
  )
}
