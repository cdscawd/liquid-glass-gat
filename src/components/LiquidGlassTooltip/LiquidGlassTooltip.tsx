import { type HTMLAttributes, type ReactNode, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
} from '../../lib/liquid-glass'
import './LiquidGlassTooltip.scss'

export interface LiquidGlassTooltipProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  glassParams?: LiquidGlassParams
  content: ReactNode
  children: ReactNode
}

export function LiquidGlassTooltip({
  glassParams,
  content,
  children,
  className = '',
  style,
  ...props
}: LiquidGlassTooltipProps) {
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const anchorRef = useRef<HTMLSpanElement>(null)

  const { hostRef, filterId, mapId, mapUrl, filterSize, filterStyle, borderRadius } =
    useLiquidGlassEffect<HTMLDivElement>(glassParams)

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
        className="liquid-glass-tooltip__anchor"
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
              className={`liquid-glass-tooltip${className ? ` ${className}` : ''}`}
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

export default LiquidGlassTooltip
