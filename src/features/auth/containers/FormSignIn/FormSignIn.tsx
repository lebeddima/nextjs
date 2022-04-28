import { FormikInput } from '@/components/inputs/FormikInput'
import { Button as ButtonComponent, Button } from '@/components/buttons/Button'
import { Tab as TabComponent } from '@/components/navigations/Tab'
import { useFormik } from 'formik'
import { ROUTES } from '@/routes'
import { FormikInputPhone } from '@/components/inputs/FormikInputPhone'
import useTranslation from 'next-translate/useTranslation'
import { validation } from '@/utils/validation'
import { useRedux } from '@/hooks/useRedux'
import * as yup from 'yup'
import { Card } from '@/components/Card'
import { LinkText } from '@/components/LinkText'
import { useRouter } from 'next/router'
import cn from 'classnames'
import {
  selectSignIn,
  setAuthMethod,
  TInit,
  signInAsync,
  EAuthMethod
} from '../../store/sign-in'
import s from './FormSignIn.module.scss'

export const FormSignIn: React.FC = () => {
  const { t } = useTranslation('inputs')
  const [select, dispatch] = useRedux()
  const { authMethod, fetching } = select(selectSignIn)
  const {
    query: { email }
  } = useRouter()

  const formik = useFormik({
    initialValues: {
      email: email || '',
      phoneNumber: '',
      password: ''
    },
    validationSchema: yup.object().shape({
      ...(authMethod === 'email' && { email: validation.email }),
      ...(authMethod === 'phone' && { phoneNumber: validation.phone }),
      password: validation.password
    }),
    onSubmit: (formData) => {
      dispatch(signInAsync({ formData, formik }))
    }
  })

  const handleChangeTab = (method: TInit['authMethod']) => {
    formik.resetForm()
    dispatch(setAuthMethod(method))
  }

  return (
    <Card theme="big" maxWidth="485px">
      <div className={s.container}>
        <h1>Sign in</h1>
        <form
          onSubmit={formik.handleSubmit}
          className={cn({ [s.readOnly]: fetching })}
          autoComplete="off"
        >
          <div className={s.mainContainer}>
            <TabComponent widthButton="50%" widthContainer="100%" defaultTab={authMethod}>
              <ButtonComponent
                label={t('common:email')}
                theme="tab-blue-small"
                onClick={() => handleChangeTab(EAuthMethod.email)}
                id={EAuthMethod.email}
              />
              <ButtonComponent
                label={t('common:mobile')}
                theme="tab-blue-small"
                onClick={() => handleChangeTab(EAuthMethod.phone)}
                id={EAuthMethod.phone}
              />
            </TabComponent>
            <div className={s.inputContainer}>
              {authMethod === 'email' && (
                <FormikInput
                  name="email"
                  type="email"
                  label={{ label: t('common:email') }}
                  placeholder={t('inputs:type-here')}
                  id="email"
                  formik={formik}
                />
              )}
              {authMethod === 'phone' && (
                <FormikInputPhone
                  name="phoneNumber"
                  label={{ label: t('common:phone-number') }}
                  formik={formik}
                />
              )}
              <FormikInput
                name="password"
                type="password"
                label={{
                  label: t('common:password'),
                  additionalButton: (
                    <Button
                      theme="text-blue"
                      font="small"
                      label={t('auth:sign-in.forgot-password')}
                      linkTo={ROUTES.RECOVERY_PASSWORD}
                    />
                  )
                }}
                placeholder={t('inputs:choose-one')}
                id="password"
                formik={formik}
              />
            </div>
            <div className={s.submit}>
              <Button
                theme="primary"
                type="submit"
                label={t('auth:sign-in.sign-in')}
                width="100%"
                styleButton={{ maxWidth: '421px' }}
                loading={fetching}
                disabled={!(formik.isValid && formik.dirty)}
              />
            </div>
          </div>
        </form>
        <LinkText
          text={t('auth:sign-in.looking-to')}
          buttonText={t('auth:sign-in.create-an-account')}
          link={ROUTES.SIGN_UP}
          center
        />
      </div>
    </Card>
  )
}
