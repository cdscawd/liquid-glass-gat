import { type HTMLAttributes, type ReactNode } from 'react'
import {
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
} from '../../lib/liquid-glass'
import './LiquidGlassList.scss'

export interface LiquidGlassListItem {
  id: string
  title: ReactNode
  description?: ReactNode
  selected?: boolean
  disabled?: boolean
  onClick?: () => void
}

export interface LiquidGlassListProps extends HTMLAttributes<HTMLUListElement> {
  glassParams?: LiquidGlassParams
  items: LiquidGlassListItem[]
}

export function LiquidGlassList({
  glassParams,
  items,
  className = '',
  style,
  ...props
}: LiquidGlassListProps) {
  const { hostRef, filterId, mapId, mapUrl, filterSize, filterStyle, borderRadius } =
    useLiquidGlassEffect<HTMLUListElement>(glassParams)

  return (
    <>
      <LiquidGlassFilter
        filterId={filterId}
        mapId={mapId}
        mapUrl={mapUrl}
        width={filterSize.width}
        height={filterSize.height}
      />
      <ul
        ref={hostRef}
        className={`liquid-glass-list${className ? ` ${className}` : ''}`}
        style={{ ...filterStyle, borderRadius, ...style }}
        {...props}
      >
        {items.map((item) => (
          <li
            key={item.id}
            className={`liquid-glass-list__item${item.selected ? ' liquid-glass-list__item--selected' : ''}`}
          >
            <button
              type="button"
              className="liquid-glass-list__btn"
              disabled={item.disabled}
              onClick={item.onClick}
            >
              <span className="liquid-glass-list__title">{item.title}</span>
              {item.description && (
                <span className="liquid-glass-list__desc">{item.description}</span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default LiquidGlassList
