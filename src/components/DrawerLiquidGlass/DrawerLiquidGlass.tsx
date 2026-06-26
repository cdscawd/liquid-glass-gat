import { type HTMLAttributes, type ReactNode } from 'react'
import {
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
  type LiquidGlassVariant,
} from '../../lib/liquid-glass'
import './DrawerLiquidGlass.scss'

export interface DrawerLiquidGlassProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  glassParams?: LiquidGlassParams
  variant?: LiquidGlassVariant
  open?: boolean
  side?: 'left' | 'right'
  title?: ReactNode
  children?: ReactNode
  onClose?: () => void
}

export function DrawerLiquidGlass({
  glassParams,
  variant,
  open = false,
  side = 'left',
  title,
  children,
  onClose,
  className = '',
  style,
  ...props
}: DrawerLiquidGlassProps) {
  const { hostRef, filterId, mapId, mapUrl, filterSize, filterStyle, borderRadius, variantClass } =
    useLiquidGlassEffect<HTMLDivElement>(glassParams, { baseClass: 'drawer-liquid-glass', variant })

  const sideClass = side === 'left' ? '' : ' drawer-liquid-glass--right'

  return (
    <>
      {open && (
        <button
          type="button"
          className="drawer-liquid-glass__backdrop"
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
        className={`drawer-liquid-glass${variantClass}${sideClass}${open ? ' drawer-liquid-glass--open' : ''}${className ? ` ${className}` : ''}`}
        style={{ ...filterStyle, borderRadius, ...style }}
        {...props}
      >
        {title && <div className="drawer-liquid-glass__title">{title}</div>}
        <div className="drawer-liquid-glass__body">{children}</div>
      </aside>
    </>
  )
}

export default DrawerLiquidGlass
