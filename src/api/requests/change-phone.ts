import { TAxiosResponse } from '../types'
import { api } from '../api'

export type TCheckOldPhoneReq = {
  code: string
}

export type TCheckNewCodeReq = {
  newPhone: string
}

export type TCheckNewPhoneReq = {
  code: string
}

const sendOldCode = (): TAxiosResponse<unknown> => api.get('/auth/change/phone/old/code')

const checkOldPhone = (data: TCheckOldPhoneReq): TAxiosResponse<unknown> =>
  api.post(`/auth/change/phone/old/check`, data)

const sendNewCode = (data: TCheckNewCodeReq): TAxiosResponse<unknown> =>
  api.post('/auth/change/phone/new/code', data)

const checkNewPhone = (data: TCheckNewPhoneReq): TAxiosResponse<unknown> =>
  api.post(`/auth/change/phone/new/check`, data)

export const apiChangePhone = {
  sendOldCode,
  checkOldPhone,
  sendNewCode,
  checkNewPhone
}
