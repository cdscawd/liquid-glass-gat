import {
  Children,
  cloneElement,
  isValidElement,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { AvatarLiquidGlass, type AvatarLiquidGlassProps } from '../AvatarLiquidGlass'
import type { LiquidGlassParams } from '../../lib/liquid-glass'
import './AvatarGroupLiquidGlass.scss'

export interface AvatarGroupLiquidGlassProps extends HTMLAttributes<HTMLDivElement> {
  glassParams?: LiquidGlassParams
  children: ReactNode
  max?: number
}

export function AvatarGroupLiquidGlass({
  glassParams,
  children,
  max = 4,
  className = '',
  ...props
}: AvatarGroupLiquidGlassProps) {
  const items = Children.toArray(children)
  const visible = items.slice(0, max)
  const overflow = items.length - max

  return (
    <div
      className={`avatar-group-liquid-glass${className ? ` ${className}` : ''}`}
      {...props}
    >
      {visible.map((child, index) => {
        if (!isValidElement<AvatarLiquidGlassProps>(child)) return child
        return cloneElement(child, {
          key: child.key ?? index,
          glassParams: child.props.glassParams ?? glassParams,
        })
      })}
      {overflow > 0 && (
        <AvatarLiquidGlass size="sm" glassParams={glassParams} fallback={`+${overflow}`} />
      )}
    </div>
  )
}

export default AvatarGroupLiquidGlass
