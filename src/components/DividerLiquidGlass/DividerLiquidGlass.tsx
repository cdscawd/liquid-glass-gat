import { type HTMLAttributes } from 'react'
import {
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
  type LiquidGlassVariant,
} from '../../lib/liquid-glass'
import './DividerLiquidGlass.scss'

export interface DividerLiquidGlassProps extends HTMLAttributes<HTMLDivElement> {
  glassParams?: LiquidGlassParams
  variant?: LiquidGlassVariant
  orientation?: 'horizontal' | 'vertical'
}

export function DividerLiquidGlass({
  glassParams,
  variant,
  orientation = 'horizontal',
  className = '',
  style,
  ...props
}: DividerLiquidGlassProps) {
  const { hostRef, filterId, mapId, mapUrl, filterSize, filterStyle, borderRadius, variantClass } =
    useLiquidGlassEffect<HTMLDivElement>(glassParams, { baseClass: 'divider-liquid-glass', variant })

  const orientClass =
    orientation === 'horizontal'
      ? ' divider-liquid-glass--horizontal'
      : ' divider-liquid-glass--vertical'

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
        className={`divider-liquid-glass${variantClass}${orientClass}${className ? ` ${className}` : ''}`}
        style={{ ...filterStyle, borderRadius, ...style }}
        {...props}
      />
    </>
  )
}

export default DividerLiquidGlass
