import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'
import { Loader } from '@/components/loaders/Loader'
import { ROUTES } from '@/constants/routes'

type TPermissionsPublic = {
  page?: 'auth'
}

export const PermissionsPublic: React.FC<TPermissionsPublic> = ({ children, page }) => {
  const router = useRouter()
  const { authToken } = useAuth()

  const pageAuth = page === 'auth'

  // useEffect(() => {
  //   if (!authToken) return
  //   router.replace(ROUTES.CABINET_PERSONAL_INFO)
  // }, [authToken])

  useEffect(() => {
    if (!pageAuth) return
    if (!authToken) return
    router.replace(ROUTES.CABINET_PERSONAL_INFO)
  }, [authToken])

  // if (authToken) {
  //   return <Loader bgColor="background" fixed />
  // }

  if (authToken && pageAuth) {
    return <Loader bgColor="background" fixed />
  }

  return <>{children}</>
}
