import {
  Children,
  cloneElement,
  isValidElement,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { LiquidGlassAvatar, type LiquidGlassAvatarProps } from '../LiquidGlassAvatar'
import type { LiquidGlassParams } from '../../lib/liquid-glass'
import './LiquidGlassAvatarGroup.scss'

export interface LiquidGlassAvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  glassParams?: LiquidGlassParams
  children: ReactNode
  max?: number
}

export function LiquidGlassAvatarGroup({
  glassParams,
  children,
  max = 4,
  className = '',
  ...props
}: LiquidGlassAvatarGroupProps) {
  const items = Children.toArray(children)
  const visible = items.slice(0, max)
  const overflow = items.length - max

  return (
    <div
      className={`liquid-glass-avatar-group${className ? ` ${className}` : ''}`}
      {...props}
    >
      {visible.map((child, index) => {
        if (!isValidElement<LiquidGlassAvatarProps>(child)) return child
        return cloneElement(child, {
          key: child.key ?? index,
          glassParams: child.props.glassParams ?? glassParams,
        })
      })}
      {overflow > 0 && (
        <LiquidGlassAvatar size="sm" glassParams={glassParams} fallback={`+${overflow}`} />
      )}
    </div>
  )
}

export default LiquidGlassAvatarGroup
