import { type HTMLAttributes, type ReactNode } from 'react'
import { LiquidGlassCard } from '../LiquidGlassCard'
import type { LiquidGlassParams } from '../../lib/liquid-glass'
import './LiquidGlassMediaCard.scss'

export interface LiquidGlassMediaCardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  glassParams?: LiquidGlassParams
  image?: string
  imageAlt?: string
  title?: ReactNode
  description?: ReactNode
  footer?: ReactNode
}

export function LiquidGlassMediaCard({
  glassParams,
  image,
  imageAlt = '',
  title,
  description,
  footer,
  className = '',
  children,
  ...props
}: LiquidGlassMediaCardProps) {
  return (
    <LiquidGlassCard
      glassParams={glassParams}
      className={`liquid-glass-media-card${className ? ` ${className}` : ''}`}
      {...props}
    >
      {image && (
        <div className="liquid-glass-media-card__media">
          <img src={image} alt={imageAlt} />
        </div>
      )}
      {title && <LiquidGlassCard.Header>{title}</LiquidGlassCard.Header>}
      {(description || children) && (
        <LiquidGlassCard.Body>{description ?? children}</LiquidGlassCard.Body>
      )}
      {footer && <LiquidGlassCard.Footer>{footer}</LiquidGlassCard.Footer>}
    </LiquidGlassCard>
  )
}

export default LiquidGlassMediaCard
