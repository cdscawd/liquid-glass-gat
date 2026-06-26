import { type HTMLAttributes, type ReactNode } from 'react'
import {
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
} from '../../lib/liquid-glass'
import './LiquidGlassDrawer.scss'

export interface LiquidGlassDrawerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  glassParams?: LiquidGlassParams
  open?: boolean
  side?: 'left' | 'right'
  title?: ReactNode
  children?: ReactNode
  onClose?: () => void
}

export function LiquidGlassDrawer({
  glassParams,
  open = false,
  side = 'left',
  title,
  children,
  onClose,
  className = '',
  style,
  ...props
}: LiquidGlassDrawerProps) {
  const { hostRef, filterId, mapId, mapUrl, filterSize, filterStyle, borderRadius } =
    useLiquidGlassEffect<HTMLDivElement>(glassParams)

  const sideClass = side === 'left' ? '' : ' liquid-glass-drawer--right'

  return (
    <>
      {open && (
        <button
          type="button"
          className="liquid-glass-drawer__backdrop"
          aria-label="Close drawer"
          onClick={onClose}
        />
      )}
      <LiquidGlassFilter
        filterId={filterId}
        mapId={mapId}
        mapUrl={mapUrl}
        width={filterSize.width}
        height={filterSize.height}
      />
      <aside
        ref={hostRef}
        aria-hidden={!open}
        className={`liquid-glass-drawer${sideClass}${open ? ' liquid-glass-drawer--open' : ''}${className ? ` ${className}` : ''}`}
        style={{ ...filterStyle, borderRadius, ...style }}
        {...props}
      >
        {title && <div className="liquid-glass-drawer__title">{title}</div>}
        <div className="liquid-glass-drawer__body">{children}</div>
      </aside>
    </>
  )
}

export default LiquidGlassDrawer
