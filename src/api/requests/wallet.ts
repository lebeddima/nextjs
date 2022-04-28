import { TAxiosResponse } from '../types'
import { api } from '../api'

export interface IWallet {
  _id: string
  assetInfo: {
    type: string
    name: string
    slug: string
    code: string
    isAbleForDeposit: boolean
    isAbleForWithdrawal: boolean
  }
  availableBalance: number
  holdenBalance: number
  total: number
}

const getWalletRequest = (): TAxiosResponse<IWallet[]> => api.get('/wallet')

export const apiWallet = {
  getWalletRequest
}
