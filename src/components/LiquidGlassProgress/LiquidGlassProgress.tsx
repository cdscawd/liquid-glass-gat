import { type HTMLAttributes } from 'react'
import {
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
} from '../../lib/liquid-glass'
import './LiquidGlassProgress.scss'

export interface LiquidGlassProgressProps extends HTMLAttributes<HTMLDivElement> {
  glassParams?: LiquidGlassParams
  value?: number
  max?: number
}

export function LiquidGlassProgress({
  glassParams,
  value = 0,
  max = 100,
  className = '',
  style,
  ...props
}: LiquidGlassProgressProps) {
  const percent = max > 0 ? Math.min(Math.max((value / max) * 100, 0), 100) : 0

  const { hostRef, filterId, mapId, mapUrl, filterSize, filterStyle, borderRadius } =
    useLiquidGlassEffect<HTMLDivElement>({
      borderRadius: glassParams?.borderRadius ?? 999,
      edgeFalloff: glassParams?.edgeFalloff,
      strength: glassParams?.strength,
    })

  const {
    hostRef: fillRef,
    filterId: fillFilterId,
    mapId: fillMapId,
    mapUrl: fillMapUrl,
    filterSize: fillFilterSize,
    filterStyle: fillFilterStyle,
  } = useLiquidGlassEffect<HTMLDivElement>({
    borderRadius: glassParams?.borderRadius ?? 999,
    edgeFalloff: glassParams?.edgeFalloff,
    strength: (glassParams?.strength ?? 1) * 1.1,
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
        filterId={fillFilterId}
        mapId={fillMapId}
        mapUrl={fillMapUrl}
        width={fillFilterSize.width}
        height={fillFilterSize.height}
      />
      <div
        ref={hostRef}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={`liquid-glass-progress${className ? ` ${className}` : ''}`}
        style={{ ...filterStyle, borderRadius, ...style }}
        {...props}
      >
        <div
          ref={fillRef}
          className="liquid-glass-progress__fill"
          style={{
            ...fillFilterStyle,
            width: `${percent}%`,
            borderRadius,
          }}
        />
      </div>
    </>
  )
}

export default LiquidGlassProgress
