import { type HTMLAttributes, type ReactNode, useState } from 'react'
import {
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
} from '../../lib/liquid-glass'
import { LiquidGlassButtonGroup } from '../LiquidGlassButtonGroup'
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
  panelGlassParams?: LiquidGlassParams
  size?: 'sm' | 'md' | 'lg'
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}

function LiquidGlassTabsPanel({
  glassParams,
  children,
}: {
  glassParams?: LiquidGlassParams
  children: ReactNode
}) {
  const { hostRef, filterId, mapId, mapUrl, filterSize, filterStyle, borderRadius } =
    useLiquidGlassEffect<HTMLDivElement>(glassParams)

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
        className="liquid-glass-tabs__panel"
        style={{ ...filterStyle, borderRadius }}
      >
        {children}
      </div>
    </>
  )
}

export function LiquidGlassTabs({
  items,
  glassParams,
  thumbGlassParams,
  panelGlassParams,
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
      <LiquidGlassTabsPanel glassParams={panelGlassParams}>
        {active?.content}
      </LiquidGlassTabsPanel>
    </div>
  )
}

export default LiquidGlassTabs
