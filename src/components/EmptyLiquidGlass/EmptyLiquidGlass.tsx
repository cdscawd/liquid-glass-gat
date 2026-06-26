import { type HTMLAttributes, type ReactNode } from 'react'
import {
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
  type LiquidGlassVariant,
} from '../../lib/liquid-glass'
import './EmptyLiquidGlass.scss'

export interface EmptyLiquidGlassProps extends HTMLAttributes<HTMLDivElement> {
  glassParams?: LiquidGlassParams
  variant?: LiquidGlassVariant
  description?: ReactNode
  image?: ReactNode
}

export function EmptyLiquidGlass({
  glassParams,
  variant,
  description = '暂无数据',
  image,
  className = '',
  style,
  children,
  ...props
}: EmptyLiquidGlassProps) {
  const { hostRef, filterId, mapId, mapUrl, filterSize, filterStyle, borderRadius, variantClass } =
    useLiquidGlassEffect<HTMLDivElement>(glassParams, { baseClass: 'empty-liquid-glass', variant })

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
        className={`empty-liquid-glass${variantClass}${className ? ` ${className}` : ''}`}
        style={{ ...filterStyle, borderRadius, ...style }}
        {...props}
      >
        <div className="empty-liquid-glass__image">
          {image ?? <span className="empty-liquid-glass__icon" aria-hidden>◌</span>}
        </div>
        <div className="empty-liquid-glass__desc">{description}</div>
        {children && <div className="empty-liquid-glass__footer">{children}</div>}
      </div>
    </>
  )
}

export default EmptyLiquidGlass
