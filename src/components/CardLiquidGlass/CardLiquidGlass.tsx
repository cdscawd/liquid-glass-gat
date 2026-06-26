import { type HTMLAttributes, type ReactNode } from 'react'
import {
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
  type LiquidGlassVariant,
} from '../../lib/liquid-glass'
import './CardLiquidGlass.scss'

export type CardLiquidGlassSize = 'sm' | 'md' | 'lg'

export interface CardLiquidGlassProps extends HTMLAttributes<HTMLDivElement> {
  glassParams?: LiquidGlassParams
  variant?: LiquidGlassVariant
  size?: CardLiquidGlassSize
  children: ReactNode
}

function CardLiquidGlassSection({
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={`card-liquid-glass__section${className ? ` ${className}` : ''}`} {...props} />
}

export function CardLiquidGlass({
  glassParams,
  variant,
  size = 'md',
  className = '',
  style,
  children,
  ...props
}: CardLiquidGlassProps) {
  const { hostRef, filterId, mapId, mapUrl, filterSize, filterStyle, borderRadius, variantClass } =
    useLiquidGlassEffect<HTMLDivElement>(glassParams, {
      baseClass: 'card-liquid-glass',
      variant,
    })

  const sizeClass = size === 'md' ? '' : ` card-liquid-glass--${size}`

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
        className={`card-liquid-glass${sizeClass}${variantClass}${className ? ` ${className}` : ''}`}
        style={{ ...filterStyle, borderRadius, ...style }}
        {...props}
      >
        {children}
      </div>
    </>
  )
}

CardLiquidGlass.Header = function CardLiquidGlassHeader(props: HTMLAttributes<HTMLDivElement>) {
  return <CardLiquidGlassSection className="card-liquid-glass__header" {...props} />
}

CardLiquidGlass.Body = function CardLiquidGlassBody(props: HTMLAttributes<HTMLDivElement>) {
  return <CardLiquidGlassSection className="card-liquid-glass__body" {...props} />
}

CardLiquidGlass.Footer = function CardLiquidGlassFooter(props: HTMLAttributes<HTMLDivElement>) {
  return <CardLiquidGlassSection className="card-liquid-glass__footer" {...props} />
}

export default CardLiquidGlass
