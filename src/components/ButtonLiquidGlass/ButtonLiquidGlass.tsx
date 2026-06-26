import {
  type ButtonHTMLAttributes,
} from 'react'
import {
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
  type LiquidGlassVariant,
} from '../../lib/liquid-glass'
import './ButtonLiquidGlass.scss'

export type ButtonLiquidGlassSize = 'sm' | 'md' | 'lg'
export type { LiquidGlassVariant as ButtonLiquidGlassVariant } from '../../lib/liquid-glass'

export interface ButtonLiquidGlassProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  glassParams?: LiquidGlassParams
  variant?: LiquidGlassVariant
  size?: ButtonLiquidGlassSize
}

export function ButtonLiquidGlass({
  glassParams,
  variant,
  size = 'md',
  className = '',
  style,
  children,
  ...props
}: ButtonLiquidGlassProps) {
  const { hostRef, filterId, mapId, mapUrl, filterSize, filterStyle, borderRadius, variantClass } =
    useLiquidGlassEffect<HTMLButtonElement>(glassParams, { baseClass: 'button-liquid-glass', variant })

  const sizeClass = size === 'md' ? '' : ` button-liquid-glass--${size}`

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
        className={`button-liquid-glass${sizeClass}${variantClass}${className ? ` ${className}` : ''}`}
        style={{
          ...filterStyle,
          borderRadius,
          ...style,
        }}
        {...props}
      >
        {children}
      </button>
    </>
  )
}

export default ButtonLiquidGlass
