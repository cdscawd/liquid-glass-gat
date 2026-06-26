import { type HTMLAttributes } from 'react'
import {
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
  type LiquidGlassVariant,
} from '../../lib/liquid-glass'
import './SkeletonLiquidGlass.scss'

export interface SkeletonLiquidGlassProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  glassParams?: LiquidGlassParams
  variant?: LiquidGlassVariant
  active?: boolean
  avatar?: boolean
  paragraph?: boolean | { rows?: number }
  title?: boolean
}

export function SkeletonLiquidGlass({
  glassParams,
  variant,
  active = true,
  avatar = false,
  paragraph = true,
  title = true,
  className = '',
  style,
  ...props
}: SkeletonLiquidGlassProps) {
  const { hostRef, filterId, mapId, mapUrl, filterSize, filterStyle, borderRadius, variantClass } =
    useLiquidGlassEffect<HTMLDivElement>(glassParams, { baseClass: 'skeleton-liquid-glass', variant })

  const rows =
    typeof paragraph === 'object' ? (paragraph.rows ?? 3) : paragraph ? 3 : 0

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
        className={`skeleton-liquid-glass${variantClass}${active ? ' skeleton-liquid-glass--active' : ''}${className ? ` ${className}` : ''}`}
        style={{ ...filterStyle, borderRadius, ...style }}
        aria-hidden
        {...props}
      >
        {avatar && <div className="skeleton-liquid-glass__avatar" />}
        <div className="skeleton-liquid-glass__content">
          {title && <div className="skeleton-liquid-glass__title" />}
          {rows > 0 &&
            Array.from({ length: rows }, (_, i) => (
              <div
                key={i}
                className="skeleton-liquid-glass__line"
                style={{ width: i === rows - 1 ? '60%' : '100%' }}
              />
            ))}
        </div>
      </div>
    </>
  )
}

export default SkeletonLiquidGlass
