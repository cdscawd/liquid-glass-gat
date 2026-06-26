import { type HTMLAttributes, type ReactNode } from 'react'
import {
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
} from '../../lib/liquid-glass'
import './LiquidGlassBreadcrumb.scss'

export interface LiquidGlassBreadcrumbItem {
  label: ReactNode
  href?: string
  onClick?: () => void
}

export interface LiquidGlassBreadcrumbProps extends HTMLAttributes<HTMLElement> {
  glassParams?: LiquidGlassParams
  items: LiquidGlassBreadcrumbItem[]
}

export function LiquidGlassBreadcrumb({
  glassParams,
  items,
  className = '',
  style,
  ...props
}: LiquidGlassBreadcrumbProps) {
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
        aria-label="Breadcrumb"
        className={`liquid-glass-breadcrumb${className ? ` ${className}` : ''}`}
        style={{ ...filterStyle, borderRadius, ...style }}
        {...props}
      >
        <ol className="liquid-glass-breadcrumb__list">
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            return (
              <li key={index} className="liquid-glass-breadcrumb__item">
                {item.href && !isLast ? (
                  <a href={item.href} className="liquid-glass-breadcrumb__link">
                    {item.label}
                  </a>
                ) : (
                  <button
                    type="button"
                    className={`liquid-glass-breadcrumb__link${isLast ? ' liquid-glass-breadcrumb__link--current' : ''}`}
                    disabled={isLast}
                    onClick={item.onClick}
                  >
                    {item.label}
                  </button>
                )}
                {!isLast && (
                  <span className="liquid-glass-breadcrumb__sep" aria-hidden>
                    /
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}

export default LiquidGlassBreadcrumb
