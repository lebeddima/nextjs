import { Header } from '@/components/modals/Header'
import { IconWrapper } from '@/components/IconWrapper'
import { Icon } from '@/components/Icon'
import { Button } from '@/components/buttons/Button'
import useTranslation from 'next-translate/useTranslation'
import { FormikInput } from '@/components/inputs/FormikInput'
import { useFormik } from 'formik'
import { useRedux } from '@/hooks/useRedux'
import * as yup from 'yup'
import { validation } from '@/utils/validation'
import { Card } from '@/components/Card'
import { sendEmailAsync, selectRecoveryPass } from '../../store/recovery-password'
import s from './RecoveryPassword.module.scss'

export const RecoveryPassword: React.FC = () => {
  const [select, dispatch] = useRedux()
  const { t } = useTranslation('common')
  const { fetching } = select(selectRecoveryPass)

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: yup.object().shape({
      email: validation.email
    }),
    onSubmit: (formData) => {
      dispatch(sendEmailAsync({ formData, formik }))
    }
  })

  return (
    <Card theme="small" maxWidth="485px">
      <form onSubmit={formik.handleSubmit} className={s.content} autoComplete="off">
        <Header
          title={t('auth:password-recovery.title')}
          description={t('auth:password-recovery.description')}
          IconEl={
            <IconWrapper width={80} colorTheme="back-icon" className={s.circle}>
              <Icon id="envelope-open" size="extra-big" colorStroke="blue" />
            </IconWrapper>
          }
        />
        <FormikInput
          name="email"
          type="email"
          label={{ label: t('common:email') }}
          placeholder={t('inputs:type-here')}
          id="email"
          formik={formik}
        />
        <Button
          theme="primary"
          type="submit"
          label={t('common:sent')}
          width="100%"
          loading={fetching}
          disabled={!(formik.isValid && formik.dirty)}
        />
      </form>
    </Card>
  )
}
