import { useState, useEffect } from 'react'
import cn from 'classnames'
import Countdown from 'react-countdown'
import { Button } from '@/components/buttons/Button'
import s from './SendEgain.module.scss'

type SendEgain = {
  onClick: () => void
  time: number
  center?: boolean
  fetching?: boolean
  error?: string
  labelButton: string
  classContainer?: string
  underline?: boolean
}

type Rendered = {
  minutes: number
  seconds: number
}

export const SendEgain: React.FC<SendEgain> = ({
  onClick,
  time,
  center,
  fetching,
  error,
  labelButton,
  classContainer,
  underline = true
}) => {
  const [showCount, setShowCount] = useState(true)
  const [date, setDate] = useState(Date.now() + time)

  useEffect(() => {
    if (fetching || error) return
    setShowCount(true)
    setDate(Date.now() + time)
  }, [fetching])

  const renderer = ({ minutes, seconds }: Rendered) => {
    const addSero = seconds < 10 ? `0${seconds}` : seconds
    return (
      <span className={s.content}>
        0{minutes}:{addSero}
      </span>
    )
  }

  const onStartCount = () => {
    onClick()
  }

  const onComplete = () => {
    setShowCount(false)
  }

  return (
    <div className={cn(s.container, classContainer, { [s.center]: center })}>
      {!showCount ? (
        <Button
          onClick={onStartCount}
          theme="text-blue"
          type="button"
          label={labelButton}
          font="text-medium"
          disabled={fetching}
          underline={underline}
        />
      ) : (
        <div className={s.codeCont}>
          <Countdown
            date={date}
            intervalDelay={1000}
            precision={1}
            renderer={renderer}
            onComplete={onComplete}
          />
        </div>
      )}
      {error && <p className={s.error}>{error}</p>}
    </div>
  )
}
