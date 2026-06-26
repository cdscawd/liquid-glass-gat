import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type CSSProperties,
} from 'react'
import {
  DEFAULT_BORDER_RADIUS,
  generateDisplacementMap,
  type LiquidGlassParams,
} from '../../lib/liquid-glass'
import { LiquidGlassFilter } from './LiquidGlassFilter'
import './LiquidGlassButton.scss'

export type LiquidGlassButtonSize = 'sm' | 'md' | 'lg'

export interface LiquidGlassButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  glassParams?: LiquidGlassParams
  size?: LiquidGlassButtonSize
}

const BACKDROP_FILTER =
  'blur(0.25px) contrast(1.2) brightness(1.05) saturate(1.1)'

export function LiquidGlassButton({
  glassParams,
  size = 'md',
  className = '',
  style,
  children,
  ...props
}: LiquidGlassButtonProps) {
  const reactId = useId().replace(/:/g, '')
  const filterId = `liquid-glass-${reactId}`
  const mapId = `${filterId}-map`

  const buttonRef = useRef<HTMLButtonElement>(null)
  const [mapUrl, setMapUrl] = useState('')
  const [filterSize, setFilterSize] = useState({ width: 0, height: 0 })

  const borderRadius = glassParams?.borderRadius ?? DEFAULT_BORDER_RADIUS

  const updateMap = useCallback(
    (width: number, height: number) => {
      if (width < 2 || height < 2) return
      setFilterSize({ width, height })
      setMapUrl(
        generateDisplacementMap({
          width,
          height,
          borderRadius,
          edgeFalloff: glassParams?.edgeFalloff,
          strength: glassParams?.strength,
        }),
      )
    },
    [borderRadius, glassParams?.edgeFalloff, glassParams?.strength],
  )

  useEffect(() => {
    const el = buttonRef.current
    if (!el) return

    const measure = () => {
      const { width, height } = el.getBoundingClientRect()
      updateMap(Math.round(width), Math.round(height))
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [updateMap, children])

  const filterStyle = useMemo(
    (): CSSProperties => ({
      backdropFilter: `url(#${filterId}) ${BACKDROP_FILTER}`,
      WebkitBackdropFilter: `url(#${filterId}) ${BACKDROP_FILTER}`,
    }),
    [filterId],
  )

  const sizeClass = size === 'md' ? '' : ` liquid-glass-button--${size}`

  return (
    <>
      <LiquidGlassFilter
        filterId={filterId}
        mapId={mapId}
        mapUrl={mapUrl}
        width={filterSize.width}
        height={filterSize.height}
      />
      <button
        ref={buttonRef}
        type="button"
        className={`liquid-glass-button${sizeClass}${className ? ` ${className}` : ''}`}
        style={{
          ...filterStyle,
          borderRadius,
          ...style,
        }}
        {...props}
      >
        {children}
      </button>
    </>
  )
}

export default LiquidGlassButton
