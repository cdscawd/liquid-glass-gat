import { DEFAULT_GLASS_PARAMS } from './constants'
import type { LiquidGlassParams } from './types'

export function resolveGlassParams(
  props?: LiquidGlassParams,
  context?: LiquidGlassParams,
  preset?: Partial<LiquidGlassParams>,
): LiquidGlassParams {
  return {
    borderRadius:
      props?.borderRadius ??
      preset?.borderRadius ??
      context?.borderRadius ??
      DEFAULT_GLASS_PARAMS.borderRadius,
    edgeFalloff:
      props?.edgeFalloff ?? preset?.edgeFalloff ?? context?.edgeFalloff,
    strength:
      props?.strength ??
      preset?.strength ??
      context?.strength ??
      DEFAULT_GLASS_PARAMS.strength,
  }
}
