import { type HTMLAttributes, type ReactNode } from 'react'
import { LiquidGlassAvatar } from '../LiquidGlassAvatar'
import './LiquidGlassAvatarGroup.scss'

export interface LiquidGlassAvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  max?: number
}

export function LiquidGlassAvatarGroup({
  children,
  max = 4,
  className = '',
  ...props
}: LiquidGlassAvatarGroupProps) {
  const items = Array.isArray(children) ? children : [children]
  const visible = items.slice(0, max)
  const overflow = items.length - max

  return (
    <div
      className={`liquid-glass-avatar-group${className ? ` ${className}` : ''}`}
      {...props}
    >
      {visible}
      {overflow > 0 && (
        <LiquidGlassAvatar size="sm" fallback={`+${overflow}`} />
      )}
    </div>
  )
}

export default LiquidGlassAvatarGroup
