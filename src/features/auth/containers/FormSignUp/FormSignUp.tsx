import { FormikInput } from '@/components/inputs/FormikInput'
import { FormikInputPhone } from '@/components/inputs/FormikInputPhone'
import { Button } from '@/components/buttons/Button'
import { useFormik } from 'formik'
import { useRedux } from '@/hooks/useRedux'
import { FormikSelect } from '@/components/inputs/selects/FormikSelect'
import { FormikCheckbox } from '@/components/inputs/FormikCheckbox'
import { ROUTES } from '@/routes'
import * as yup from 'yup'
import { FormikDatePicker } from '@/components/inputs/FormikDatePicker'
import { DATE_FORMATS } from '@/constants/date'
import { selectCountry } from '@/store/country'
import { validation } from '@/utils/validation'
import useTranslation from 'next-translate/useTranslation'
import { Card } from '@/components/Card'
import { LinkText } from '@/components/LinkText'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { signUpAsync, selectSignUp } from '../../store/sign-up'

import s from './FormSignUp.module.scss'

export const FormSignUp: React.FC = () => {
  const { t, lang } = useTranslation('auth')
  const [select, dispatch] = useRedux()
  const { countries } = select(selectCountry)
  const { fetching } = select(selectSignUp)

  const {
    query: { email }
  } = useRouter()

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      dateOfBirth: '',
      country: '',
      phoneNumber: '',
      email: email || '',
      password: '',
      repeatedPassword: '',
      termsOfPrivacyPolicy: false
    },
    validationSchema: yup.object().shape({
      name: validation.required,
      surname: validation.required,
      dateOfBirth: validation.date,
      country: validation.required,
      phoneNumber: validation.phone,
      email: validation.email,
      password: validation.password,
      repeatedPassword: validation.repeatePassword,
      termsOfPrivacyPolicy: validation.singleCheckbox
    }),
    onSubmit: (formData) => {
      dispatch(signUpAsync({ formData, formik }))
    }
  })

  return (
    <Card theme="big" maxWidth="930px">
      <div className={s.container}>
        <h1>Sign up</h1>
        <form
          className={cn({ [s.readOnly]: fetching })}
          onSubmit={formik.handleSubmit}
          autoComplete="off"
        >
          <div className={s.mainContainer}>
            <FormikInput
              name="name"
              type="text"
              label={{ label: t('inputs:first-name') }}
              placeholder={t('inputs:type-here')}
              id="firstName"
              formik={formik}
            />
            <FormikInput
              name="surname"
              type="text"
              label={{ label: t('inputs:last-name') }}
              placeholder={t('inputs:type-here')}
              id="lastName"
              formik={formik}
            />
            <FormikDatePicker
              name="dateOfBirth"
              type="date"
              label={{ label: t('inputs:date-birth') }}
              placeholder={DATE_FORMATS[lang].toUpperCase()}
              id="date"
              firstDayOfWeek={1}
              formik={formik}
              fromMonth={new Date(1900, 1)}
              toMonth={new Date(new Date().setFullYear(new Date().getFullYear() - 18))}
            />
            <FormikSelect
              name="country"
              label={{ label: t('inputs:country') }}
              placeholder={t('inputs:choose-one')}
              id="country"
              options={countries.data}
              formik={formik}
            />
            <FormikInputPhone
              name="phoneNumber"
              label={{ label: t('inputs:phone-number') }}
              formik={formik}
              placeholder="12 345 6789"
            />
            <FormikInput
              name="email"
              type="email"
              label={{ label: t('inputs:email') }}
              placeholder={t('inputs:type-here')}
              id="email"
              formik={formik}
            />
            <FormikInput
              name="password"
              type="password"
              label={{ label: t('inputs:password') }}
              placeholder={t('inputs:type-here')}
              id="password"
              formik={formik}
            />
            <FormikInput
              name="repeatedPassword"
              type="password"
              label={{ label: t('inputs:repeat-password') }}
              placeholder={t('inputs:type-here')}
              id="repeatedPassword"
              formik={formik}
            />
          </div>

          <div className={s.checkbox}>
            <FormikCheckbox
              theme="square"
              name="termsOfPrivacyPolicy"
              type="checkbox"
              label={t('sign-up.privacy-policy')}
              id="policy"
              formik={formik}
            />
          </div>

          <div className={s.submit}>
            <Button
              theme="primary"
              type="submit"
              label={t('sign-up.create-account')}
              width="100%"
              styleButton={{ maxWidth: '421px' }}
              loading={fetching}
              disabled={!(formik.isValid && formik.dirty)}
            />
          </div>
        </form>
        <LinkText
          text={t('sign-up.already-member')}
          buttonText={t('sign-in.sign-in')}
          link={ROUTES.SIGN_IN}
          center
        />
      </div>
    </Card>
  )
}
