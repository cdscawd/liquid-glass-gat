import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import {
  GLASS_SHAPE,
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
  type LiquidGlassVariant,
} from '../../lib/liquid-glass'
import './IconButtonLiquidGlass.scss'

export type IconButtonLiquidGlassSize = 'sm' | 'md' | 'lg'

export interface IconButtonLiquidGlassProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  glassParams?: LiquidGlassParams
  variant?: LiquidGlassVariant
  size?: IconButtonLiquidGlassSize
  'aria-label': string
  children: ReactNode
}

export function IconButtonLiquidGlass({
  glassParams,
  variant,
  size = 'md',
  className = '',
  style,
  children,
  ...props
}: IconButtonLiquidGlassProps) {
  const { hostRef, filterId, mapId, mapUrl, filterSize, filterStyle, borderRadius, variantClass } =
    useLiquidGlassEffect<HTMLButtonElement>(glassParams, {
      preset: { borderRadius: GLASS_SHAPE.pill },
      baseClass: 'icon-button-liquid-glass',
      variant,
    })

  const sizeClass = size === 'md' ? '' : ` icon-button-liquid-glass--${size}`

  return (
    <>
      <LiquidGlassFilter
        filterId={filterId}
        mapId={mapId}
        mapUrl={mapUrl}
        width={filterSize.width}
        height={filterSize.height}
      />
      <button
        ref={hostRef}
        type="button"
        className={`icon-button-liquid-glass${sizeClass}${variantClass}${className ? ` ${className}` : ''}`}
        style={{ ...filterStyle, borderRadius, ...style }}
        {...props}
      >
        {children}
      </button>
    </>
  )
}

export default IconButtonLiquidGlass
