import { type HTMLAttributes } from 'react'
import {
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
} from '../../lib/liquid-glass'
import './LiquidGlassPagination.scss'

export interface LiquidGlassPaginationProps extends HTMLAttributes<HTMLElement> {
  glassParams?: LiquidGlassParams
  page?: number
  totalPages?: number
  onPageChange?: (page: number) => void
}

export function LiquidGlassPagination({
  glassParams,
  page = 1,
  totalPages = 1,
  onPageChange,
  className = '',
  style,
  ...props
}: LiquidGlassPaginationProps) {
  const { hostRef, filterId, mapId, mapUrl, filterSize, filterStyle, borderRadius } =
    useLiquidGlassEffect<HTMLElement>(glassParams)

  const canPrev = page > 1
  const canNext = page < totalPages

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
        aria-label="Pagination"
        className={`liquid-glass-pagination${className ? ` ${className}` : ''}`}
        style={{ ...filterStyle, borderRadius, ...style }}
        {...props}
      >
        <button
          type="button"
          className="liquid-glass-pagination__btn"
          disabled={!canPrev}
          onClick={() => canPrev && onPageChange?.(page - 1)}
        >
          ‹
        </button>
        <span className="liquid-glass-pagination__info">
          {page} / {totalPages}
        </span>
        <button
          type="button"
          className="liquid-glass-pagination__btn"
          disabled={!canNext}
          onClick={() => canNext && onPageChange?.(page + 1)}
        >
          ›
        </button>
      </nav>
    </>
  )
}

export default LiquidGlassPagination
