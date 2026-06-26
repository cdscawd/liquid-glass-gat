import { LiquidGlassButton } from './components/LiquidGlassButton'
import type { LiquidGlassParams } from './lib/liquid-glass'
import './App.scss'

interface DemoButton {
  label: string
  size?: 'sm' | 'md' | 'lg'
  glassParams?: LiquidGlassParams
}

const DEMO_BUTTONS: DemoButton[] = [
  { label: 'Default', glassParams: {} },
  {
    label: 'Strong Lens',
    glassParams: { strength: 1.45, edgeFalloff: 20 },
  },
  {
    label: 'Subtle Glass',
    glassParams: { strength: 0.45, edgeFalloff: 7 },
  },
  {
    label: 'Wide Edge',
    glassParams: { strength: 1, edgeFalloff: 24 },
  },
  {
    label: 'Narrow Edge',
    glassParams: { strength: 1.2, edgeFalloff: 6 },
  },
  {
    label: 'Sharp Corner',
    glassParams: { borderRadius: 4, strength: 1.15, edgeFalloff: 10 },
  },
  {
    label: 'Pill Shape',
    glassParams: { borderRadius: 999, strength: 1, edgeFalloff: 14 },
  },
  {
    label: 'Soft Round',
    glassParams: { borderRadius: 16, strength: 0.85, edgeFalloff: 16 },
  },
  { label: 'Small', size: 'sm', glassParams: { strength: 1.3, edgeFalloff: 5 } },
  {
    label: 'Large',
    size: 'lg',
    glassParams: { strength: 1.1, edgeFalloff: 18 },
  },
  {
    label: 'Max Distort',
    glassParams: { strength: 1.6, edgeFalloff: 22, borderRadius: 12 },
  },
  {
    label: 'Minimal',
    glassParams: { strength: 0.35, edgeFalloff: 5, borderRadius: 6 },
  },
]

function App() {
  return (
    <main className="app">
      <h1 className="app__title">Liquid Glass Button</h1>
      <div className="app__buttons">
        {DEMO_BUTTONS.map(({ label, size, glassParams }) => (
          <LiquidGlassButton key={label} size={size} glassParams={glassParams}>
            {label}
          </LiquidGlassButton>
        ))}
      </div>
      <p className="app__hint">
        不同 strength / edgeFalloff / borderRadius 预设，边缘折射强度与形状各异（建议
        Chrome 查看）
      </p>
    </main>
  )
}

export default App
