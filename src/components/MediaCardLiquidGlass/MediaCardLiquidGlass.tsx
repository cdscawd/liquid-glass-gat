import { type HTMLAttributes, type ReactNode } from 'react'
import { CardLiquidGlass, type CardLiquidGlassSize } from '../CardLiquidGlass'
import type { LiquidGlassParams } from '../../lib/liquid-glass'
import './MediaCardLiquidGlass.scss'

export interface MediaCardLiquidGlassProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  glassParams?: LiquidGlassParams
  size?: CardLiquidGlassSize
  image?: string
  imageAlt?: string
  title?: ReactNode
  description?: ReactNode
  footer?: ReactNode
}

export function MediaCardLiquidGlass({
  glassParams,
  size = 'md',
  image,
  imageAlt = '',
  title,
  description,
  footer,
  className = '',
  children,
  ...props
}: MediaCardLiquidGlassProps) {
  return (
    <CardLiquidGlass
      glassParams={glassParams}
      size={size}
      className={`media-card-liquid-glass${className ? ` ${className}` : ''}`}
      {...props}
    >
      {image && (
        <div className="media-card-liquid-glass__media">
          <img src={image} alt={imageAlt} />
        </div>
      )}
      {title && <CardLiquidGlass.Header>{title}</CardLiquidGlass.Header>}
      {(description || children) && (
        <CardLiquidGlass.Body>{description ?? children}</CardLiquidGlass.Body>
      )}
      {footer && <CardLiquidGlass.Footer>{footer}</CardLiquidGlass.Footer>}
    </CardLiquidGlass>
  )
}

export default MediaCardLiquidGlass
