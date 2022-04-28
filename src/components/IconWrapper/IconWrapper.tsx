import React, { CSSProperties } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import s from './IconWrapper.module.scss'

export type TIconWrapper = {
  shape?: 'circle' | 'rectangle'
  width: number
  borderRadius?: number
  imgLink?: StaticImageData['src']
  colorTheme?:
    | 'back-icon'
    | 'white'
    | 'background'
    | 'gradient'
    | 'red'
    | 'red-secondary'
    | 'green'
    | 'blue'
  color?: string
  alt?: string
  style?: CSSProperties
  className?: string
}

export const IconWrapper: React.FC<TIconWrapper> = ({
  shape = 'circle',
  imgLink,
  color,
  alt,
  colorTheme,
  borderRadius = 0,
  style,
  className,
  children,
  width
}) => {
  const getBorderRadius = () => {
    let border = borderRadius
    if (shape === 'circle') border = width / 2
    return `${border}px`
  }

  const classes = cn(s.container, className, {
    [s[`shape_${shape}`]]: shape,
    [s[`color_${colorTheme}`]]: colorTheme
  })

  const styles = {
    ...style,
    width,
    height: width,
    borderRadius: getBorderRadius(),
    ...(color && { backgroundColor: color })
  }

  return (
    <div className={classes} style={styles}>
      {children}
      {imgLink && <Image className={s.img} src={imgLink} alt={alt} layout="fill" />}
    </div>
  )
}
