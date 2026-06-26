import { type HTMLAttributes, type ReactNode } from 'react'
import {
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
} from '../../lib/liquid-glass'
import './LiquidGlassCard.scss'

export type LiquidGlassCardSize = 'sm' | 'md' | 'lg'

export interface LiquidGlassCardProps extends HTMLAttributes<HTMLDivElement> {
  glassParams?: LiquidGlassParams
  size?: LiquidGlassCardSize
  children: ReactNode
}

function LiquidGlassCardSection({
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={`liquid-glass-card__section${className ? ` ${className}` : ''}`} {...props} />
}

export function LiquidGlassCard({
  glassParams,
  size = 'md',
  className = '',
  style,
  children,
  ...props
}: LiquidGlassCardProps) {
  const { hostRef, filterId, mapId, mapUrl, filterSize, filterStyle, borderRadius } =
    useLiquidGlassEffect<HTMLDivElement>(glassParams)

  const sizeClass = size === 'md' ? '' : ` liquid-glass-card--${size}`

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
        className={`liquid-glass-card${sizeClass}${className ? ` ${className}` : ''}`}
        style={{ ...filterStyle, borderRadius, ...style }}
        {...props}
      >
        {children}
      </div>
    </>
  )
}

LiquidGlassCard.Header = function LiquidGlassCardHeader(props: HTMLAttributes<HTMLDivElement>) {
  return <LiquidGlassCardSection className="liquid-glass-card__header" {...props} />
}

LiquidGlassCard.Body = function LiquidGlassCardBody(props: HTMLAttributes<HTMLDivElement>) {
  return <LiquidGlassCardSection className="liquid-glass-card__body" {...props} />
}

LiquidGlassCard.Footer = function LiquidGlassCardFooter(props: HTMLAttributes<HTMLDivElement>) {
  return <LiquidGlassCardSection className="liquid-glass-card__footer" {...props} />
}

export default LiquidGlassCard
