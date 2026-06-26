import { type HTMLAttributes, type ReactNode, useState } from 'react'
import {
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
} from '../../lib/liquid-glass'
import { ButtonGroupLiquidGlass } from '../ButtonGroupLiquidGlass'
import './TabsLiquidGlass.scss'

export interface LiquidGlassTabItem {
  value: string
  label: ReactNode
  content: ReactNode
}

export interface TabsLiquidGlassProps extends HTMLAttributes<HTMLDivElement> {
  items: LiquidGlassTabItem[]
  glassParams?: LiquidGlassParams
  thumbGlassParams?: LiquidGlassParams
  panelGlassParams?: LiquidGlassParams
  size?: 'sm' | 'md' | 'lg'
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}

function TabsLiquidGlassPanel({
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
        className="tabs-liquid-glass__panel"
        style={{ ...filterStyle, borderRadius }}
      >
        {children}
      </div>
    </>
  )
}

export function TabsLiquidGlass({
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
}: TabsLiquidGlassProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? items[0]?.value ?? '')
  const isControlled = valueProp !== undefined
  const value = isControlled ? valueProp : uncontrolled

  const handleChange = (next: string) => {
    if (!isControlled) setUncontrolled(next)
    onValueChange?.(next)
  }

  const active = items.find((item) => item.value === value) ?? items[0]

  return (
    <div className={`tabs-liquid-glass${className ? ` ${className}` : ''}`} {...props}>
      <ButtonGroupLiquidGlass
        variant="slider"
        size={size}
        glassParams={glassParams}
        thumbGlassParams={thumbGlassParams}
        value={value}
        onValueChange={handleChange}
      >
        {items.map(({ value: itemValue, label }) => (
          <ButtonGroupLiquidGlass.Item key={itemValue} value={itemValue}>
            {label}
          </ButtonGroupLiquidGlass.Item>
        ))}
      </ButtonGroupLiquidGlass>
      <TabsLiquidGlassPanel glassParams={panelGlassParams}>
        {active?.content}
      </TabsLiquidGlassPanel>
    </div>
  )
}

export default TabsLiquidGlass
