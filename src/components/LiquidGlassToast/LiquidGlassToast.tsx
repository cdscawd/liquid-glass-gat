import { type HTMLAttributes, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import {
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
} from '../../lib/liquid-glass'
import './LiquidGlassToast.scss'

export type LiquidGlassToastVariant = 'default' | 'success' | 'error'

export interface LiquidGlassToastProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  glassParams?: LiquidGlassParams
  open?: boolean
  title?: ReactNode
  description?: ReactNode
  variant?: LiquidGlassToastVariant
}

export function LiquidGlassToast({
  glassParams,
  open = false,
  title,
  description,
  variant = 'default',
  className = '',
  style,
  ...props
}: LiquidGlassToastProps) {
  const { hostRef, filterId, mapId, mapUrl, filterSize, filterStyle, borderRadius } =
    useLiquidGlassEffect<HTMLDivElement>(glassParams)

  if (!open) return null

  const variantClass =
    variant === 'default' ? '' : ` liquid-glass-toast--${variant}`

  return createPortal(
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
        role="status"
        aria-live="polite"
        className={`liquid-glass-toast${variantClass}${className ? ` ${className}` : ''}`}
        style={{ ...filterStyle, borderRadius, ...style }}
        {...props}
      >
        {title && <div className="liquid-glass-toast__title">{title}</div>}
        {description && (
          <div className="liquid-glass-toast__desc">{description}</div>
        )}
      </div>
    </>,
    document.body,
  )
}

export default LiquidGlassToast
