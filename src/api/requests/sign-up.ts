import { TUserData } from '@/types/auth'
import { TAxiosResponse } from '../types'
import { api } from '../api'

export type TSignUpReq = {
  name: string
  surname: string
  email: string | string[]
  password: string
  repeatedPassword: string
  dateOfBirth: string
  phoneNumber: string
  country: string
  termsOfPrivacyPolicy: boolean
}

export type TEmailCodeReq = {
  id: string
  emailConfirmationCode: string
}

export type TPhoneCodeReq = {
  id: string
  phoneConfirmationCode: string
}

// sign-up
const signUp = (data: TSignUpReq): TAxiosResponse<TUserData> =>
  api.post('/auth/signup', data)

const sendEmail = (id: string): TAxiosResponse<unknown> =>
  api.get(`/auth/activate/email/code?id=${id}`)

const sendEmailCode = (data: TEmailCodeReq): TAxiosResponse<unknown> =>
  api.post('auth/activate/email', data)

const sendSms = (id: string): TAxiosResponse<unknown> =>
  api.get(`/auth/activate/phone/code?id=${id}`)

const sendSmsCode = (data: TPhoneCodeReq): TAxiosResponse<unknown> =>
  api.post('auth/activate/phone', data)

export const apiSignUp = {
  signUp,
  sendEmail,
  sendEmailCode,
  sendSms,
  sendSmsCode
}
