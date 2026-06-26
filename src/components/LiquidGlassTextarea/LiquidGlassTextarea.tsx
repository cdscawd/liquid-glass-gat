import { type TextareaHTMLAttributes } from 'react'
import {
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
} from '../../lib/liquid-glass'
import './LiquidGlassTextarea.scss'

export type LiquidGlassTextareaSize = 'sm' | 'md' | 'lg'

export interface LiquidGlassTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  glassParams?: LiquidGlassParams
  size?: LiquidGlassTextareaSize
}

export function LiquidGlassTextarea({
  glassParams,
  size = 'md',
  className = '',
  style,
  rows = 3,
  ...props
}: LiquidGlassTextareaProps) {
  const { hostRef, filterId, mapId, mapUrl, filterSize, filterStyle, borderRadius } =
    useLiquidGlassEffect<HTMLDivElement>(glassParams)

  const sizeClass = size === 'md' ? '' : ` liquid-glass-textarea--${size}`

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
        className={`liquid-glass-textarea${sizeClass}${className ? ` ${className}` : ''}`}
        style={{ ...filterStyle, borderRadius, ...style }}
      >
        <textarea className="liquid-glass-textarea__field" rows={rows} {...props} />
      </div>
    </>
  )
}

export default LiquidGlassTextarea
