import { TAxiosResponse } from '../types'
import { api } from '../api'

export type TSendEmailReq = {
  email: string
}

type TSendEmailResponse = {
  isEmailFree: boolean
}

const sendEmail = (data: TSendEmailReq['email']): TAxiosResponse<TSendEmailResponse> =>
  api.get(`/auth/get-started/check?email=${data}`)

export const apiSendEmail = {
  sendEmail
}
