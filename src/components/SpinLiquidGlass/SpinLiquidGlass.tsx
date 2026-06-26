import { type HTMLAttributes } from 'react'
import {
  GLASS_SHAPE,
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
  type LiquidGlassVariant,
} from '../../lib/liquid-glass'
import './SpinLiquidGlass.scss'

export interface SpinLiquidGlassProps extends HTMLAttributes<HTMLDivElement> {
  glassParams?: LiquidGlassParams
  variant?: LiquidGlassVariant
  spinning?: boolean
  tip?: string
  size?: 'sm' | 'md' | 'lg'
}

export function SpinLiquidGlass({
  glassParams,
  variant,
  spinning = true,
  tip,
  size = 'md',
  className = '',
  style,
  children,
  ...props
}: SpinLiquidGlassProps) {
  const { hostRef, filterId, mapId, mapUrl, filterSize, filterStyle, borderRadius, variantClass } =
    useLiquidGlassEffect<HTMLDivElement>(glassParams, {
      preset: { borderRadius: GLASS_SHAPE.pill },
      baseClass: 'spin-liquid-glass',
      variant,
    })

  const sizeClass = size === 'md' ? '' : ` spin-liquid-glass--${size}`

  if (!spinning && !children) return null

  return (
    <>
      <LiquidGlassFilter
        filterId={filterId}
        mapId={mapId}
        mapUrl={mapUrl}
        width={filterSize.width}
        height={filterSize.height}
      />
      <div
        className={`spin-wrap-liquid-glass${className ? ` ${className}` : ''}`}
        style={style}
      >
        {children}
        {spinning && (
          <div
            ref={hostRef}
            className={`spin-liquid-glass${sizeClass}${variantClass}${children ? ' spin-liquid-glass--overlay' : ''}`}
            style={{ ...filterStyle, borderRadius }}
            role="status"
            aria-live="polite"
            {...props}
          >
            <span className="spin-liquid-glass__indicator" aria-hidden />
            {tip && <span className="spin-liquid-glass__tip">{tip}</span>}
          </div>
        )}
      </div>
    </>
  )
}

export default SpinLiquidGlass
