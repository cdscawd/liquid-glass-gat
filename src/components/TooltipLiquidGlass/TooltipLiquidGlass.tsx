import { type HTMLAttributes, type ReactNode, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
  type LiquidGlassVariant,
} from '../../lib/liquid-glass'
import './TooltipLiquidGlass.scss'

export interface TooltipLiquidGlassProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  glassParams?: LiquidGlassParams
  variant?: LiquidGlassVariant
  content: ReactNode
  children: ReactNode
}

export function TooltipLiquidGlass({
  glassParams,
  variant,
  content,
  children,
  className = '',
  style,
  ...props
}: TooltipLiquidGlassProps) {
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const anchorRef = useRef<HTMLSpanElement>(null)

  const { hostRef, filterId, mapId, mapUrl, filterSize, filterStyle, borderRadius, variantClass } =
    useLiquidGlassEffect<HTMLDivElement>(glassParams, { baseClass: 'tooltip-liquid-glass', variant })

  const updatePosition = () => {
    const rect = anchorRef.current?.getBoundingClientRect()
    if (!rect) return
    setPosition({
      top: rect.top - 8,
      left: rect.left + rect.width / 2,
    })
  }

  const show = () => {
    updatePosition()
    setVisible(true)
  }

  return (
    <>
      <span
        ref={anchorRef}
        className="tooltip-liquid-glass__anchor"
        onMouseEnter={show}
        onMouseLeave={() => setVisible(false)}
        onFocus={show}
        onBlur={() => setVisible(false)}
      >
        {children}
      </span>
      {visible &&
        createPortal(
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
              role="tooltip"
              className={`tooltip-liquid-glass${variantClass}${className ? ` ${className}` : ''}`}
              style={{
                ...filterStyle,
                borderRadius,
                top: position.top,
                left: position.left,
                ...style,
              }}
              {...props}
            >
              {content}
            </div>
          </>,
          document.body,
        )}
    </>
  )
}

export default TooltipLiquidGlass
