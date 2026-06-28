import {
  AvatarLiquidGlass,
  BadgeLiquidGlass,
  CardLiquidGlass,
  DividerLiquidGlass,
  ListLiquidGlass,
} from '../components'
import type { LiquidGlassParams } from '../lib/liquid-glass'
import { PreviewGlassControls } from './PreviewGlassControls'
import { PREVIEW_NAV } from './previewNav'
import './PreviewSidebar.scss'

interface PreviewSidebarProps {
  activeId: string
  onNavigate: (id: string) => void
  globalGlass: LiquidGlassParams
  onGlassChange: (params: LiquidGlassParams) => void
}

export function PreviewSidebar({
  activeId,
  onNavigate,
  globalGlass,
  onGlassChange,
}: PreviewSidebarProps) {
  return (
    <CardLiquidGlass
      className="preview-sidebar"
      size="sm"
      glassParams={{ borderRadius: 12, strength: 0.85, edgeFalloff: 14 }}
    >
      <div className="preview-sidebar__brand">
        <AvatarLiquidGlass fallback="Gat" />
        <div className="preview-sidebar__brand-text">
          <div className="preview-sidebar__title">LiquidGlassUI</div>
          <BadgeLiquidGlass variant="chip" size="sm">
            Showcase
          </BadgeLiquidGlass>
        </div>
      </div>

      <DividerLiquidGlass
        orientation="horizontal"
        className="preview-sidebar__divider"
        glassParams={{ borderRadius: 999, strength: 0.5, edgeFalloff: 6 }}
      />

      <nav className="preview-sidebar__nav" aria-label="组件导航">
        {PREVIEW_NAV.map((group) => (
          <div key={group.title} className="preview-sidebar__group">
            <div className="preview-sidebar__group-title">{group.title}</div>
            <ListLiquidGlass
              className="preview-sidebar__list"
              glassParams={{ borderRadius: 8, strength: 0.75, edgeFalloff: 10 }}
              items={group.items.map((item) => ({
                id: item.id,
                title: item.label,
                selected: activeId === item.id,
                onClick: () => onNavigate(item.id),
              }))}
            />
          </div>
        ))}
      </nav>

      <DividerLiquidGlass
        orientation="horizontal"
        className="preview-sidebar__controls-divider"
        glassParams={{ borderRadius: 999, strength: 0.5, edgeFalloff: 6 }}
      />

      <PreviewGlassControls
        className="preview-sidebar__controls"
        value={globalGlass}
        onChange={onGlassChange}
      />
    </CardLiquidGlass>
  )
}
