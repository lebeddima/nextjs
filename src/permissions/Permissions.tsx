import { useRedux } from '@/hooks/useRedux'
import { logout } from '@/store/auth'
import { useAuth } from '@/hooks/useAuth'

export const Permissions: React.FC = ({ children }) => {
  const [, dispatch] = useRedux()
  const { hasAuth, userFetching } = useAuth()

  const notAuth = !userFetching && !hasAuth

  if (notAuth) {
    dispatch(logout())
  }

  return <>{hasAuth && children}</>
}
