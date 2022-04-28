import { Header } from '@/components/modals/Header'
import { IconWrapper } from '@/components/IconWrapper'
import { Icon } from '@/components/Icon'
import { Button } from '@/components/buttons/Button'
import { useRedux } from '@/hooks/useRedux'
import { ModalBase } from '@/components/modals/ModalBase'
import useTranslation from 'next-translate/useTranslation'
import { FormikInput } from '@/components/inputs/FormikInput'
import { useFormik } from 'formik'
import { validation } from '@/utils/validation'
import * as yup from 'yup'
import cn from 'classnames'
import { InlineError } from '@/containers/error/InlineError'
import { setInlineError } from '@/store/error'
import { selectChangePass, sendPassAsync, setStep } from '../../store/change-pass'
import s from './FormChangePass.module.scss'

export const FormChangePass: React.FC = () => {
  const { t } = useTranslation('security')
  const [select, dispatch] = useRedux()
  const { fetching } = select(selectChangePass)

  const formik = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
      repeatedNewPassword: ''
    },
    validationSchema: yup.object().shape({
      password: validation.password,
      newPassword: validation.password,
      repeatedNewPassword: validation.repeatePasswordNew
    }),
    onSubmit: (formData) => {
      dispatch(sendPassAsync({ formData, formik }))
      dispatch(setInlineError(''))
    }
  })

  const handlClose = () => dispatch(setStep(null))

  return (
    <ModalBase onClose={handlClose}>
      <form
        onSubmit={formik.handleSubmit}
        className={cn(s.content, { [s.readOnly]: fetching })}
        autoComplete="off"
      >
        <Header
          title={t('change-pass.title-pass')}
          description={t('change-pass.desc-pass')}
          IconEl={
            <IconWrapper width={80} colorTheme="back-icon" className={s.circle}>
              <Icon id="security" size="extra-big" colorStroke="blue" />
            </IconWrapper>
          }
        />
        <div className={s.inputs}>
          <FormikInput
            name="password"
            type="password"
            label={{ label: t('inputs:old-password') }}
            placeholder={t('inputs:least-character')}
            id="password"
            formik={formik}
          />
          <FormikInput
            name="newPassword"
            type="password"
            label={{ label: t('inputs:new-password') }}
            placeholder={t('inputs:least-character')}
            id="password"
            formik={formik}
          />
          <FormikInput
            name="repeatedNewPassword"
            type="password"
            label={{ label: t('inputs:repeat-password') }}
            placeholder={t('inputs:least-character')}
            id="repeatPassword"
            formik={formik}
          />
        </div>
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
