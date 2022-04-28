import { TAxiosResponse } from '../types'
import { api } from '../api'

export type TCodeReq = {
  code: string
}

export type TNewEmailReq = {
  newEmail: string
}

const getOldEmailCode = (): TAxiosResponse<unknown> =>
  api.get('/auth/change/email/old/code')

const sendOldEmailCode = (data: TCodeReq): TAxiosResponse<TCodeReq> =>
  api.post('auth/change/email/old/check', data)

const sendNewEmail = (data: TNewEmailReq): TAxiosResponse<TNewEmailReq> =>
  api.post('auth/change/email/new/code', data)

const sendNewEmailCode = (data: TCodeReq): TAxiosResponse<TCodeReq> =>
  api.post('auth/change/email/new/check', data)

export const apiChangeEmail = {
  getOldEmailCode,
  sendOldEmailCode,
  sendNewEmail,
  sendNewEmailCode
}
