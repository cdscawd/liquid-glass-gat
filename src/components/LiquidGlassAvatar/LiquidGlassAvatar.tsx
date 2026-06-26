import { type HTMLAttributes, type ReactNode } from 'react'
import {
  GLASS_SHAPE,
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
} from '../../lib/liquid-glass'
import './LiquidGlassAvatar.scss'

export type LiquidGlassAvatarSize = 'sm' | 'md' | 'lg'

export interface LiquidGlassAvatarProps extends HTMLAttributes<HTMLDivElement> {
  glassParams?: LiquidGlassParams
  size?: LiquidGlassAvatarSize
  src?: string
  alt?: string
  fallback?: ReactNode
}

export function LiquidGlassAvatar({
  glassParams,
  size = 'md',
  src,
  alt = '',
  fallback,
  className = '',
  style,
  children,
  ...props
}: LiquidGlassAvatarProps) {
  const { hostRef, filterId, mapId, mapUrl, filterSize, filterStyle, borderRadius } =
    useLiquidGlassEffect<HTMLDivElement>(glassParams, {
      preset: { borderRadius: GLASS_SHAPE.pill },
    })

  const sizeClass = size === 'md' ? '' : ` liquid-glass-avatar--${size}`

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
        className={`liquid-glass-avatar${sizeClass}${className ? ` ${className}` : ''}`}
        style={{ ...filterStyle, borderRadius, ...style }}
        {...props}
      >
        {src ? (
          <img className="liquid-glass-avatar__img" src={src} alt={alt} />
        ) : (
          <span className="liquid-glass-avatar__fallback">
            {fallback ?? children ?? '?'}
          </span>
        )}
      </div>
    </>
  )
}

export default LiquidGlassAvatar
