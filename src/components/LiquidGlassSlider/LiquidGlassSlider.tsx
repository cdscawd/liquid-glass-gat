import { type InputHTMLAttributes } from 'react'
import {
  LiquidGlassFilter,
  GLASS_SHAPE,
  useLiquidGlassEffect,
  type LiquidGlassParams,
} from '../../lib/liquid-glass'
import './LiquidGlassSlider.scss'

export interface LiquidGlassSliderProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  glassParams?: LiquidGlassParams
}

export function LiquidGlassSlider({
  glassParams,
  className = '',
  style,
  min = 0,
  max = 100,
  value,
  defaultValue,
  ...props
}: LiquidGlassSliderProps) {
  const { hostRef, filterId, mapId, mapUrl, filterSize, filterStyle, borderRadius } =
    useLiquidGlassEffect<HTMLDivElement>(glassParams, {
      preset: { borderRadius: GLASS_SHAPE.pill },
    })

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
        className={`liquid-glass-slider${className ? ` ${className}` : ''}`}
        style={{ ...filterStyle, borderRadius, ...style }}
      >
        <input
          type="range"
          className="liquid-glass-slider__input"
          min={min}
          max={max}
          value={value}
          defaultValue={defaultValue}
          {...props}
        />
      </div>
    </>
  )
}

export default LiquidGlassSlider
