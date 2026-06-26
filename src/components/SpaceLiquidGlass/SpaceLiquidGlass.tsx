import { type CSSProperties, type HTMLAttributes, type ReactNode } from 'react'
import './SpaceLiquidGlass.scss'

export type SpaceLiquidGlassSize = 'sm' | 'md' | 'lg'

export interface SpaceLiquidGlassProps extends HTMLAttributes<HTMLDivElement> {
  size?: SpaceLiquidGlassSize | number
  direction?: 'horizontal' | 'vertical'
  wrap?: boolean
  align?: CSSProperties['alignItems']
  justify?: CSSProperties['justifyContent']
  split?: ReactNode
}

const SIZE_MAP: Record<SpaceLiquidGlassSize, number> = {
  sm: 8,
  md: 16,
  lg: 24,
}

export function SpaceLiquidGlass({
  size = 'md',
  direction = 'horizontal',
  wrap = false,
  align,
  justify,
  split,
  className = '',
  style,
  children,
  ...props
}: SpaceLiquidGlassProps) {
  const gap = typeof size === 'number' ? size : SIZE_MAP[size]
  const dirClass =
    direction === 'vertical' ? ' space-liquid-glass--vertical' : ''
  const wrapClass = wrap ? ' space-liquid-glass--wrap' : ''

  const childArray = Array.isArray(children)
    ? children
    : children != null
      ? [children]
      : []

  return (
    <div
      className={`space-liquid-glass${dirClass}${wrapClass}${className ? ` ${className}` : ''}`}
      style={{ gap, alignItems: align, justifyContent: justify, ...style }}
      {...props}
    >
      {split
        ? childArray.flatMap((child, i) =>
            i === 0
              ? [child]
              : [
                  <span key={`split-${i}`} className="space-liquid-glass__split">
                    {split}
                  </span>,
                  child,
                ],
          )
        : children}
    </div>
  )
}

export default SpaceLiquidGlass
