import type { CSSProperties } from 'react'

export type LiquidGlassVariant = 'default' | 'primary' | 'danger' | 'success'

/**
 * variant 主题色唯一来源：src/styles/_variables.scss 中的 $glass-variant-*。
 * 组件通过 class（如 button-liquid-glass--primary）+ glass-variant-modifiers 应用，
 * 不再由 JS 注入 inline style，避免覆盖 SCSS 配置。
 */
export function resolveLiquidGlassVariant(
  prop?: LiquidGlassVariant,
  context?: LiquidGlassVariant,
): LiquidGlassVariant {
  return prop ?? context ?? 'default'
}

export function liquidGlassVariantClass(
  baseClass: string,
  variant: LiquidGlassVariant = 'default',
): string {
  return variant === 'default' ? '' : ` ${baseClass}--${variant}`
}

/** @deprecated variant 样式已改由 SCSS 负责，此函数恒返回空对象 */
export function getLiquidGlassVariantStyle(
  _variant: LiquidGlassVariant,
): CSSProperties {
  return {}
}

/** @deprecated 请改 _variables.scss 中的 $glass-variant-* */
export const LIQUID_GLASS_VARIANT_VARS: Record<
  LiquidGlassVariant,
  Record<string, string>
> = {
  default: {},
  primary: {},
  danger: {},
  success: {},
}

/** @deprecated 请改 _variables.scss 中的 $glass-variant-* */
export const LIQUID_GLASS_VARIANT_COLORS = {
  primary: 'var(--lg-variant-primary)',
  danger: 'var(--lg-variant-danger)',
  success: 'var(--lg-variant-success)',
} as const
