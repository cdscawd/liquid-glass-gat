import { type HTMLAttributes, type ReactNode } from 'react'
import {
  GLASS_SHAPE,
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
} from '../../lib/liquid-glass'
import './LiquidGlassDock.scss'

export interface LiquidGlassDockItem {
  id: string
  label: string
  icon: ReactNode
  disabled?: boolean
  onClick?: () => void
}

export interface LiquidGlassDockProps extends HTMLAttributes<HTMLDivElement> {
  glassParams?: LiquidGlassParams
  items: LiquidGlassDockItem[]
}

export function LiquidGlassDock({
  glassParams,
  items,
  className = '',
  style,
  ...props
}: LiquidGlassDockProps) {
  const { hostRef, filterId, mapId, mapUrl, filterSize, filterStyle, borderRadius } =
    useLiquidGlassEffect<HTMLDivElement>(glassParams, {
      preset: { borderRadius: GLASS_SHAPE.dock },
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
        role="toolbar"
        aria-label="Dock"
        className={`liquid-glass-dock${className ? ` ${className}` : ''}`}
        style={{ ...filterStyle, borderRadius, ...style }}
        {...props}
      >
        {items.map(({ id, label, icon, disabled, onClick }) => (
          <button
            key={id}
            type="button"
            className="liquid-glass-dock__item"
            aria-label={label}
            disabled={disabled}
            onClick={onClick}
          >
            <span className="liquid-glass-dock__icon">{icon}</span>
          </button>
        ))}
      </div>
    </>
  )
}

export default LiquidGlassDock
