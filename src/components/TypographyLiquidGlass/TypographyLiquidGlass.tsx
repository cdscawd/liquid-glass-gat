import { type HTMLAttributes, type ReactNode } from 'react'
import './TypographyLiquidGlass.scss'

export type TypographyLiquidGlassLevel = 1 | 2 | 3 | 4 | 5

export interface TypographyLiquidGlassTitleProps
  extends HTMLAttributes<HTMLHeadingElement> {
  level?: TypographyLiquidGlassLevel
  ellipsis?: boolean
  children?: ReactNode
}

export interface TypographyLiquidGlassTextProps
  extends HTMLAttributes<HTMLSpanElement> {
  type?: 'default' | 'secondary' | 'success' | 'warning' | 'danger'
  strong?: boolean
  italic?: boolean
  underline?: boolean
  delete?: boolean
  ellipsis?: boolean
  children?: ReactNode
}

export interface TypographyLiquidGlassParagraphProps
  extends HTMLAttributes<HTMLParagraphElement> {
  ellipsis?: boolean
  children?: ReactNode
}

const TITLE_TAGS = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
} as const

function TypographyLiquidGlassTitle({
  level = 1,
  ellipsis = false,
  className = '',
  children,
  ...props
}: TypographyLiquidGlassTitleProps) {
  const Tag = TITLE_TAGS[level]
  const classes = `typography-liquid-glass__title typography-liquid-glass__title--h${level}${ellipsis ? ' typography-liquid-glass--ellipsis' : ''}${className ? ` ${className}` : ''}`

  if (Tag === 'h1') return <h1 className={classes} {...props}>{children}</h1>
  if (Tag === 'h2') return <h2 className={classes} {...props}>{children}</h2>
  if (Tag === 'h3') return <h3 className={classes} {...props}>{children}</h3>
  if (Tag === 'h4') return <h4 className={classes} {...props}>{children}</h4>
  return <h5 className={classes} {...props}>{children}</h5>
}

function TypographyLiquidGlassText({
  type = 'default',
  strong = false,
  italic = false,
  underline = false,
  delete: deleted = false,
  ellipsis = false,
  className = '',
  children,
  ...props
}: TypographyLiquidGlassTextProps) {
  const typeClass = type === 'default' ? '' : ` typography-liquid-glass__text--${type}`
  return (
    <span
      className={`typography-liquid-glass__text${typeClass}${strong ? ' typography-liquid-glass__text--strong' : ''}${italic ? ' typography-liquid-glass__text--italic' : ''}${underline ? ' typography-liquid-glass__text--underline' : ''}${deleted ? ' typography-liquid-glass__text--delete' : ''}${ellipsis ? ' typography-liquid-glass--ellipsis' : ''}${className ? ` ${className}` : ''}`}
      {...props}
    >
      {children}
    </span>
  )
}

function TypographyLiquidGlassParagraph({
  ellipsis = false,
  className = '',
  children,
  ...props
}: TypographyLiquidGlassParagraphProps) {
  return (
    <p
      className={`typography-liquid-glass__paragraph${ellipsis ? ' typography-liquid-glass--ellipsis' : ''}${className ? ` ${className}` : ''}`}
      {...props}
    >
      {children}
    </p>
  )
}

export const TypographyLiquidGlass = {
  Title: TypographyLiquidGlassTitle,
  Text: TypographyLiquidGlassText,
  Paragraph: TypographyLiquidGlassParagraph,
}

export default TypographyLiquidGlass
