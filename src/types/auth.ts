export type TUser = {
  _id: string
  name: string
  surname: string
  dateOfBirth: string
  country: string
  phoneNumber: string
  email: string
  termsOfPrivacyPolicy: boolean
  activated: boolean
  isGoogle2FAEnabled: boolean
}

export type TActivationStatus = {
  emailActivated: boolean
  phoneActivated: boolean
}

export type TTfa = null | 'EMAIL' | 'PHONE' | 'GOOGLE'

export type TTokens = {
  accessToken: string
  refreshToken: string
}

export type TUserData = {
  user: TUser
  activationStatus: TActivationStatus
  twoFA: TTfa
}
