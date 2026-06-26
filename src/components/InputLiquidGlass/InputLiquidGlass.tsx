import { type InputHTMLAttributes } from 'react'
import {
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
  type LiquidGlassVariant,
} from '../../lib/liquid-glass'
import './InputLiquidGlass.scss'

export type InputLiquidGlassSize = 'sm' | 'md' | 'lg'

export interface InputLiquidGlassProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  glassParams?: LiquidGlassParams
  variant?: LiquidGlassVariant
  size?: InputLiquidGlassSize
}

export function InputLiquidGlass({
  glassParams,
  variant,
  size = 'md',
  className = '',
  style,
  ...props
}: InputLiquidGlassProps) {
  const { hostRef, filterId, mapId, mapUrl, filterSize, filterStyle, borderRadius, variantClass } =
    useLiquidGlassEffect<HTMLDivElement>(glassParams, { baseClass: 'input-liquid-glass', variant })

  const sizeClass = size === 'md' ? '' : ` input-liquid-glass--${size}`

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
        className={`input-liquid-glass${sizeClass}${variantClass}${className ? ` ${className}` : ''}`}
        style={{ ...filterStyle, borderRadius, ...style }}
      >
        <input className="input-liquid-glass__field" {...props} />
      </div>
    </>
  )
}

export default InputLiquidGlass
