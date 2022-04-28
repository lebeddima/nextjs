import { TAxiosResponse } from '../types'
import { api } from '../api'

export type TActivateResponse = {
  qrCode: string
  secret: string
}

export type TSubmitReq = {
  confirmationCode: string
}

export type TSubmitResponse = {
  backupCodes: string[]
}

export type TDisableReq = {
  confirmationCode: string
}

const activate = (): TAxiosResponse<TActivateResponse> =>
  api.get('auth/2fa/google/activate')

const submit = (data: TSubmitReq): TAxiosResponse<TSubmitResponse> =>
  api.post('auth/2fa/google/submit', data)

const disable = (data: TDisableReq): TAxiosResponse<unknown> =>
  api.post('auth/2fa/google/disable', data)

export const apiGoogle2fa = {
  activate,
  submit,
  disable
}
