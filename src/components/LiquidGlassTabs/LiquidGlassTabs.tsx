import { type HTMLAttributes, type ReactNode, useState } from 'react'
import { LiquidGlassButtonGroup } from '../LiquidGlassButtonGroup'
import type { LiquidGlassParams } from '../../lib/liquid-glass'
import './LiquidGlassTabs.scss'

export interface LiquidGlassTabItem {
  value: string
  label: ReactNode
  content: ReactNode
}

export interface LiquidGlassTabsProps extends HTMLAttributes<HTMLDivElement> {
  items: LiquidGlassTabItem[]
  glassParams?: LiquidGlassParams
  thumbGlassParams?: LiquidGlassParams
  size?: 'sm' | 'md' | 'lg'
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}

export function LiquidGlassTabs({
  items,
  glassParams,
  thumbGlassParams,
  size = 'md',
  defaultValue,
  value: valueProp,
  onValueChange,
  className = '',
  ...props
}: LiquidGlassTabsProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? items[0]?.value ?? '')
  const isControlled = valueProp !== undefined
  const value = isControlled ? valueProp : uncontrolled

  const handleChange = (next: string) => {
    if (!isControlled) setUncontrolled(next)
    onValueChange?.(next)
  }

  const active = items.find((item) => item.value === value) ?? items[0]

  return (
    <div className={`liquid-glass-tabs${className ? ` ${className}` : ''}`} {...props}>
      <LiquidGlassButtonGroup
        variant="slider"
        size={size}
        glassParams={glassParams}
        thumbGlassParams={thumbGlassParams}
        value={value}
        onValueChange={handleChange}
      >
        {items.map(({ value: itemValue, label }) => (
          <LiquidGlassButtonGroup.Item key={itemValue} value={itemValue}>
            {label}
          </LiquidGlassButtonGroup.Item>
        ))}
      </LiquidGlassButtonGroup>
      <div className="liquid-glass-tabs__panel">{active?.content}</div>
    </div>
  )
}

export default LiquidGlassTabs
