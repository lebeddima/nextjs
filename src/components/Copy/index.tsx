import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Popup from 'reactjs-popup'
import useTranslation from 'next-translate/useTranslation'
import s from './Copy.module.scss'
import { Icon } from '../Icon'

type Copy = {
  text: string | number
}

export const Copy: React.FC<Copy> = ({ text, children }) => {
  const { t } = useTranslation('common')
  const [copied, setCopied] = useState(false)

  const onCopied = () => {
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  return (
    <>
      <Popup
        open={copied}
        trigger={
          <div className={s.container}>
            <CopyToClipboard text={text.toString()} onCopy={onCopied}>
              {children ?? <Icon id="copy" size="small" className={s.icon} />}
            </CopyToClipboard>
          </div>
        }
        position="top center"
        arrow={false}
        closeOnDocumentClick
      >
        <div className={s.popup}>{t('common:copied')}</div>
      </Popup>
    </>
  )
}
