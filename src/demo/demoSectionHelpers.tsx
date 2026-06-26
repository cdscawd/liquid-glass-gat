import type { ReactNode } from 'react'
import type { LiquidGlassVariant } from '../lib/liquid-glass'
import { DemoBlock } from './DemoBlock'
import { GLASS_PRESETS, SIZES, type DemoSize } from './demoVariants'
import { glassPropsLine, sizePropLine } from './formatCode'

export const LIQUID_GLASS_VARIANTS = ['default', 'primary', 'danger', 'success'] as const

export function VariantDemoBlock({
  component,
  render,
}: {
  component: string
  render: (variant: LiquidGlassVariant, label: string) => ReactNode
}) {
  return (
    <DemoBlock
      title="variant · default / primary / danger / success"
      code={LIQUID_GLASS_VARIANTS.filter((v) => v !== 'default')
        .slice(0, 1)
        .map((v) => `<${component} variant="${v}">${v}</${component}>`)
        .join('\n')}
    >
      {LIQUID_GLASS_VARIANTS.map((variant) => (
        <span key={variant}>{render(variant, variant)}</span>
      ))}
    </DemoBlock>
  )
}

export function SizeDemoBlock({
  component,
  render,
  sizes = SIZES,
}: {
  component: string
  render: (size: DemoSize) => ReactNode
  sizes?: readonly DemoSize[]
}) {
  return (
    <DemoBlock
      title="size · sm / md / lg"
      code={sizes.map((s) => `<${component}${sizePropLine(s).trim() ? ` ${sizePropLine(s).trim()}` : ''}>${s.toUpperCase()}</${component}>`).join('\n')}
    >
      {sizes.map((size) => (
        <span key={size}>{render(size)}</span>
      ))}
    </DemoBlock>
  )
}

export function GlassPresetDemoBlocks({
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
    <DemoBlock
      key={`${component}-glass-${preset.id}`}
      title={`glassParams · ${preset.label}`}
      description={preset.description}
      code={`<${component}\n${glassPropsLine(preset.params)}${extraProps ? ` ${extraProps}` : ''}>\n  ${preset.label}\n</${component}>`}
    >
      {render(preset)}
    </DemoBlock>
  ))
}

export function DisabledDemoBlock({
  component,
  renderEnabled,
  renderDisabled,
}: {
  component: string
  renderEnabled: ReactNode
  renderDisabled: ReactNode
}) {
  return (
    <DemoBlock
      title="disabled"
      code={`<${component} disabled>Disabled</${component}>`}
    >
      {renderDisabled}
      {renderEnabled}
    </DemoBlock>
  )
}
