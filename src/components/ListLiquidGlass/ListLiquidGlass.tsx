import { type HTMLAttributes, type ReactNode } from 'react'
import {
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
  type LiquidGlassVariant,
} from '../../lib/liquid-glass'
import './ListLiquidGlass.scss'

export interface ListLiquidGlassItem {
  id: string
  title: ReactNode
  description?: ReactNode
  selected?: boolean
  disabled?: boolean
  onClick?: () => void
}

export interface ListLiquidGlassProps extends HTMLAttributes<HTMLUListElement> {
  glassParams?: LiquidGlassParams
  variant?: LiquidGlassVariant
  items: ListLiquidGlassItem[]
}

export function ListLiquidGlass({
  glassParams,
  variant,
  items,
  className = '',
  style,
  ...props
}: ListLiquidGlassProps) {
  const { hostRef, filterId, mapId, mapUrl, filterSize, filterStyle, borderRadius, variantClass } =
    useLiquidGlassEffect<HTMLUListElement>(glassParams, { baseClass: 'list-liquid-glass', variant })

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
        className={`list-liquid-glass${variantClass}${className ? ` ${className}` : ''}`}
        style={{ ...filterStyle, borderRadius, ...style }}
        {...props}
      >
        {items.map((item) => (
          <li
            key={item.id}
            className={`list-liquid-glass__item${item.selected ? ' list-liquid-glass__item--selected' : ''}`}
          >
            <button
              type="button"
              className="list-liquid-glass__btn"
              disabled={item.disabled}
              onClick={item.onClick}
            >
              <span className="list-liquid-glass__title">{item.title}</span>
              {item.description && (
                <span className="list-liquid-glass__desc">{item.description}</span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default ListLiquidGlass
