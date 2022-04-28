import { Header } from '@/components/modals/Header'
import { IconWrapper } from '@/components/IconWrapper'
import { Icon } from '@/components/Icon'
import { useRouter } from 'next/router'
import { ROUTES } from '@/constants/routes'
import { Button } from '@/components/buttons/Button'
import { useRedux } from '@/hooks/useRedux'
import useTranslation from 'next-translate/useTranslation'
import { FormikInput } from '@/components/inputs/FormikInput'
import { useFormik } from 'formik'
import { validation } from '@/utils/validation'
import * as yup from 'yup'
import { Card } from '@/components/Card'
import { selectNewPass, sendPassAsync } from '../../store/new-password'
import s from './NewPassword.module.scss'

export const NewPassword: React.FC = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const [select, dispatch] = useRedux()
  const { token, fetching } = select(selectNewPass)

  const formik = useFormik({
    initialValues: {
      token,
      newPassword: '',
      repeatedPassword: ''
    },
    validationSchema: yup.object().shape({
      newPassword: validation.password,
      repeatedPassword: validation.repeatePasswordNew
    }),
    onSubmit: (formData) => {
      dispatch(sendPassAsync({ formData, formik }))
    }
  })

  const handlClose = () => {
    router.push(ROUTES.SIGN_IN)
  }

  return (
    <Card theme="small" maxWidth="485px" onClose={handlClose}>
      <form onSubmit={formik.handleSubmit} className={s.content} autoComplete="off">
        <Header
          title={t('auth:new-password.title')}
          description={t('auth:new-password.description')}
          IconEl={
            <IconWrapper width={80} colorTheme="back-icon" className={s.circle}>
              <Icon id="security" size="extra-big" colorStroke="blue" />
            </IconWrapper>
          }
        />
        <div className={s.inputs}>
          <FormikInput
            name="newPassword"
            type="password"
            label={{ label: t('inputs:new-password') }}
            placeholder={t('inputs:least-character')}
            id="password"
            formik={formik}
          />
          <FormikInput
            name="repeatedPassword"
            type="password"
            label={{ label: t('inputs:repeat-password') }}
            placeholder={t('inputs:least-character')}
            id="repeatPassword"
            formik={formik}
          />
        </div>
        <Button
          theme="primary"
          type="submit"
          label={t('common:confirm')}
          width="100%"
          loading={fetching}
          classButton={s.submit}
          disabled={!(formik.isValid && formik.dirty)}
        />
      </form>
    </Card>
  )
}
