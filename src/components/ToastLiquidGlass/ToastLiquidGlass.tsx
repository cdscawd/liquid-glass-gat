import { type HTMLAttributes, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import {
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
} from '../../lib/liquid-glass'
import './ToastLiquidGlass.scss'

export type ToastLiquidGlassVariant = 'default' | 'success' | 'error'

export interface ToastLiquidGlassProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  glassParams?: LiquidGlassParams
  open?: boolean
  title?: ReactNode
  description?: ReactNode
  variant?: ToastLiquidGlassVariant
}

export function ToastLiquidGlass({
  glassParams,
  open = false,
  title,
  description,
  variant = 'default',
  className = '',
  style,
  ...props
}: ToastLiquidGlassProps) {
  const { hostRef, filterId, mapId, mapUrl, filterSize, filterStyle, borderRadius } =
    useLiquidGlassEffect<HTMLDivElement>(glassParams)

  if (!open) return null

  const variantClass =
    variant === 'default' ? '' : ` toast-liquid-glass--${variant}`

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
        className={`toast-liquid-glass${variantClass}${className ? ` ${className}` : ''}`}
        style={{ ...filterStyle, borderRadius, ...style }}
        {...props}
      >
        {title && <div className="toast-liquid-glass__title">{title}</div>}
        {description && (
          <div className="toast-liquid-glass__desc">{description}</div>
        )}
      </div>
    </>,
    document.body,
  )
}

export default ToastLiquidGlass
