import { type InputHTMLAttributes } from 'react'
import {
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
} from '../../lib/liquid-glass'
import './LiquidGlassInput.scss'

export type LiquidGlassInputSize = 'sm' | 'md' | 'lg'

export interface LiquidGlassInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  glassParams?: LiquidGlassParams
  size?: LiquidGlassInputSize
}

export function LiquidGlassInput({
  glassParams,
  size = 'md',
  className = '',
  style,
  ...props
}: LiquidGlassInputProps) {
  const { hostRef, filterId, mapId, mapUrl, filterSize, filterStyle, borderRadius } =
    useLiquidGlassEffect<HTMLDivElement>(glassParams)

  const sizeClass = size === 'md' ? '' : ` liquid-glass-input--${size}`

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
        className={`liquid-glass-input${sizeClass}${className ? ` ${className}` : ''}`}
        style={{ ...filterStyle, borderRadius, ...style }}
      >
        <input className="liquid-glass-input__field" {...props} />
      </div>
    </>
  )
}

export default LiquidGlassInput
