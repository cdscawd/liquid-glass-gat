import {
  type ButtonHTMLAttributes,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  DEFAULT_BORDER_RADIUS,
  LiquidGlassFilter,
  useLiquidGlassEffect,
  type LiquidGlassParams,
} from '../../lib/liquid-glass'
import './LiquidGlassSwitch.scss'

const THUMB_INSET = 3

export type LiquidGlassSwitchSize = 'sm' | 'md' | 'lg'

export interface LiquidGlassSwitchProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'value'> {
  glassParams?: LiquidGlassParams
  thumbGlassParams?: LiquidGlassParams
  size?: LiquidGlassSwitchSize
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

function getThumbRadius(borderRadius: number, height: number): number {
  if (borderRadius >= 999 || borderRadius >= height / 2) return 999
  return Math.max(0, borderRadius - THUMB_INSET)
}

export function LiquidGlassSwitch({
  glassParams,
  thumbGlassParams,
  size = 'md',
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  className = '',
  style,
  disabled,
  ...props
}: LiquidGlassSwitchProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultChecked)
  const isControlled = checkedProp !== undefined
  const checked = isControlled ? checkedProp : uncontrolled

  const trackRef = useRef<HTMLButtonElement>(null)
  const [trackSize, setTrackSize] = useState({ width: 0, height: 0 })

  const toggle = useCallback(() => {
    if (disabled) return
    const next = !checked
    if (!isControlled) setUncontrolled(next)
    onCheckedChange?.(next)
  }, [checked, disabled, isControlled, onCheckedChange])

  const { hostRef, filterId, mapId, mapUrl, filterSize, filterStyle, borderRadius } =
    useLiquidGlassEffect<HTMLButtonElement>({
      borderRadius: glassParams?.borderRadius ?? 999,
      edgeFalloff: glassParams?.edgeFalloff,
      strength: glassParams?.strength,
    })

  useLayoutEffect(() => {
    const el = trackRef.current
    if (!el) return
    const measure = () => {
      const { width, height } = el.getBoundingClientRect()
      setTrackSize({ width, height })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [size])

  const thumbHeight = Math.max(trackSize.height - THUMB_INSET * 2, 0)
  const thumbWidth = thumbHeight
  const thumbLeft = checked
    ? Math.max(trackSize.width - thumbWidth - THUMB_INSET, THUMB_INSET)
    : THUMB_INSET

  const thumbRadius = getThumbRadius(
    thumbGlassParams?.borderRadius ??
      glassParams?.borderRadius ??
      DEFAULT_BORDER_RADIUS,
    thumbHeight,
  )

  const resolvedThumbGlassParams = useMemo(
    (): LiquidGlassParams => ({
      borderRadius: thumbRadius,
      edgeFalloff: thumbGlassParams?.edgeFalloff ?? glassParams?.edgeFalloff,
      strength: thumbGlassParams?.strength ?? glassParams?.strength ?? 1.15,
    }),
    [
      glassParams?.edgeFalloff,
      glassParams?.strength,
      thumbGlassParams?.edgeFalloff,
      thumbGlassParams?.strength,
      thumbRadius,
    ],
  )

  const {
    hostRef: thumbRef,
    filterId: thumbFilterId,
    mapId: thumbMapId,
    mapUrl: thumbMapUrl,
    filterSize: thumbFilterSize,
    filterStyle: thumbFilterStyle,
  } = useLiquidGlassEffect<HTMLDivElement>(resolvedThumbGlassParams)

  const sizeClass = size === 'md' ? '' : ` liquid-glass-switch--${size}`

  const setRefs = useCallback(
    (node: HTMLButtonElement | null) => {
      trackRef.current = node
      hostRef.current = node
    },
    [hostRef],
  )

  return (
    <>
      <LiquidGlassFilter
        filterId={filterId}
        mapId={mapId}
        mapUrl={mapUrl}
        width={filterSize.width}
        height={filterSize.height}
      />
      {trackSize.width > 0 && (
        <LiquidGlassFilter
          filterId={thumbFilterId}
          mapId={thumbMapId}
          mapUrl={thumbMapUrl}
          width={thumbFilterSize.width}
          height={thumbFilterSize.height}
        />
      )}
      <button
        ref={setRefs}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        className={`liquid-glass-switch${sizeClass}${checked ? ' liquid-glass-switch--checked' : ''}${className ? ` ${className}` : ''}`}
        style={{ ...filterStyle, borderRadius, ...style }}
        onClick={toggle}
        {...props}
      >
        {trackSize.width > 0 && (
          <span
            ref={thumbRef}
            className="liquid-glass-switch__thumb"
            aria-hidden
            style={{
              ...thumbFilterStyle,
              width: thumbWidth,
              height: thumbHeight,
              transform: `translate3d(${thumbLeft}px, ${THUMB_INSET}px, 0)`,
              borderRadius: thumbRadius >= 999 ? '999px' : `${thumbRadius}px`,
            }}
          />
        )}
      </button>
    </>
  )
}

export default LiquidGlassSwitch
