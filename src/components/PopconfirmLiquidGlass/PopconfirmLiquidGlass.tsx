import { type ReactNode } from 'react'
import { ButtonLiquidGlass } from '../ButtonLiquidGlass'
import { PopoverLiquidGlass } from '../PopoverLiquidGlass'
import type { LiquidGlassParams } from '../../lib/liquid-glass'
import './PopconfirmLiquidGlass.scss'

export interface PopconfirmLiquidGlassProps {
  glassParams?: LiquidGlassParams
  title?: ReactNode
  description?: ReactNode
  okText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
  trigger: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function PopconfirmLiquidGlass({
  glassParams,
  title = '确认操作？',
  description,
  okText = '确定',
  cancelText = '取消',
  onConfirm,
  onCancel,
  trigger,
  open,
  defaultOpen,
  onOpenChange,
}: PopconfirmLiquidGlassProps) {
  return (
    <PopoverLiquidGlass
      glassParams={glassParams}
      trigger={trigger}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      content={
        <div className="popconfirm-liquid-glass">
          <div className="popconfirm-liquid-glass__title">{title}</div>
          {description && (
            <div className="popconfirm-liquid-glass__desc">{description}</div>
          )}
          <div className="popconfirm-liquid-glass__actions">
            <ButtonLiquidGlass
              size="sm"
              onClick={() => {
                onCancel?.()
                onOpenChange?.(false)
              }}
            >
              {cancelText}
            </ButtonLiquidGlass>
            <ButtonLiquidGlass
              size="sm"
              onClick={() => {
                onConfirm?.()
                onOpenChange?.(false)
              }}
            >
              {okText}
            </ButtonLiquidGlass>
          </div>
        </div>
      }
    />
  )
}

export default PopconfirmLiquidGlass
