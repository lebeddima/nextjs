import { TUserData, TTokens, TTfa } from '@/types/auth'
import { TAxiosResponse } from '../types'
import { api } from '../api'

export type TSignInReq = {
  phoneNumber?: string
  email?: string | string[]
  password: string
}

type TCodeReq = {
  id: string
  confirmationCode: string
}

type TCodeRes = {
  tokens?: TTokens
  twoFA?: TTfa
}

export type TGoogle2faCheckReq = {
  id: string
  confirmationCode: string
}

// sign-in
const signIn = (data: TSignInReq): TAxiosResponse<TUserData> =>
  api.post('/auth/signin', data)

const sendEmail = (id: string): TAxiosResponse<unknown> =>
  api.get(`/auth/2fa/email/code?id=${id}`)

const sendEmailCode = (data: TCodeReq): TAxiosResponse<TCodeRes> =>
  api.post('auth/2fa/email', data)

const sendSms = (id: string): TAxiosResponse<unknown> =>
  api.get(`/auth/2fa/phone/code?id=${id}`)

const sendSmsCode = (data: TCodeReq): TAxiosResponse<TCodeRes> =>
  api.post('auth/2fa/phone', data)

const sendGoogle2faCode = (data: TGoogle2faCheckReq): TAxiosResponse<TCodeRes> =>
  api.post(`auth/2fa/google/check`, data)

export const apiSignIn = {
  signIn,
  sendEmail,
  sendEmailCode,
  sendSms,
  sendSmsCode,
  sendGoogle2faCode
}
