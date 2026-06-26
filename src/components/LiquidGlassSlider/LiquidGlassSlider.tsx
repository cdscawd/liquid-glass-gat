import { type InputHTMLAttributes } from 'react'
import {
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
} from '../../lib/liquid-glass'
import './LiquidGlassSlider.scss'

export interface LiquidGlassSliderProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  glassParams?: LiquidGlassParams
  thumbGlassParams?: LiquidGlassParams
}

export function LiquidGlassSlider({
  glassParams,
  thumbGlassParams,
  className = '',
  style,
  min = 0,
  max = 100,
  value,
  defaultValue,
  ...props
}: LiquidGlassSliderProps) {
  const { hostRef, filterId, mapId, mapUrl, filterSize, filterStyle, borderRadius } =
    useLiquidGlassEffect<HTMLDivElement>({
      borderRadius: glassParams?.borderRadius ?? 999,
      edgeFalloff: glassParams?.edgeFalloff,
      strength: glassParams?.strength,
    })

  const {
    hostRef: thumbRef,
    filterId: thumbFilterId,
    mapId: thumbMapId,
    mapUrl: thumbMapUrl,
    filterSize: thumbFilterSize,
    filterStyle: thumbFilterStyle,
  } = useLiquidGlassEffect<HTMLDivElement>({
    borderRadius: thumbGlassParams?.borderRadius ?? 999,
    edgeFalloff: thumbGlassParams?.edgeFalloff ?? glassParams?.edgeFalloff,
    strength: thumbGlassParams?.strength ?? glassParams?.strength ?? 1.15,
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
      <LiquidGlassFilter
        filterId={thumbFilterId}
        mapId={thumbMapId}
        mapUrl={thumbMapUrl}
        width={thumbFilterSize.width}
        height={thumbFilterSize.height}
      />
      <div
        ref={hostRef}
        className={`liquid-glass-slider${className ? ` ${className}` : ''}`}
        style={{ ...filterStyle, borderRadius, ...style }}
      >
        <div
          ref={thumbRef}
          className="liquid-glass-slider__thumb-glass"
          aria-hidden
          style={thumbFilterStyle}
        />
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
