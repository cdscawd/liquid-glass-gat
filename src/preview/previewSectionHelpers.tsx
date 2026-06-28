import type { ReactNode } from 'react'
import type { LiquidGlassVariant } from '../lib/liquid-glass'
import { PreviewBlock } from './PreviewBlock'
import { GLASS_PRESETS, SIZES, type PreviewSize } from './previewVariants'
import { glassPropsLine, sizePropLine } from './formatCode'

export const LIQUID_GLASS_VARIANTS = ['default', 'primary', 'danger', 'success'] as const

export function VariantPreviewBlock({
  component,
  render,
}: {
  component: string
  render: (variant: LiquidGlassVariant, label: string) => ReactNode
}) {
  return (
    <PreviewBlock
      title="variant · default / primary / danger / success"
      code={LIQUID_GLASS_VARIANTS.filter((v) => v !== 'default')
        .slice(0, 1)
        .map((v) => `<${component} variant="${v}">${v}</${component}>`)
        .join('\n')}
    >
      {LIQUID_GLASS_VARIANTS.map((variant) => (
        <span key={variant}>{render(variant, variant)}</span>
      ))}
    </PreviewBlock>
  )
}

export function SizePreviewBlock({
  component,
  render,
  sizes = SIZES,
}: {
  component: string
  render: (size: PreviewSize) => ReactNode
  sizes?: readonly PreviewSize[]
}) {
  return (
    <PreviewBlock
      title="size · sm / md / lg"
      code={sizes.map((s) => `<${component}${sizePropLine(s).trim() ? ` ${sizePropLine(s).trim()}` : ''}>${s.toUpperCase()}</${component}>`).join('\n')}
    >
      {sizes.map((size) => (
        <span key={size}>{render(size)}</span>
      ))}
    </PreviewBlock>
  )
}

export function GlassPresetPreviewBlocks({
  component,
  render,
  presets = GLASS_PRESETS.slice(0, 4),
  extraProps = '',
}: {
  component: string
  render: (preset: (typeof GLASS_PRESETS)[number]) => ReactNode
  presets?: typeof GLASS_PRESETS
  extraProps?: string
}) {
  return presets.map((preset) => (
    <PreviewBlock
      key={`${component}-glass-${preset.id}`}
      title={`glassParams · ${preset.label}`}
      description={preset.description}
      code={`<${component}\n${glassPropsLine(preset.params)}${extraProps ? ` ${extraProps}` : ''}>\n  ${preset.label}\n</${component}>`}
    >
      {render(preset)}
    </PreviewBlock>
  ))
}

export function DisabledPreviewBlock({
  component,
  renderEnabled,
  renderDisabled,
}: {
  component: string
  renderEnabled: ReactNode
  renderDisabled: ReactNode
}) {
  return (
    <PreviewBlock
      title="disabled"
      code={`<${component} disabled>Disabled</${component}>`}
    >
      {renderDisabled}
      {renderEnabled}
    </PreviewBlock>
  )
}
