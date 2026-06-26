import { type HTMLAttributes, type ReactNode } from 'react'
import {
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
  type LiquidGlassVariant,
} from '../../lib/liquid-glass'
import './AlertLiquidGlass.scss'

export type AlertLiquidGlassVariant = LiquidGlassVariant | 'warning'

export interface AlertLiquidGlassProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  glassParams?: LiquidGlassParams
  title?: ReactNode
  children?: ReactNode
  variant?: AlertLiquidGlassVariant
}

export function AlertLiquidGlass({
  glassParams,
  title,
  children,
  variant = 'default',
  className = '',
  style,
  ...props
}: AlertLiquidGlassProps) {
  const isWarning = variant === 'warning'
  const tone: LiquidGlassVariant | undefined = isWarning ? undefined : variant

  const { hostRef, filterId, mapId, mapUrl, filterSize, filterStyle, borderRadius, variantClass } =
    useLiquidGlassEffect<HTMLDivElement>(glassParams, {
      baseClass: 'alert-liquid-glass',
      variant: tone,
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
        role="alert"
        className={`alert-liquid-glass${isWarning ? ' alert-liquid-glass--warning' : ''}${variantClass}${className ? ` ${className}` : ''}`}
        style={{ ...filterStyle, borderRadius, ...style }}
        {...props}
      >
        {title && <div className="alert-liquid-glass__title">{title}</div>}
        {children && <div className="alert-liquid-glass__body">{children}</div>}
      </div>
    </>
  )
}

export default AlertLiquidGlass
