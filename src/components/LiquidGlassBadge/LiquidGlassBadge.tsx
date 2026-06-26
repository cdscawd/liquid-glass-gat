import { type HTMLAttributes } from 'react'
import {
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
} from '../../lib/liquid-glass'
import './LiquidGlassBadge.scss'

export type LiquidGlassBadgeSize = 'sm' | 'md' | 'lg'
export type LiquidGlassBadgeVariant = 'badge' | 'chip'

export interface LiquidGlassBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  glassParams?: LiquidGlassParams
  size?: LiquidGlassBadgeSize
  variant?: LiquidGlassBadgeVariant
}

export function LiquidGlassBadge({
  glassParams,
  size = 'md',
  variant = 'badge',
  className = '',
  style,
  children,
  ...props
}: LiquidGlassBadgeProps) {
  const resolvedParams = {
    borderRadius: glassParams?.borderRadius ?? (variant === 'chip' ? 999 : 6),
    edgeFalloff: glassParams?.edgeFalloff,
    strength: glassParams?.strength,
  }

  const { hostRef, filterId, mapId, mapUrl, filterSize, filterStyle, borderRadius } =
    useLiquidGlassEffect<HTMLSpanElement>(resolvedParams)

  const sizeClass = size === 'md' ? '' : ` liquid-glass-badge--${size}`
  const variantClass =
    variant === 'badge' ? '' : ` liquid-glass-badge--${variant}`

  return (
    <>
      <LiquidGlassFilter
        filterId={filterId}
        mapId={mapId}
        mapUrl={mapUrl}
        width={filterSize.width}
        height={filterSize.height}
      />
      <span
        ref={hostRef}
        className={`liquid-glass-badge${variantClass}${sizeClass}${className ? ` ${className}` : ''}`}
        style={{ ...filterStyle, borderRadius, ...style }}
        {...props}
      >
        {children}
      </span>
    </>
  )
}

export default LiquidGlassBadge
