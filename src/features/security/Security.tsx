import useTranslation from 'next-translate/useTranslation'
import { Icon } from '@/components/Icon'
import { useRedux } from '@/hooks/useRedux'
import { useAuth } from '@/hooks/useAuth'
import { CheckBox } from '@/components/inputs/CheckBox'
import s from './styles/Security.module.scss'
import { SecurityItem } from './components/SecurityItem'
import { setStep as setStepPass } from './store/change-pass'
import { googleActivation, setStep as setGoogle2faStep } from './store/google2fa'
import { sendOldCode } from './store/change-phone'
import { getOldCode } from './store/change-email'

export const Security: React.FC = () => {
  const { t } = useTranslation('security')
  const { user } = useAuth()
  const [, dispatch] = useRedux()

  if (!user) {
    return null
  }

  return (
    <div className={s.items}>
      <SecurityItem
        onClickButton={() => dispatch(getOldCode())}
        buttonLabel="Change"
        title={t('common:email')}
        subtitle={user.email}
        icon={<Icon id="envelope-open" size="mid-big" colorStroke="white" />}
      />
      <SecurityItem
        onClickButton={() => {
          dispatch(sendOldCode({}))
        }}
        buttonLabel="Change"
        title={t('common:phone-number')}
        subtitle={user.phoneNumber}
        icon={<Icon id="phone-disconnect" size="mid-big" colorStroke="white" />}
      />
      <SecurityItem
        onClickButton={() => dispatch(setStepPass('change-pass'))}
        buttonLabel="Change"
        title={t('common:password')}
        icon={<Icon id="lock-key" size="mid-big" colorStroke="white" />}
      />
      <SecurityItem
        title={t('common:google-2fa')}
        subtitle={user.isGoogle2FAEnabled ? t('2fa.turnOn') : t('2fa.turnOff')}
        subTitleColor={user.isGoogle2FAEnabled ? 'green' : 'red'}
        icon={<Icon id="google" size="mid-big" colorStroke="white" />}
        action={
          <CheckBox
            name="google2fa"
            type="checkbox"
            theme="slider"
            checked={user.isGoogle2FAEnabled}
            onChange={() =>
              user.isGoogle2FAEnabled
                ? dispatch(setGoogle2faStep('disable'))
                : dispatch(googleActivation())
            }
          />
        }
      />
    </div>
  )
}
