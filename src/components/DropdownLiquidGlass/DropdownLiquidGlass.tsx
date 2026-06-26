import { type ReactNode } from 'react'
import { MenuLiquidGlass, type MenuLiquidGlassItem } from '../MenuLiquidGlass'
import { PopoverLiquidGlass } from '../PopoverLiquidGlass'
import type { LiquidGlassParams } from '../../lib/liquid-glass'

export interface DropdownLiquidGlassProps {
  glassParams?: LiquidGlassParams
  menuGlassParams?: LiquidGlassParams
  trigger: ReactNode
  items: MenuLiquidGlassItem[]
  selectedKeys?: string[]
  onSelect?: (key: string) => void
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function DropdownLiquidGlass({
  glassParams,
  menuGlassParams,
  trigger,
  items,
  selectedKeys,
  onSelect,
  open,
  defaultOpen,
  onOpenChange,
}: DropdownLiquidGlassProps) {
  return (
    <PopoverLiquidGlass
      glassParams={glassParams}
      trigger={trigger}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      content={
        <MenuLiquidGlass
          glassParams={menuGlassParams}
          items={items}
          selectedKeys={selectedKeys}
          onSelect={(key) => {
            onSelect?.(key)
            onOpenChange?.(false)
          }}
        />
      }
    />
  )
}

export default DropdownLiquidGlass
