import { useEffect, useState } from 'react'
import { debounce } from 'throttle-debounce'
import variables from '@/styles/variables.module.scss'

enum ERESOLUTIONS {
  XXS = +variables.xxs,
  XS = +variables.xs,
  SM = +variables.sm,
  MD = +variables.md,
  LG = +variables.lg,
  LG_XLG = +variables.lgXlg,
  XLG = +variables.xlg
}

type TSizes = 'XXS' | 'XS' | 'SM' | 'MD' | 'LG' | 'LG_XLG' | 'XLG'

type TReturn = {
  biggerThan: boolean | null
  resolution: TSizes | null
  size: number | null
}

export const useResolution = (userSize?: TSizes): TReturn => {
  const [biggerThan, setBiggerThan] = useState<boolean | null>(null)
  const [resolution, setResolution] = useState<TSizes | null>(null)
  const [size, setSize] = useState<number | null>(null)

  const getDevice = debounce(200, false, () => {
    const screenWidth = window.innerWidth
    setSize(screenWidth)
    if (screenWidth > ERESOLUTIONS.XLG) {
      setResolution('XLG')
    } else if (screenWidth >= ERESOLUTIONS.LG_XLG) {
      setResolution('LG_XLG')
    } else if (screenWidth >= ERESOLUTIONS.LG) {
      setResolution('LG')
    } else if (screenWidth >= ERESOLUTIONS.MD) {
      setResolution('MD')
    } else if (screenWidth >= ERESOLUTIONS.SM) {
      setResolution('SM')
    } else if (screenWidth >= ERESOLUTIONS.XS) {
      setResolution('XS')
    } else {
      setResolution('XXS')
    }
    if (userSize && screenWidth > ERESOLUTIONS[userSize]) {
      setBiggerThan(true)
    } else {
      setBiggerThan(false)
    }
  })

  useEffect(() => {
    getDevice()
    window.addEventListener('resize', getDevice)
    return () => {
      window.removeEventListener('resize', getDevice)
    }
  }, [])

  return { biggerThan, resolution, size }
}
