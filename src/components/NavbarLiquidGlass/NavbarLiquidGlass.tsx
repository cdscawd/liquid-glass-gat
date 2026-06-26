import { type HTMLAttributes, type ReactNode } from 'react'
import {
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
  type LiquidGlassVariant,
} from '../../lib/liquid-glass'
import './NavbarLiquidGlass.scss'

export interface NavbarLiquidGlassProps extends HTMLAttributes<HTMLElement> {
  glassParams?: LiquidGlassParams
  variant?: LiquidGlassVariant
  brand?: ReactNode
  children?: ReactNode
}

export function NavbarLiquidGlass({
  glassParams,
  variant,
  brand,
  children,
  className = '',
  style,
  ...props
}: NavbarLiquidGlassProps) {
  const { hostRef, filterId, mapId, mapUrl, filterSize, filterStyle, borderRadius, variantClass } =
    useLiquidGlassEffect<HTMLElement>(glassParams, { baseClass: 'navbar-liquid-glass', variant })

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
        className={`navbar-liquid-glass${variantClass}${className ? ` ${className}` : ''}`}
        style={{ ...filterStyle, borderRadius, ...style }}
        {...props}
      >
        {brand && <div className="navbar-liquid-glass__brand">{brand}</div>}
        <div className="navbar-liquid-glass__actions">{children}</div>
      </nav>
    </>
  )
}

export default NavbarLiquidGlass
