import { useEffect, useState } from 'react'
import {
  LiquidGlassAlert,
  LiquidGlassAvatar,
  LiquidGlassAvatarGroup,
  LiquidGlassBadge,
  LiquidGlassBreadcrumb,
  LiquidGlassButton,
  LiquidGlassCard,
  LiquidGlassDivider,
  LiquidGlassDock,
  LiquidGlassDrawer,
  LiquidGlassIconButton,
  LiquidGlassInput,
  LiquidGlassList,
  LiquidGlassMediaCard,
  LiquidGlassModal,
  LiquidGlassNavbar,
  LiquidGlassPagination,
  LiquidGlassPopover,
  LiquidGlassProgress,
  LiquidGlassSlider,
  LiquidGlassSwitch,
  LiquidGlassTabs,
  LiquidGlassTextarea,
  LiquidGlassToast,
  LiquidGlassTooltip,
} from './components'

const TAB_ITEMS = [
  { value: 'overview', label: 'Overview', content: 'Liquid glass tab panel — Overview content.' },
  { value: 'details', label: 'Details', content: 'Details about refraction and displacement maps.' },
  { value: 'settings', label: 'Settings', content: 'Tune strength, edgeFalloff, and borderRadius.' },
]

const LIST_ITEMS = [
  { id: '1', title: 'Tunnel Shader', description: 'Blue-purple gradient grid lines' },
  { id: '2', title: 'Particle Field', description: 'Mint, amber, and pink spirals' },
  { id: '3', title: 'Glass Thumb', description: 'Slider variant with drag snap' },
]

const DOCK_ITEMS = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'search', label: 'Search', icon: '🔍' },
  { id: 'star', label: 'Star', icon: '⭐' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
]

export function AppNewComponents() {
  const [switchOn, setSwitchOn] = useState(true)
  const [sliderValue, setSliderValue] = useState(62)
  const [page, setPage] = useState(2)
  const [modalOpen, setModalOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)
  const [listSelected, setListSelected] = useState('1')

  useEffect(() => {
    if (!toastOpen) return
    const timer = window.setTimeout(() => setToastOpen(false), 3200)
    return () => window.clearTimeout(timer)
  }, [toastOpen])

  return (
    <>
        <section className="app__section">
          <h2 className="app__section-title">Visual Regression Checklist</h2>
          <p className="app__section-hint">
            切换 Global Theme 后目测：Button / Card / Input / Navbar 边框与 hover 一致；pill 组件圆角贴图对齐；List 仅 1 个 filter
          </p>
        </section>

        <section className="app__section">
          <h2 className="app__section-title">Card & Media</h2>
        <div className="app__row">
          <LiquidGlassCard glassParams={{ borderRadius: 12 }}>
            <LiquidGlassCard.Header>Glass Card</LiquidGlassCard.Header>
            <LiquidGlassCard.Body>
              Displacement map + backdrop-filter refraction over the tunnel background.
            </LiquidGlassCard.Body>
            <LiquidGlassCard.Footer>
              <LiquidGlassButton size="sm">Action</LiquidGlassButton>
            </LiquidGlassCard.Footer>
          </LiquidGlassCard>
          <LiquidGlassMediaCard
            title="Media Card"
            description="Composable card with optional image header."
            footer={<LiquidGlassBadge variant="chip">New</LiquidGlassBadge>}
          />
        </div>
      </section>

      <section className="app__section">
        <h2 className="app__section-title">Form & Controls</h2>
        <div className="app__row">
          <LiquidGlassInput placeholder="Search…" />
          <LiquidGlassTextarea placeholder="Write a note…" rows={2} />
          <LiquidGlassSwitch checked={switchOn} onCheckedChange={setSwitchOn} />
        </div>
        <div className="app__row">
          <LiquidGlassSlider value={sliderValue} onChange={(e) => setSliderValue(Number(e.target.value))} />
          <LiquidGlassProgress value={sliderValue} />
        </div>
      </section>

      <section className="app__section">
        <h2 className="app__section-title">Badge · Divider · Icon</h2>
        <div className="app__row">
          <LiquidGlassBadge>Beta</LiquidGlassBadge>
          <LiquidGlassBadge variant="chip">Chip</LiquidGlassBadge>
          <LiquidGlassDivider orientation="vertical" />
          <LiquidGlassIconButton aria-label="Star">⭐</LiquidGlassIconButton>
          <LiquidGlassIconButton aria-label="Settings">⚙️</LiquidGlassIconButton>
        </div>
      </section>

      <section className="app__section">
        <h2 className="app__section-title">Tabs</h2>
        <LiquidGlassTabs items={TAB_ITEMS} defaultValue="overview" />
      </section>

      <section className="app__section">
        <h2 className="app__section-title">Navigation</h2>
        <LiquidGlassNavbar brand="Liquid Glass">
          <LiquidGlassButton size="sm">Docs</LiquidGlassButton>
          <LiquidGlassIconButton aria-label="Menu">☰</LiquidGlassIconButton>
        </LiquidGlassNavbar>
        <LiquidGlassBreadcrumb
          items={[
            { label: 'Home' },
            { label: 'Components' },
            { label: 'Navbar' },
          ]}
        />
        <LiquidGlassPagination page={page} totalPages={5} onPageChange={setPage} />
      </section>

      <section className="app__section">
        <h2 className="app__section-title">Dock</h2>
        <LiquidGlassDock items={DOCK_ITEMS} />
      </section>

      <section className="app__section">
        <h2 className="app__section-title">Avatar & List</h2>
        <div className="app__row">
          <LiquidGlassAvatar fallback="LG" />
          <LiquidGlassAvatarGroup max={3}>
            <LiquidGlassAvatar fallback="A" size="sm" />
            <LiquidGlassAvatar fallback="B" size="sm" />
            <LiquidGlassAvatar fallback="C" size="sm" />
            <LiquidGlassAvatar fallback="D" size="sm" />
          </LiquidGlassAvatarGroup>
        </div>
        <LiquidGlassList
          items={LIST_ITEMS.map((item) => ({
            ...item,
            selected: listSelected === item.id,
            onClick: () => setListSelected(item.id),
          }))}
        />
      </section>

      <section className="app__section">
        <h2 className="app__section-title">Feedback & Overlay</h2>
        <div className="app__row">
          <LiquidGlassAlert title="Info" variant="info">
            All components share the same displacement pipeline.
          </LiquidGlassAlert>
          <LiquidGlassAlert title="Success" variant="success">
            Build completed successfully.
          </LiquidGlassAlert>
        </div>
        <div className="app__row">
          <LiquidGlassTooltip content="Glass tooltip">
            <LiquidGlassButton size="sm">Hover me</LiquidGlassButton>
          </LiquidGlassTooltip>
          <LiquidGlassPopover trigger={<LiquidGlassButton size="sm">Popover</LiquidGlassButton>} content="Floating glass panel content." />
          <LiquidGlassButton size="sm" onClick={() => setModalOpen(true)}>Modal</LiquidGlassButton>
          <LiquidGlassButton size="sm" onClick={() => setDrawerOpen(true)}>Drawer</LiquidGlassButton>
          <LiquidGlassButton size="sm" onClick={() => setToastOpen(true)}>Toast</LiquidGlassButton>
        </div>
      </section>

      <LiquidGlassModal
        open={modalOpen}
        title="Glass Modal"
        onClose={() => setModalOpen(false)}
        footer={
          <>
            <LiquidGlassButton size="sm" onClick={() => setModalOpen(false)}>Cancel</LiquidGlassButton>
            <LiquidGlassButton size="sm" onClick={() => setModalOpen(false)}>Confirm</LiquidGlassButton>
          </>
        }
      >
        Modal dialog with the same liquid glass refraction effect.
      </LiquidGlassModal>

      <LiquidGlassDrawer open={drawerOpen} title="Side Drawer" onClose={() => setDrawerOpen(false)}>
        <p>Drawer slides in from the edge with glass surface.</p>
        <LiquidGlassButton size="sm" onClick={() => setDrawerOpen(false)}>Close</LiquidGlassButton>
      </LiquidGlassDrawer>

      <LiquidGlassToast
        open={toastOpen}
        title="Notification"
        description="Toast appears top-right with glass styling."
        variant="success"
      />
    </>
  )
}
