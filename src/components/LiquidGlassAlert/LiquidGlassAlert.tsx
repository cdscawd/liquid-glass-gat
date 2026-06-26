import { type HTMLAttributes, type ReactNode } from 'react'
import {
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
} from '../../lib/liquid-glass'
import './LiquidGlassAlert.scss'

export type LiquidGlassAlertVariant = 'info' | 'success' | 'warning' | 'error'

export interface LiquidGlassAlertProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  glassParams?: LiquidGlassParams
  title?: ReactNode
  children?: ReactNode
  variant?: LiquidGlassAlertVariant
}

export function LiquidGlassAlert({
  glassParams,
  title,
  children,
  variant = 'info',
  className = '',
  style,
  ...props
}: LiquidGlassAlertProps) {
  const { hostRef, filterId, mapId, mapUrl, filterSize, filterStyle, borderRadius } =
    useLiquidGlassEffect<HTMLDivElement>(glassParams)

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
        className={`liquid-glass-alert liquid-glass-alert--${variant}${className ? ` ${className}` : ''}`}
        style={{ ...filterStyle, borderRadius, ...style }}
        {...props}
      >
        {title && <div className="liquid-glass-alert__title">{title}</div>}
        {children && <div className="liquid-glass-alert__body">{children}</div>}
      </div>
    </>
  )
}

export default LiquidGlassAlert
