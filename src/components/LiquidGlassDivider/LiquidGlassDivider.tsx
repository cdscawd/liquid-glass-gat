import { type HTMLAttributes } from 'react'
import {
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
} from '../../lib/liquid-glass'
import './LiquidGlassDivider.scss'

export interface LiquidGlassDividerProps extends HTMLAttributes<HTMLDivElement> {
  glassParams?: LiquidGlassParams
  orientation?: 'horizontal' | 'vertical'
}

export function LiquidGlassDivider({
  glassParams,
  orientation = 'horizontal',
  className = '',
  style,
  ...props
}: LiquidGlassDividerProps) {
  const { hostRef, filterId, mapId, mapUrl, filterSize, filterStyle, borderRadius } =
    useLiquidGlassEffect<HTMLDivElement>(glassParams)

  const orientClass =
    orientation === 'horizontal'
      ? ' liquid-glass-divider--horizontal'
      : ' liquid-glass-divider--vertical'

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
        ref={hostRef}
        role="separator"
        aria-orientation={orientation}
        className={`liquid-glass-divider${orientClass}${className ? ` ${className}` : ''}`}
        style={{ ...filterStyle, borderRadius, ...style }}
        {...props}
      />
    </>
  )
}

export default LiquidGlassDivider
