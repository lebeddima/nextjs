import { FC, useEffect } from 'react'
import { getProfile } from '@/store/auth'
import { useRedux } from '@/hooks/useRedux'

export const InitUser: FC = () => {
  const [, dispatch] = useRedux()

  useEffect(() => {
    dispatch(getProfile())
  }, [])

  return null
}
