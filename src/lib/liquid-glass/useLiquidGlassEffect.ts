import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from 'react'
import { BACKDROP_FILTER } from './constants'
import { useLiquidGlassDefaults, useLiquidGlassVariantDefault } from './LiquidGlassProvider'
import { generateDisplacementMap } from './generateDisplacementMap'
import { resolveGlassParams } from './resolveGlassParams'
import type { LiquidGlassParams } from './types'
import {
  liquidGlassVariantClass,
  resolveLiquidGlassVariant,
  type LiquidGlassVariant,
} from './variant'

export interface UseLiquidGlassEffectOptions {
  preset?: Partial<LiquidGlassParams>
  /** 组件根 class，用于生成 --primary 等 modifier */
  baseClass?: string
  variant?: LiquidGlassVariant
}

export interface UseLiquidGlassEffectResult<T extends HTMLElement> {
  hostRef: RefObject<T | null>
  filterId: string
  mapId: string
  mapUrl: string
  filterSize: { width: number; height: number }
  filterStyle: CSSProperties
  borderRadius: number
  resolvedParams: LiquidGlassParams
  variant: LiquidGlassVariant
  variantClass: string
}

function scheduleIdle(callback: () => void, timeout = 120): number {
  if (typeof window.requestIdleCallback === 'function') {
    return window.requestIdleCallback(() => callback(), { timeout })
  }
  return globalThis.setTimeout(callback, 1)
}

function cancelIdle(id: number) {
  if (typeof window.cancelIdleCallback === 'function') {
    window.cancelIdleCallback(id)
  } else {
    globalThis.clearTimeout(id)
  }
}

export function useLiquidGlassEffect<T extends HTMLElement>(
  glassParams?: LiquidGlassParams,
  options?: UseLiquidGlassEffectOptions,
): UseLiquidGlassEffectResult<T> {
  const contextParams = useLiquidGlassDefaults()
  const contextVariant = useLiquidGlassVariantDefault()
  const resolvedVariant = resolveLiquidGlassVariant(options?.variant, contextVariant)
  const variantClass = options?.baseClass
    ? liquidGlassVariantClass(options.baseClass, resolvedVariant)
    : ''
  const resolvedParams = resolveGlassParams(
    glassParams,
    contextParams,
    options?.preset,
  )

  const reactId = useId().replace(/:/g, '')
  const filterId = `liquid-glass-${reactId}`
  const mapId = `${filterId}-map`

  const hostRef = useRef<T>(null)
  const [mapUrl, setMapUrl] = useState('')
  const [filterSize, setFilterSize] = useState({ width: 0, height: 0 })

  const idleIdRef = useRef<number | null>(null)
  const measureRafRef = useRef<number | null>(null)
  const debounceMeasureRef = useRef<number | null>(null)
  const lastMapKeyRef = useRef('')

  const { borderRadius, edgeFalloff, strength } = resolvedParams

  const updateMap = useCallback(
    (width: number, height: number) => {
      if (width < 2 || height < 2) return

      const mapKey = `${width}x${height}:${borderRadius}:${edgeFalloff ?? ''}:${strength ?? ''}`
      if (lastMapKeyRef.current === mapKey) return

      lastMapKeyRef.current = mapKey
      setFilterSize({ width, height })

      if (idleIdRef.current !== null) {
        cancelIdle(idleIdRef.current)
      }

      idleIdRef.current = scheduleIdle(() => {
        idleIdRef.current = null
        setMapUrl(
          generateDisplacementMap({
            width,
            height,
            borderRadius,
            edgeFalloff,
            strength,
          }),
        )
      })
    },
    [borderRadius, edgeFalloff, strength],
  )

  useEffect(() => {
    const el = hostRef.current
    if (!el) return

    const measure = () => {
      if (measureRafRef.current !== null) {
        cancelAnimationFrame(measureRafRef.current)
      }

      measureRafRef.current = requestAnimationFrame(() => {
        measureRafRef.current = null
        const { width, height } = el.getBoundingClientRect()
        const w = Math.round(width)
        const h = Math.round(height)

        if (debounceMeasureRef.current !== null) {
          window.clearTimeout(debounceMeasureRef.current)
        }

        debounceMeasureRef.current = window.setTimeout(() => {
          debounceMeasureRef.current = null
          updateMap(w, h)
        }, 32)
      })
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)

    return () => {
      observer.disconnect()
      if (measureRafRef.current !== null) {
        cancelAnimationFrame(measureRafRef.current)
      }
      if (idleIdRef.current !== null) {
        cancelIdle(idleIdRef.current)
      }
      if (debounceMeasureRef.current !== null) {
        window.clearTimeout(debounceMeasureRef.current)
      }
    }
  }, [updateMap])

  const filterStyle = useMemo((): CSSProperties => {
    return {
      backdropFilter: `url(#${filterId}) ${BACKDROP_FILTER}`,
      WebkitBackdropFilter: `url(#${filterId}) ${BACKDROP_FILTER}`,
    }
  }, [filterId])

  return {
    hostRef,
    filterId,
    mapId,
    mapUrl,
    filterSize,
    filterStyle,
    borderRadius: borderRadius ?? 8,
    resolvedParams,
    variant: resolvedVariant,
    variantClass,
  }
}
