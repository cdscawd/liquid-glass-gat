import { createContext, useContext, useMemo, type ReactNode } from 'react'
import type { LiquidGlassParams } from './types'
import type { LiquidGlassVariant } from './variant'

interface LiquidGlassContextValue {
  glassParams?: LiquidGlassParams
  variant?: LiquidGlassVariant
}

const LiquidGlassContext = createContext<LiquidGlassContextValue | null>(null)

export interface LiquidGlassProviderProps {
  glassParams?: LiquidGlassParams
  /** 子组件未传 variant 时的默认语义色 */
  variant?: LiquidGlassVariant
  children: ReactNode
}

export function LiquidGlassProvider({
  glassParams,
  variant,
  children,
}: LiquidGlassProviderProps) {
  const value = useMemo(() => ({ glassParams, variant }), [glassParams, variant])

  return (
    <LiquidGlassContext.Provider value={value}>{children}</LiquidGlassContext.Provider>
  )
}

export function useLiquidGlassDefaults(): LiquidGlassParams | undefined {
  return useContext(LiquidGlassContext)?.glassParams
}

export function useLiquidGlassVariantDefault(): LiquidGlassVariant | undefined {
  return useContext(LiquidGlassContext)?.variant
}
