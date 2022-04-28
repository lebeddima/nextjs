import { TAxiosResponse } from '../types'
import { api } from '../api'

export type TCheckTokenReq = {
  token: string
}

export type TSendEmailReq = {
  email: string
}

export type TSendPassReq = {
  token: string
  newPassword: string
  repeatedPassword: string
}

const checkToken = (data: TCheckTokenReq): TAxiosResponse<unknown> =>
  api.post('/auth/forgot-password/token/check', data)

const sendEnail = (data: TSendEmailReq): TAxiosResponse<unknown> =>
  api.get(`/auth/forgot-password/email?email=${data.email}`)

const sendPass = (data: TSendPassReq): TAxiosResponse<unknown> =>
  api.post('/auth/forgot-password/new-password', data)

export const apiRecoveryPass = {
  checkToken,
  sendEnail,
  sendPass
}
