import { type HTMLAttributes, type ReactNode } from 'react'
import {
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
} from '../../lib/liquid-glass'
import './LiquidGlassNavbar.scss'

export interface LiquidGlassNavbarProps extends HTMLAttributes<HTMLElement> {
  glassParams?: LiquidGlassParams
  brand?: ReactNode
  children?: ReactNode
}

export function LiquidGlassNavbar({
  glassParams,
  brand,
  children,
  className = '',
  style,
  ...props
}: LiquidGlassNavbarProps) {
  const { hostRef, filterId, mapId, mapUrl, filterSize, filterStyle, borderRadius } =
    useLiquidGlassEffect<HTMLElement>(glassParams)

  return (
    <>
      <LiquidGlassFilter
        filterId={filterId}
        mapId={mapId}
        mapUrl={mapUrl}
        width={filterSize.width}
        height={filterSize.height}
      />
      <nav
        ref={hostRef}
        className={`liquid-glass-navbar${className ? ` ${className}` : ''}`}
        style={{ ...filterStyle, borderRadius, ...style }}
        {...props}
      >
        {brand && <div className="liquid-glass-navbar__brand">{brand}</div>}
        <div className="liquid-glass-navbar__actions">{children}</div>
      </nav>
    </>
  )
}

export default LiquidGlassNavbar
