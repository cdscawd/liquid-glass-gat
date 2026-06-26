import { createContext, useContext, useMemo, type ReactNode } from 'react'
import type { LiquidGlassParams } from './types'

interface LiquidGlassContextValue {
  glassParams?: LiquidGlassParams
}

const LiquidGlassContext = createContext<LiquidGlassContextValue | null>(null)

export interface LiquidGlassProviderProps {
  glassParams?: LiquidGlassParams
  children: ReactNode
}

export function LiquidGlassProvider({ glassParams, children }: LiquidGlassProviderProps) {
  const value = useMemo(() => ({ glassParams }), [glassParams])

  return (
    <LiquidGlassContext.Provider value={value}>{children}</LiquidGlassContext.Provider>
  )
}

export function useLiquidGlassDefaults(): LiquidGlassParams | undefined {
  return useContext(LiquidGlassContext)?.glassParams
}
