import React, { CSSProperties, FC } from 'react'
import cn from 'classnames'
import EnvelopeOpen from '@/icons/envelopeOpen.svg'
import SpinnerGap from '@/icons/SpinnerGap.svg'
import X from '@/icons/X.svg'
import UserCircle from '@/icons/user-circle.svg'
import CircleWavyCheck from '@/icons/CircleWavyCheck.svg'
import Fingerprint from '@/icons/Fingerprint.svg'
import Security from '@/icons/Security.svg'
import UserPlus from '@/icons/UserPlus.svg'
import CardHolder from '@/icons/CardHolder.svg'
import Money from '@/icons/Money.svg'
import FacebookLogo from '@/icons/socials/FacebookLogo.svg'
import InstagramLogo from '@/icons/socials/InstagramLogo.svg'
import LinkedinLogo from '@/icons/socials/LinkedinLogo.svg'
import TwitterLogo from '@/icons/socials/TwitterLogo.svg'
import YoutubeLogo from '@/icons/socials/YoutubeLogo.svg'
import Eye from '@/icons/Eye.svg'
import EyeSlash from '@/icons/EyeSlash.svg'
import PhoneDisconnect from '@/icons/PhoneDisconnect.svg'
import WarningCircle from '@/icons/WarningCircle.svg'
import Payment1 from '@/icons/payment1.svg'
import GoogleLogo from '@/icons/socials/GoogleLogo.svg'
import ShieldCheckered from '@/icons/ShieldCheckered.svg'
import Receipt from '@/icons/Receipt.svg'
import ListDashes from '@/icons/ListDashes.svg'
import UserFocus from '@/icons/UserFocus.svg'
import UserCircleMinus from '@/icons/UserCircleMinus.svg'
import Notifications from '@/icons/Notifications.svg'
import Support from '@/icons/support.svg'
import LockKey from '@/icons/LockKey.svg'
import User from '@/icons/User.svg'
import ChevronLeft from '@/icons/ChevronLeft.svg'
import ChevronRight from '@/icons/ChevronRight.svg'
import TrashFull from '@/icons/trashFull.svg'
import MapPin from '@/icons/MapPin.svg'
import Envelope from '@/icons/Envelope.svg'
import FolderSimplePlus from '@/icons/FolderSimplePlus.svg'
import File from '@/icons/File.svg'
import CancelFile from '@/icons/CancelFile.svg'
import XCircle from '@/icons/XCircle.svg'
import InfoCircle from '@/icons/InfoCircle.svg'
import CheckCircle from '@/icons/CheckCircle.svg'
import UserProfile from '@/icons/UserProfile.svg'
import Copy from '@/icons/Copy.svg'
import Bitcoin from '@/icons/btc.svg'
import Euro from '@/icons/eur.svg'
import Star from '@/icons/star.svg'
import CaretDown from '@/icons/CaretDown.svg'
import { TIconProps } from './types'

import s from './Icon.module.scss'

type TIcon = {
  style?: CSSProperties
  className?: string
  disabled?: boolean
} & TIconProps

export const Icon: FC<TIcon> = ({
  id,
  size,
  colorStroke,
  fill,
  className,
  spin,
  disabled,
  ...props
}) => {
  const classes = {
    [s[`size_${size}`]]: size,
    [s[`color-stroke_${colorStroke}`]]: colorStroke !== 'none' && colorStroke,
    [s.spin]: spin,
    [s.disabled]: disabled,
    [s[`fill_${fill}`]]: fill !== 'none' && fill
  }

  const customProps = {
    ...props,
    className: cn(className, classes)
  }

  switch (id) {
    case 'google':
      return <GoogleLogo {...customProps} />
    case 'payment-1':
      return <Payment1 {...customProps} />
    case 'warning-circle':
      return <WarningCircle {...customProps} />
    case 'phone-disconnect':
      return <PhoneDisconnect {...customProps} />
    case 'eyeSlash':
      return <EyeSlash {...customProps} />
    case 'eye':
      return <Eye {...customProps} />
    case 'youtube':
      return <YoutubeLogo {...customProps} />
    case 'twitter':
      return <TwitterLogo {...customProps} />
    case 'instagram':
      return <InstagramLogo {...customProps} />
    case 'linkedin':
      return <LinkedinLogo {...customProps} />
    case 'facebook':
      return <FacebookLogo {...customProps} />
    case 'money':
      return <Money {...customProps} />
    case 'card-holder':
      return <CardHolder {...customProps} />
    case 'user':
      return <User {...customProps} />
    case 'user-plus':
      return <UserPlus {...customProps} />
    case 'security':
      return <Security {...customProps} />
    case 'fingerprint':
      return <Fingerprint {...customProps} />
    case 'circle-wavy-check':
      return <CircleWavyCheck {...customProps} />
    case 'user-circle':
      return <UserCircle {...customProps} />
    case 'envelope-open':
      return <EnvelopeOpen {...customProps} />
    case 'spinner-gap':
      return <SpinnerGap {...customProps} />
    case 'shield-checkered':
      return <ShieldCheckered {...customProps} />
    case 'receipt':
      return <Receipt {...customProps} />
    case 'list-dashes':
      return <ListDashes {...customProps} />
    case 'user-focus':
      return <UserFocus {...customProps} />
    case 'user-circle-minus':
      return <UserCircleMinus {...customProps} />
    case 'notifications':
      return <Notifications {...customProps} />
    case 'support':
      return <Support {...customProps} />
    case 'lock-key':
      return <LockKey {...customProps} />
    case 'x':
      return <X {...customProps} />
    case 'chevron-left':
      return <ChevronLeft {...customProps} />
    case 'chevron-right':
      return <ChevronRight {...customProps} />
    case 'envelope':
      return <Envelope {...customProps} />
    case 'map-pin':
      return <MapPin {...customProps} />
    case 'trash-full':
      return <TrashFull {...customProps} />
    case 'folder':
      return <FolderSimplePlus {...customProps} />
    case 'cancel-file':
      return <CancelFile {...customProps} />
    case 'file':
      return <File {...customProps} />
    case 'info-circle':
      return <InfoCircle {...customProps} />
    case 'x-circle':
      return <XCircle {...customProps} />
    case 'check-circle':
      return <CheckCircle {...customProps} />
    case 'user-profile':
      return <UserProfile {...customProps} />
    case 'copy':
      return <Copy {...customProps} />
    case 'bitcoin':
      return <Bitcoin {...customProps} />
    case 'euro':
      return <Euro {...customProps} />
    case 'star':
      return <Star {...customProps} />
    case 'caret-down':
      return <CaretDown {...customProps} />
    default:
      return <></>
  }
}
