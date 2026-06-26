import {
  type HTMLAttributes,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import {
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
} from '../../lib/liquid-glass'
import './LiquidGlassPopover.scss'

export interface LiquidGlassPopoverProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  glassParams?: LiquidGlassParams
  trigger: ReactNode
  content: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function LiquidGlassPopover({
  glassParams,
  trigger,
  content,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className = '',
  style,
  ...props
}: LiquidGlassPopoverProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultOpen)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : uncontrolled

  const anchorRef = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolled(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange],
  )

  const { hostRef, filterId, mapId, mapUrl, filterSize, filterStyle, borderRadius } =
    useLiquidGlassEffect<HTMLDivElement>(glassParams)

  useEffect(() => {
    if (!open || !anchorRef.current) return
    const rect = anchorRef.current.getBoundingClientRect()
    setPosition({
      top: rect.bottom + 8,
      left: rect.left + rect.width / 2,
    })
  }, [open])

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (
        anchorRef.current?.contains(target) ||
        hostRef.current?.contains(target)
      ) {
        return
      }
      setOpen(false)
    }
    window.addEventListener('pointerdown', onPointerDown)
    return () => window.removeEventListener('pointerdown', onPointerDown)
  }, [open, setOpen, hostRef])

  return (
    <>
      <button
        ref={anchorRef}
        type="button"
        className="liquid-glass-popover__trigger"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {trigger}
      </button>
      {open &&
        createPortal(
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
              role="dialog"
              className={`liquid-glass-popover${className ? ` ${className}` : ''}`}
              style={{
                ...filterStyle,
                borderRadius,
                top: position.top,
                left: position.left,
                ...style,
              }}
              {...props}
            >
              {content}
            </div>
          </>,
          document.body,
        )}
    </>
  )
}

export default LiquidGlassPopover
