import Cookie from 'js-cookie'
import { AUTH_TOKEN } from '@/constants/cookies'

export const authToken = {
  set(token: string): void {
    Cookie.set(AUTH_TOKEN, token)
  },
  get(): string | undefined {
    return Cookie.get(AUTH_TOKEN)
  },
  remove(): void {
    Cookie.remove(AUTH_TOKEN)
  }
}
