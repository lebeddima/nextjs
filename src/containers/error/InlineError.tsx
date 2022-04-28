import { useLayoutEffect } from 'react'
import { useRedux } from '@/hooks/useRedux'
import { selectError, setInlineError } from '@/store/error'
import s from './styles/InlineError.module.scss'

export const InlineError: React.FC = () => {
  const [select, dispatch] = useRedux()
  const { inlineError } = select(selectError)

  useLayoutEffect(() => {
    dispatch(setInlineError(''))

    return () => {
      dispatch(setInlineError(''))
    }
  }, [])

  if (!inlineError) return null

  return <p className={s.error}>{inlineError}</p>
}
