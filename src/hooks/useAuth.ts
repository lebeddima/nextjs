import { useRedux } from '@/hooks/useRedux'
import { selectUser, TInit, logout as logoutAction } from '@/store/auth'
import { authToken } from '@/browserApi/authToken'

type TUseProfileData = TInit & {
  authToken?: string
  logout: () => void
}

export const useAuth = (): TUseProfileData => {
  const token = authToken.get()

  const [select, dispatch] = useRedux()
  const auth = select(selectUser)
  const logout = () => dispatch(logoutAction())

  return { ...auth, logout, authToken: token }
}
