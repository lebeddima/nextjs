import { TAxiosResponse } from '../types'
import { api } from '../api'

export type TSendPassReq = {
  password: string
  newPassword: string
  repeatedNewPassword: string
}

const sendPass = (data: TSendPassReq): TAxiosResponse<unknown> =>
  api.post('/auth/change/password', data)

export const apiChangePass = {
  sendPass
}
