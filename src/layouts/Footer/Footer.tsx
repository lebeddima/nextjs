import { Button } from '@/components/buttons/Button'
import { ButtonIcon } from '@/components/buttons/ButtonIcon'
import { ROUTES } from '@/routes'
import s from './Footer.module.scss'

export const Footer: React.FC = () => {
  const renderDesktop = () => (
    <section className={s.desktop}>
      <div className={s.top}>
        <div className={s.buttons}>
          <Button
            label="About us"
            linkTo={ROUTES.ABOUT_US}
            theme="text-white"
            dynamicUnderline
          />
          <Button
            label="Contacts"
            theme="text-white"
            linkTo={ROUTES.CONTACT_US}
            dynamicUnderline
          />
          <Button
            label="FAQ"
            theme="text-white"
            linkTo={ROUTES.QUESTIONS}
            dynamicUnderline
          />
          <Button label="Cookie Policy" theme="text-white" dynamicUnderline />
          <Button label="Security Policy" theme="text-white" dynamicUnderline />
        </div>
        <div className={s.buttons}>
          <ButtonIcon icon="youtube" iconColor="white" />
          <ButtonIcon icon="twitter" iconColor="white" />
          <ButtonIcon icon="instagram" iconColor="white" />
          <ButtonIcon icon="linkedin" iconColor="white" />
          <ButtonIcon icon="facebook" iconColor="white" />
        </div>
      </div>
      <div className={s.line} />
      <div className={s.bottom}>
        <div className={s.rights}>© 2021 LYNXCX. All rights reserved.</div>

        <div className={s.buttons}>
          <Button label="Privacy Policy" theme="text-white" dynamicUnderline />
          <Button label="Terms of Use" theme="text-white" dynamicUnderline />
        </div>
      </div>
    </section>
  )

  return renderDesktop()
}
