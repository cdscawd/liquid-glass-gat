import { type HTMLAttributes, type ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
} from '../../lib/liquid-glass'
import './LiquidGlassModal.scss'

export interface LiquidGlassModalProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  glassParams?: LiquidGlassParams
  open?: boolean
  title?: ReactNode
  children?: ReactNode
  footer?: ReactNode
  onClose?: () => void
}

export function LiquidGlassModal({
  glassParams,
  open = false,
  title,
  children,
  footer,
  onClose,
  className = '',
  style,
  ...props
}: LiquidGlassModalProps) {
  const { hostRef, filterId, mapId, mapUrl, filterSize, filterStyle, borderRadius } =
    useLiquidGlassEffect<HTMLDivElement>(glassParams)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="liquid-glass-modal__root">
      <button
        type="button"
        className="liquid-glass-modal__backdrop"
        aria-label="Close modal"
        onClick={onClose}
      />
      <LiquidGlassFilter
        filterId={filterId}
        mapId={mapId}
        mapUrl={mapUrl}
        width={filterSize.width}
        height={filterSize.height}
      />
      <div
        ref={hostRef}
        role="dialog"
        aria-modal="true"
        className={`liquid-glass-modal${className ? ` ${className}` : ''}`}
        style={{ ...filterStyle, borderRadius, ...style }}
        {...props}
      >
        {title && <div className="liquid-glass-modal__title">{title}</div>}
        <div className="liquid-glass-modal__body">{children}</div>
        {footer && <div className="liquid-glass-modal__footer">{footer}</div>}
      </div>
    </div>,
    document.body,
  )
}

export default LiquidGlassModal
