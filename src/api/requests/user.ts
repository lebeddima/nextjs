import { TUserData } from '@/types/auth'
import { TAxiosResponse } from '../types'
import { api } from '../api'

const getProfile = (): TAxiosResponse<TUserData> => api.get('/user/profile')

export const apiUser = {
  getProfile
}
