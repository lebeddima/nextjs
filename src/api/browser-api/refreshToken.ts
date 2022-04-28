import { REFRESH_TOKEN } from '@/constants/localStorage'

export const refreshToken = {
  set(token: string): void {
    localStorage.setItem(REFRESH_TOKEN, token)
  },
  get(): string | null {
    return localStorage.getItem(REFRESH_TOKEN)
  },
  remove(): void {
    localStorage.removeItem(REFRESH_TOKEN)
  }
}
