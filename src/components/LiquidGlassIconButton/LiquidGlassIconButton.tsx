import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import {
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
} from '../../lib/liquid-glass'
import './LiquidGlassIconButton.scss'

export type LiquidGlassIconButtonSize = 'sm' | 'md' | 'lg'

export interface LiquidGlassIconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  glassParams?: LiquidGlassParams
  size?: LiquidGlassIconButtonSize
  'aria-label': string
  children: ReactNode
}

export function LiquidGlassIconButton({
  glassParams,
  size = 'md',
  className = '',
  style,
  children,
  ...props
}: LiquidGlassIconButtonProps) {
  const resolvedParams = {
    borderRadius: glassParams?.borderRadius ?? 999,
    edgeFalloff: glassParams?.edgeFalloff,
    strength: glassParams?.strength,
  }

  const { hostRef, filterId, mapId, mapUrl, filterSize, filterStyle, borderRadius } =
    useLiquidGlassEffect<HTMLButtonElement>(resolvedParams)

  const sizeClass = size === 'md' ? '' : ` liquid-glass-icon-button--${size}`

  return (
    <>
      <LiquidGlassFilter
        filterId={filterId}
        mapId={mapId}
        mapUrl={mapUrl}
        width={filterSize.width}
        height={filterSize.height}
      />
      <button
        ref={hostRef}
        type="button"
        className={`liquid-glass-icon-button${sizeClass}${className ? ` ${className}` : ''}`}
        style={{ ...filterStyle, borderRadius, ...style }}
        {...props}
      >
        {children}
      </button>
    </>
  )
}

export default LiquidGlassIconButton
