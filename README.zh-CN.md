# LiquidGlassUI

<div align="center">

![LiquidGlassUI preview](./doc/image.png)

**基于 SVG 位移折射的动态背景液态玻璃 React 组件库**

**[在线演示](https://cdscawd.github.io/Lquidglassui/)** · [English Documentation](./README.md)

</div>

---

## 目录

- [简介](#简介)
- [特性](#特性)
- [快速开始](#快速开始)
- [在项目中使用](#在项目中使用)
- [全局配置](#全局配置)
- [发布到 npm](#发布到-npm)
- [交互 Preview](#交互-preview)
- [核心 API](#核心-api)
- [组件用法](#组件用法)
  - [全局主题](#全局主题-liquidglassprovider)
  - [通用](#通用)
  - [数据展示](#数据展示)
  - [数据录入](#数据录入)
  - [反馈](#反馈)
  - [导航](#导航)
  - [布局](#布局)
  - [浮层](#浮层)
  - [背景](#背景)
- [高级玻璃参数](#高级玻璃参数)
- [组件速查表](#组件速查表)
- [命名约定](#命名约定)
- [性能说明](#性能说明)
- [浏览器支持](#浏览器支持)
- [项目结构](#项目结构)
- [新增组件](#新增组件)

---

## 简介

LiquidGlassUI 是一套 **React 19** UI 组件库，在网页上复现 Apple 风格的液态玻璃折射效果。所有 `*LiquidGlass` 组件共用同一套渲染管线：

**SDF 位移贴图 → SVG `feDisplacementMap` → `backdrop-filter`**

组件设计用于叠加在丰富的动态背景之上（仓库内置 **Three.js 赛博隧道** 预览背景）。交互式 Preview 覆盖 **52 个导出组件**，支持实时调节 `glassParams` 与可展开的源码示例。

---

## 特性

- 统一折射管线 `useLiquidGlassEffect`，组件内不重复实现滤镜逻辑
- 52 个组件：按钮、表单、导航、浮层、数据展示、反馈等
- `LiquidGlassProvider` 全局换肤
- 语义变体：`default` · `primary` · `danger` · `success`
- 形状预设：`GLASS_SHAPE.default` · `pill` · `dock` · `badge`
- 次级玻璃层：`thumbGlassParams`、`fillGlassParams`、`panelGlassParams`、`dropdownGlassParams`
- 交互式 Preview：侧边栏导航、Intersection 区块追踪、分区源码展示

---

## 快速开始

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run serve
npm run lint
```

| 命令 | 说明 |
|------|------|
| `dev` | 启动 Vite 开发服务（自动打开浏览器） |
| `build` | TypeScript 检查 + 生产构建 |
| `serve` | 预览生产构建（Vite preview 服务） |
| `lint` | 运行 oxlint |

---

## 在项目中使用

### 从 npm 安装

npm 不允许未作用域名 `liquidglassui`（与 `liquid-glass-ui` 过于相似），请安装作用域包：

```bash
npm install @gatsby/liquidglassui
```

```tsx
// main.tsx
import '@gatsby/liquidglassui/styles.css'
import {
  ButtonLiquidGlass,
  CardLiquidGlass,
  LiquidGlassProvider,
} from '@gatsby/liquidglassui'

export function App() {
  return (
    <LiquidGlassProvider
      glassParams={{ borderRadius: 8, strength: 1, edgeFalloff: 14 }}
      variant="primary"
    >
      <CardLiquidGlass>
        <CardLiquidGlass.Body>
          <ButtonLiquidGlass variant="primary">开始使用</ButtonLiquidGlass>
        </CardLiquidGlass.Body>
      </CardLiquidGlass>
    </LiquidGlassProvider>
  )
}
```

> **提示：** 折射依赖组件**背后**可见的内容；若背景为纯色，视觉上更接近磨砂玻璃而非液态折射。

详见 **[全局配置](#全局配置)**：`LiquidGlassProvider` 属性、参数合并优先级、嵌套 Provider、CSS 主题与自定义 Hook。

### 从源码使用（Monorepo / 本地开发）

从 `src/components` 导入，并引入全局样式：

```tsx
// main.tsx
import './styles/global.scss'
```

最小示例：

```tsx
import { LiquidGlassProvider } from './lib/liquid-glass'
import { ButtonLiquidGlass, CardLiquidGlass } from './components'
import { CyberspaceBackground } from './components/CyberspaceBackground'

export function App() {
  return (
    <>
      {/* 玻璃组件需叠加在非纯色背景上，折射效果更明显 */}
      <CyberspaceBackground />

      <LiquidGlassProvider glassParams={{ borderRadius: 8, strength: 1, edgeFalloff: 14 }}>
        <CardLiquidGlass>
          <CardLiquidGlass.Body>
            <ButtonLiquidGlass variant="primary">开始使用</ButtonLiquidGlass>
          </CardLiquidGlass.Body>
        </CardLiquidGlass>
      </LiquidGlassProvider>
    </>
  )
}
```

---

## 全局配置

通过 npm 安装后，**`LiquidGlassProvider`** 是应用级默认配置的入口。在根节点（或任意子树）外包一层，其下所有 `*LiquidGlass` 组件会自动继承统一的折射与语义色，无需在每个组件上重复传参。

### 基本用法

```tsx
// main.tsx
import '@gatsby/liquidglassui/styles.css'
import { LiquidGlassProvider } from '@gatsby/liquidglassui'

createRoot(document.getElementById('root')!).render(
  <LiquidGlassProvider
    glassParams={{ borderRadius: 12, strength: 1.35, edgeFalloff: 20 }}
    variant="primary"
  >
    <App />
  </LiquidGlassProvider>,
)
```

子组件可直接使用，不必逐个传入 `glassParams`：

```tsx
import { ButtonLiquidGlass, CardLiquidGlass } from '@gatsby/liquidglassui'

<CardLiquidGlass>
  <ButtonLiquidGlass>提交</ButtonLiquidGlass>
</CardLiquidGlass>
```

### `LiquidGlassProvider` 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `glassParams` | `LiquidGlassParams` | 子组件默认折射参数 |
| `variant` | `LiquidGlassVariant` | 子组件未传 `variant` 时的默认语义色 |
| `nestedPolicy` | `'overlay' \| 'surface' \| 'filter'` | 玻璃宿主嵌套在已有 filter 宿主内时的默认策略 |

`glassParams` 字段：

| 字段 | 说明 |
|------|------|
| `borderRadius` | 圆角（px），默认 `8` |
| `strength` | 折射强度，默认 `1` |
| `edgeFalloff` | 边缘扭曲带宽度（px） |
| `deformEdge` | 定向 melt 作用边：`'all' \| 'bottom' \| 'top' \| 'left' \| 'right'` |
| `deformExtent` | 从 `deformEdge` 指定边向内的影响深度（px） |
| `deformStrength` | 定向 melt 位移强度 |
| `deformVertical` | 定向 melt 主方向倍率（`>1` 更「拉丝」） |
| `deformSpread` | 边沿 bulge 宽度占比 `0–1` |

形状预设（从 `@gatsby/liquidglassui` 导入）：

```tsx
import { GLASS_SHAPE, LiquidGlassProvider } from '@gatsby/liquidglassui'

<LiquidGlassProvider glassParams={{ borderRadius: GLASS_SHAPE.pill, strength: 1.2 }}>
  <App />
</LiquidGlassProvider>
```

### 参数合并优先级

最终参数由 `resolveGlassParams` 决定：

```
component.glassParams  →  组件内部 preset  →  LiquidGlassProvider.glassParams  →  DEFAULT_GLASS_PARAMS
```

`variant` 合并：

```
component.variant  →  LiquidGlassProvider.variant  →  'default'
```

**全局配置是默认值，单个组件仍可覆盖：**

```tsx
<LiquidGlassProvider glassParams={{ borderRadius: 12 }} variant="primary">
  <ButtonLiquidGlass>继承 12px 圆角 + primary</ButtonLiquidGlass>
  <ButtonLiquidGlass glassParams={{ borderRadius: 24 }} variant="danger">
    仅这个按钮使用 24px + danger
  </ButtonLiquidGlass>
</LiquidGlassProvider>
```

### 嵌套 Provider（局部主题）

Provider 可嵌套，内层覆盖外层，适用于「整站默认 + 某区块特殊样式」：

```tsx
<LiquidGlassProvider glassParams={{ borderRadius: 8, strength: 1 }}>
  <Layout>
    <LiquidGlassProvider glassParams={{ borderRadius: 24, strength: 1.5 }} variant="primary">
      <HeroSection />
    </LiquidGlassProvider>
    <Footer />
  </Layout>
</LiquidGlassProvider>
```

### 自定义组件中的 Hook

以下 Hook 读取最近的 `LiquidGlassProvider` 配置：

```tsx
import {
  useLiquidGlassDefaults,
  useLiquidGlassVariantDefault,
  useLiquidGlassNestedPolicyDefault,
  useLiquidGlassEffect,
} from '@gatsby/liquidglassui'

const defaults = useLiquidGlassDefaults()           // Provider 的 glassParams
const defaultVariant = useLiquidGlassVariantDefault()
const nestedPolicy = useLiquidGlassNestedPolicyDefault()
```

`useLiquidGlassEffect` 已自动合并 Provider 默认值，自定义玻璃宿主时直接使用：

```tsx
function MyGlassPanel({ glassParams, variant, children }) {
  const { hostRef, filterStyle, variantClass, isFilterActive, HostBoundary } =
    useLiquidGlassEffect(glassParams, { baseClass: 'my-panel', variant })
  // ...
}
```

### 样式与 CSS 变量

在应用入口引入样式一次：

```tsx
import '@gatsby/liquidglassui/styles.css'
```

会注入 `:root` 上的 `--lg-*` 变量（背景、边框、语义色等）。可在项目中覆盖以实现全局视觉主题：

```css
:root {
  --lg-variant-primary: #3b82f6;
  --lg-bg: rgba(255, 255, 255, 0.12);
}
```

`variant` 颜色通过 CSS 修饰类（如 `button-liquid-glass--primary`）应用，而非 JS inline style。

### 完整示例

```tsx
import '@gatsby/liquidglassui/styles.css'
import {
  ButtonLiquidGlass,
  CardLiquidGlass,
  GLASS_SHAPE,
  LiquidGlassProvider,
} from '@gatsby/liquidglassui'

export default function App() {
  return (
    <LiquidGlassProvider
      glassParams={{
        borderRadius: GLASS_SHAPE.default,
        strength: 1.2,
        edgeFalloff: 16,
      }}
      variant="primary"
      nestedPolicy="surface"
    >
      <CardLiquidGlass>
        <CardLiquidGlass.Body>
          <ButtonLiquidGlass>全局主题按钮</ButtonLiquidGlass>
        </CardLiquidGlass.Body>
      </CardLiquidGlass>
    </LiquidGlassProvider>
  )
}
```

> **背景说明：** 折射需要玻璃背后有可见内容。Preview 应用中的 `CyberspaceBackground` **未**发布到 npm，第三方项目需自行提供图片、渐变或动画背景。

---

## 发布到 npm

| 脚本 | 说明 |
|------|------|
| `npm run build:lib` | 构建 ESM、CSS 与类型声明到 `dist/` |
| `npm run release:dry-run` | 构建 + 模拟发布（检查包内容） |
| `npm run release` | patch 版本号 + 发布 |
| `npm run release:minor` | minor 版本号 + 发布 |
| `npm run release:major` | major 版本号 + 发布 |
| `npm run publish:npm` | 不升版本，直接发布当前版本 |

首次发布：

```bash
npm login
npm run release:dry-run
npm run release
```

---

## 交互 Preview

**在线访问：** https://cdscawd.github.io/Lquidglassui/

本地运行 `npm run dev` 后打开 Preview 页面，左侧导航按分类列出全部组件：

| 分类 | 包含组件 |
|------|----------|
| 全局 | Provider 主题切换 |
| 通用 | Button、Button Group、Icon Button、Float Button |
| 数据展示 | Badge、Tag、Avatar、Card、List、Timeline… |
| 数据录入 | Input、Select、Switch、Slider、Rate… |
| 反馈 | Alert、Toast、Spin、Progress、Result… |
| 导航 | Breadcrumb、Menu、Tabs、Dock、Navbar… |
| 布局 | Space、Divider、Affix |
| 浮层 | Modal、Drawer、Popover、Tooltip |

每个区块可展开查看 **Props 说明** 与 **示例代码**，并支持切换 `glassParams` 预设观察折射变化。

---

## 核心 API

### 通用 Props（大多数玻璃宿主）

| 属性 | 类型 | 说明 |
|------|------|------|
| `glassParams` | `LiquidGlassParams` | 单实例折射参数覆盖 |
| `variant` | `LiquidGlassVariant` | 语义色：`default` \| `primary` \| `danger` \| `success` |
| `size` | `'sm' \| 'md' \| 'lg'` | 尺寸变体（支持的组件） |
| `className` | `string` | 附加 CSS 类名 |
| `style` | `CSSProperties` | 与滤镜样式合并的内联样式 |

适用时透传原生 HTML 属性（`onClick`、`disabled`、`placeholder` 等）。

### `LiquidGlassParams`

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `borderRadius` | `number` | `8` | 圆角（px），胶囊形使用 `GLASS_SHAPE.pill`（`999`） |
| `strength` | `number` | `1` | 折射强度（约 `0–1`；滑动 thumb 常用 `1.15`） |
| `edgeFalloff` | `number` | 短边约 18% | 边缘扭曲带宽度（px） |

**合并优先级：**

```
component.glassParams → useLiquidGlassEffect preset → LiquidGlassProvider → DEFAULT_GLASS_PARAMS
```

**variant 合并：**

```
component.variant → LiquidGlassProvider.variant → 'default'
```

详见 **[全局配置](#全局配置)**：嵌套 Provider、CSS 变量与 Hook。

### 形状预设（`GLASS_SHAPE`）

```tsx
import { GLASS_SHAPE } from '@gatsby/liquidglassui'

GLASS_SHAPE.default  // 8
GLASS_SHAPE.pill     // 999 — Avatar、Switch 轨道、Badge chip
GLASS_SHAPE.dock     // 24 — DockLiquidGlass
GLASS_SHAPE.badge    // 6  — BadgeLiquidGlass
```

### 语义变体（Variant）

通过 CSS 修饰类应用（如 `button-liquid-glass--primary`）。颜色定义在 `src/styles/_variables.scss`（`$glass-variant-*`）。

---

## 组件用法

所有组件从 `src/components/index.ts` 导出。

### 全局主题 (`LiquidGlassProvider`)

为子组件注入默认 `glassParams`、`variant` 与 `nestedPolicy`。完整说明见 **[全局配置](#全局配置)**。

```tsx
import { LiquidGlassProvider } from '@gatsby/liquidglassui'

<LiquidGlassProvider
  glassParams={{ borderRadius: 12, strength: 1.35, edgeFalloff: 20 }}
  variant="primary"
  nestedPolicy="surface"
>
  <App />
</LiquidGlassProvider>
```

在子组件中读取默认值：

```tsx
import {
  useLiquidGlassDefaults,
  useLiquidGlassVariantDefault,
  useLiquidGlassNestedPolicyDefault,
} from '@gatsby/liquidglassui'

const defaults = useLiquidGlassDefaults()
const variant = useLiquidGlassVariantDefault()
const nestedPolicy = useLiquidGlassNestedPolicyDefault()
```

---

### 通用

#### `ButtonLiquidGlass`

标准玻璃按钮。

```tsx
<ButtonLiquidGlass variant="primary" size="md" onClick={() => {}}>
  提交
</ButtonLiquidGlass>

<ButtonLiquidGlass variant="danger" disabled>
  禁用
</ButtonLiquidGlass>
```

| 属性 | 类型 | 说明 |
|------|------|------|
| `variant` | `LiquidGlassVariant` | 语义色 |
| `size` | `'sm' \| 'md' \| 'lg'` | 默认 `md` |
| `glassParams` | `LiquidGlassParams` | 覆盖折射参数 |

#### `ButtonGroupLiquidGlass`

分段控制 — `default`（选中项高亮）或 `slider`（可拖拽 thumb）。

```tsx
// default 变体
<ButtonGroupLiquidGlass value={tab} onValueChange={setTab} name="tabs">
  <ButtonGroupLiquidGlass.Item value="a">标签 A</ButtonGroupLiquidGlass.Item>
  <ButtonGroupLiquidGlass.Item value="b">标签 B</ButtonGroupLiquidGlass.Item>
</ButtonGroupLiquidGlass>

// slider 变体 + thumb 折射
<ButtonGroupLiquidGlass
  variant="slider"
  defaultValue="list"
  thumbGlassParams={{ strength: 1.15 }}
>
  <ButtonGroupLiquidGlass.Item value="grid">网格</ButtonGroupLiquidGlass.Item>
  <ButtonGroupLiquidGlass.Item value="list">列表</ButtonGroupLiquidGlass.Item>
</ButtonGroupLiquidGlass>
```

| 属性 | 类型 | 说明 |
|------|------|------|
| `variant` | `'default' \| 'slider'` | slider 支持拖拽吸附 |
| `value` / `defaultValue` | `string` | 当前选中值 |
| `onValueChange` | `(value: string) => void` | 变更回调 |
| `thumbGlassParams` | `LiquidGlassParams` | 仅 slider 模式 |

#### `IconButtonLiquidGlass`

圆形图标按钮。**必须提供 `aria-label`。**

```tsx
<IconButtonLiquidGlass size="md" aria-label="设置" onClick={() => {}}>
  ⚙️
</IconButtonLiquidGlass>
```

#### `FloatButtonLiquidGlass`

固定于视口右下角的悬浮按钮。

```tsx
<FloatButtonLiquidGlass
  icon="↑"
  aria-label="返回顶部"
  shape="circle"
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
/>
```

| 属性 | 类型 | 说明 |
|------|------|------|
| `shape` | `'circle' \| 'square'` | 默认 `circle` |
| `icon` | `ReactNode` | 图标内容 |
| `description` | `ReactNode` | 图标下方可选文字 |

---

### 数据展示

#### `BadgeLiquidGlass` / `TagLiquidGlass`

```tsx
<BadgeLiquidGlass shape="badge" size="sm">Beta</BadgeLiquidGlass>
<BadgeLiquidGlass shape="chip">新</BadgeLiquidGlass>

<TagLiquidGlass color="success" closable onClose={() => {}}>React</TagLiquidGlass>
<TagLiquidGlass variant="primary">精选</TagLiquidGlass>
```

| 组件 | 关键属性 |
|------|----------|
| `BadgeLiquidGlass` | `shape`: `badge` \| `chip` |
| `TagLiquidGlass` | `color` / `variant`、`closable`、`onClose` |

#### `AvatarLiquidGlass` / `AvatarGroupLiquidGlass`

```tsx
<AvatarLiquidGlass size="lg" src="/avatar.jpg" alt="用户" />
<AvatarLiquidGlass fallback="LG" glassParams={{ strength: 1.2 }} />

<AvatarGroupLiquidGlass max={3}>
  <AvatarLiquidGlass fallback="A" size="sm" />
  <AvatarLiquidGlass fallback="B" size="sm" />
  <AvatarLiquidGlass fallback="C" size="sm" />
</AvatarGroupLiquidGlass>
```

#### `CardLiquidGlass`

复合卡片，含 Header / Body / Footer 子组件。

```tsx
<CardLiquidGlass size="md" glassParams={{ borderRadius: 12 }}>
  <CardLiquidGlass.Header>标题</CardLiquidGlass.Header>
  <CardLiquidGlass.Body>正文内容</CardLiquidGlass.Body>
  <CardLiquidGlass.Footer>
    <ButtonLiquidGlass size="sm">操作</ButtonLiquidGlass>
  </CardLiquidGlass.Footer>
</CardLiquidGlass>
```

#### `MediaCardLiquidGlass`

封装 Card，支持 `image`、`title`、`description`、`footer`。

```tsx
<MediaCardLiquidGlass
  title="项目 Alpha"
  description="液态玻璃 UI 组件库"
  footer={<BadgeLiquidGlass shape="chip">新</BadgeLiquidGlass>}
  style={{ width: 280 }}
/>
```

#### `ListLiquidGlass`

单容器单滤镜，行内选中高亮。**整列表共用一个 filter。**

```tsx
<ListLiquidGlass
  items={[
    { id: '1', title: '条目 1', description: '详情', selected: true, onClick: () => {} },
    { id: '2', title: '条目 2', disabled: true },
  ]}
/>
```

#### `EmptyLiquidGlass`

```tsx
<EmptyLiquidGlass description="暂无数据">
  <ButtonLiquidGlass size="sm">创建</ButtonLiquidGlass>
</EmptyLiquidGlass>
```

#### `StatisticLiquidGlass`

```tsx
<StatisticLiquidGlass title="活跃用户" value={112893} suffix="人" />
```

#### `TimelineLiquidGlass`

```tsx
<TimelineLiquidGlass
  mode="left"
  items={[
    { key: '1', label: '2024-01', children: '项目启动', color: 'success' },
    { key: '2', label: '2024-06', children: '发布 v1.0' },
  ]}
/>
```

| 属性 | 类型 | 说明 |
|------|------|------|
| `mode` | `'left' \| 'alternate'` | 布局模式 |
| `items[].color` | `'default' \| 'success' \| 'warning' \| 'error'` | 节点颜色 |

#### `CollapseLiquidGlass`

```tsx
<CollapseLiquidGlass
  accordion
  defaultActiveKeys={['1']}
  items={[
    { key: '1', label: '章节 1', children: '内容…' },
    { key: '2', label: '章节 2', children: '更多内容…' },
  ]}
/>
```

#### `TypographyLiquidGlass`

非玻璃文字组件，用于深色背景上的排版。

```tsx
<TypographyLiquidGlass.Title level={2}>标题</TypographyLiquidGlass.Title>
<TypographyLiquidGlass.Paragraph>正文段落。</TypographyLiquidGlass.Paragraph>
<TypographyLiquidGlass.Text type="success" strong>成功</TypographyLiquidGlass.Text>
<TypographyLiquidGlass.Text type="danger" delete>已删除</TypographyLiquidGlass.Text>
```

---

### 数据录入

#### `InputLiquidGlass` / `TextareaLiquidGlass`

外层玻璃 div 包裹透明原生输入框。

```tsx
<InputLiquidGlass placeholder="搜索…" size="md" style={{ minWidth: 200 }} />
<TextareaLiquidGlass rows={4} placeholder="备注…" />
```

#### `SelectLiquidGlass`

自定义下拉，面板通过 Portal 渲染。

```tsx
<SelectLiquidGlass
  defaultValue="react"
  placeholder="选择框架"
  options={[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
  ]}
  onChange={(e) => console.log(e.target.value)}
  dropdownGlassParams={{ strength: 1.1 }}
/>
```

#### `CheckboxLiquidGlass`

```tsx
<CheckboxLiquidGlass label="同意条款" defaultChecked onCheckedChange={(v) => {}} />
```

#### `RadioLiquidGlass` + `RadioLiquidGlassGroup`

```tsx
<RadioLiquidGlassGroup value={value} onValueChange={setValue} size="md">
  <RadioLiquidGlass value="a" label="选项 A" />
  <RadioLiquidGlass value="b" label="选项 B" />
  <RadioLiquidGlass value="c" label="选项 C" disabled />
</RadioLiquidGlassGroup>
```

#### `SwitchLiquidGlass`

点击或拖拽 thumb 切换。thumb 仅用 SCSS，不嵌套 backdrop-filter。

```tsx
<SwitchLiquidGlass
  checked={on}
  onCheckedChange={setOn}
  size="md"
  thumbGlassParams={{ strength: 1.15 }}
/>
```

#### `SliderLiquidGlass`

原生 range + 玻璃轨道。

```tsx
<SliderLiquidGlass
  value={value}
  min={0}
  max={100}
  onChange={(e) => setValue(Number(e.target.value))}
  style={{ width: 220 }}
/>
```

#### `RateLiquidGlass`

```tsx
<RateLiquidGlass value={rating} onChange={setRating} allowHalf />
```

---

### 反馈

#### `AlertLiquidGlass`

```tsx
<AlertLiquidGlass variant="primary" title="提示">
  各 variant 对应不同语义边框色。
</AlertLiquidGlass>
```

变体：`default` · `primary` · `success` · `warning` · `danger`

#### `ToastLiquidGlass`

Portal 通知，通过 `open` 控制显隐。

```tsx
{show && (
  <ToastLiquidGlass
    open
    variant="success"
    title="已保存"
    description="更改已成功保存。"
  />
)}
```

#### `SpinLiquidGlass`

```tsx
<SpinLiquidGlass spinning tip="加载中…">
  <CardLiquidGlass>被遮罩覆盖的内容</CardLiquidGlass>
</SpinLiquidGlass>
```

#### `SkeletonLiquidGlass`

```tsx
<SkeletonLiquidGlass avatar title paragraph={{ rows: 3 }} active />
```

#### `ProgressLiquidGlass`

轨道 + 填充条双层玻璃。

```tsx
<ProgressLiquidGlass
  value={72}
  max={100}
  fillGlassParams={{ strength: 1.1 }}
  style={{ width: 220 }}
/>
```

#### `ResultLiquidGlass`

```tsx
<ResultLiquidGlass
  status="success"
  title="完成"
  subTitle="操作已成功。"
  extra={<ButtonLiquidGlass size="sm">继续</ButtonLiquidGlass>}
/>
```

状态：`success` · `error` · `info` · `warning`

#### `PopconfirmLiquidGlass`

```tsx
<PopconfirmLiquidGlass
  title="确认删除？"
  description="此操作不可撤销。"
  onConfirm={() => handleDelete()}
  trigger={<ButtonLiquidGlass variant="danger" size="sm">删除</ButtonLiquidGlass>}
/>
```

---

### 导航

#### `BreadcrumbLiquidGlass`

```tsx
<BreadcrumbLiquidGlass
  items={[
    { label: '首页', href: '/' },
    { label: '组件', onClick: () => {} },
    { label: '按钮' },
  ]}
/>
```

#### `MenuLiquidGlass`

```tsx
<MenuLiquidGlass
  selectedKeys={[key]}
  onSelect={setKey}
  items={[
    { key: 'home', label: '首页', icon: '🏠' },
    { key: 'docs', label: '文档', icon: '📄', disabled: true },
  ]}
/>
```

#### `DropdownLiquidGlass`

```tsx
<DropdownLiquidGlass
  trigger={<ButtonLiquidGlass size="sm">菜单</ButtonLiquidGlass>}
  items={[
    { key: '1', label: '个人资料' },
    { key: '2', label: '退出', danger: true },
  ]}
/>
```

#### `PaginationLiquidGlass`

```tsx
<PaginationLiquidGlass page={page} totalPages={10} onPageChange={setPage} />
```

#### `StepsLiquidGlass`

```tsx
<StepsLiquidGlass
  current={1}
  direction="horizontal"
  items={[
    { title: '已完成', description: '步骤 1' },
    { title: '进行中', description: '步骤 2' },
    { title: '等待中', description: '步骤 3' },
  ]}
/>
```

#### `AnchorLiquidGlass`

页内锚点导航。

```tsx
<AnchorLiquidGlass
  links={[
    { key: 'intro', href: '#intro', title: '介绍' },
    { key: 'api', href: '#api', title: 'API' },
  ]}
/>
```

#### `NavbarLiquidGlass`

```tsx
<NavbarLiquidGlass brand="LiquidGlassUI">
  <ButtonLiquidGlass size="sm">文档</ButtonLiquidGlass>
  <IconButtonLiquidGlass aria-label="菜单">☰</IconButtonLiquidGlass>
</NavbarLiquidGlass>
```

#### `DockLiquidGlass`

底部 Dock，默认使用 `GLASS_SHAPE.dock` 圆角。

```tsx
<DockLiquidGlass
  items={[
    { id: 'home', label: '首页', icon: '🏠' },
    { id: 'search', label: '搜索', icon: '🔍' },
  ]}
/>
```

#### `TabsLiquidGlass`

ButtonGroup slider + 各 Tab 独立玻璃面板。

```tsx
const items = [
  { value: 'a', label: '标签 A', content: <p>面板 A</p> },
  { value: 'b', label: '标签 B', content: <p>面板 B</p> },
]

<TabsLiquidGlass
  items={items}
  value={tab}
  onValueChange={setTab}
  panelGlassParams={{ borderRadius: 12 }}
  thumbGlassParams={{ strength: 1.15 }}
/>
```

---

### 布局

#### `SpaceLiquidGlass`

Flex 间距容器（非玻璃表面）。

```tsx
<SpaceLiquidGlass size="md" wrap>
  <ButtonLiquidGlass size="sm">A</ButtonLiquidGlass>
  <ButtonLiquidGlass size="sm">B</ButtonLiquidGlass>
</SpaceLiquidGlass>

<SpaceLiquidGlass direction="vertical" size="sm" align="center">
  <BadgeLiquidGlass>上</BadgeLiquidGlass>
  <BadgeLiquidGlass>下</BadgeLiquidGlass>
</SpaceLiquidGlass>
```

#### `DividerLiquidGlass`

```tsx
<DividerLiquidGlass orientation="horizontal" />
<DividerLiquidGlass orientation="vertical" />
```

#### `AffixLiquidGlass`

在指定滚动容器内吸顶/吸底。

```tsx
const scrollRef = useRef<HTMLDivElement>(null)

<div ref={scrollRef} style={{ height: 200, overflow: 'auto' }}>
  <AffixLiquidGlass offsetTop={0} target={() => scrollRef.current}>
    <BadgeLiquidGlass shape="chip">吸顶</BadgeLiquidGlass>
  </AffixLiquidGlass>
  {/* 长内容 */}
</div>
```

---

### 浮层

#### `ModalLiquidGlass`

Portal 对话框。按 **Esc** 或点击遮罩关闭。

```tsx
<ModalLiquidGlass
  open={open}
  title="确认"
  onClose={() => setOpen(false)}
  footer={
    <>
      <ButtonLiquidGlass size="sm" onClick={() => setOpen(false)}>取消</ButtonLiquidGlass>
      <ButtonLiquidGlass size="sm" variant="primary" onClick={handleOk}>确定</ButtonLiquidGlass>
    </>
  }
>
  对话框正文。
</ModalLiquidGlass>
```

#### `DrawerLiquidGlass`

```tsx
<DrawerLiquidGlass
  open={open}
  side="right"
  title="设置"
  onClose={() => setOpen(false)}
>
  抽屉内容。
</DrawerLiquidGlass>
```

`side`：`left` | `right`

#### `PopoverLiquidGlass`

```tsx
<PopoverLiquidGlass
  trigger={<ButtonLiquidGlass size="sm">详情</ButtonLiquidGlass>}
  content="弹出层正文。"
/>
```

#### `TooltipLiquidGlass`

```tsx
<TooltipLiquidGlass content="提示文字">
  <ButtonLiquidGlass size="sm">悬停</ButtonLiquidGlass>
</TooltipLiquidGlass>
```

---

### 背景

#### `CyberspaceBackground`

Three.js 隧道 + 粒子场景。非玻璃组件，用作演示背景。

```tsx
import { CyberspaceBackground } from './components/CyberspaceBackground'

<CyberspaceBackground />
```

---

## 高级玻璃参数

部分组件支持次级玻璃层：

| 属性 | 适用组件 | 用途 |
|------|----------|------|
| `thumbGlassParams` | `ButtonGroupLiquidGlass`（slider）、`SwitchLiquidGlass`、`TabsLiquidGlass` | 滑动 thumb 折射强度 |
| `fillGlassParams` | `ProgressLiquidGlass` | 进度填充条玻璃 |
| `panelGlassParams` | `TabsLiquidGlass` | Tab 内容面板玻璃 |
| `dropdownGlassParams` | `SelectLiquidGlass` | 下拉面板玻璃 |

示例：

```tsx
<ProgressLiquidGlass
  value={80}
  glassParams={{ borderRadius: 8 }}
  fillGlassParams={{ strength: 1.1, edgeFalloff: 10 }}
/>
```

相关常量：

```tsx
import { DEFAULT_THUMB_STRENGTH, DEFAULT_FILL_STRENGTH_MULTIPLIER } from './lib/liquid-glass'
```

---

## 组件速查表

| 分类 | 组件 | 是否有 `size` | 备注 |
|------|------|:-------------:|------|
| 通用 | `ButtonLiquidGlass` | ✓ | `variant` 语义色 |
| 通用 | `ButtonGroupLiquidGlass` | ✓ | `slider` 模式支持 `thumbGlassParams` |
| 通用 | `IconButtonLiquidGlass` | ✓ | 需 `aria-label` |
| 通用 | `FloatButtonLiquidGlass` | — | 固定右下角 FAB |
| 展示 | `BadgeLiquidGlass` | ✓ | `shape`: badge / chip |
| 展示 | `TagLiquidGlass` | ✓ | `closable` 可关闭 |
| 展示 | `AvatarLiquidGlass` | ✓ | preset pill |
| 展示 | `AvatarGroupLiquidGlass` | — | `max` 限制显示数量 |
| 展示 | `CardLiquidGlass` | ✓ | Header / Body / Footer |
| 展示 | `MediaCardLiquidGlass` | ✓ | 封装 Card |
| 展示 | `ListLiquidGlass` | — | 单 filter 容器 |
| 展示 | `EmptyLiquidGlass` | — | 空状态 |
| 展示 | `StatisticLiquidGlass` | — | 数值统计 |
| 展示 | `TimelineLiquidGlass` | — | left / alternate |
| 展示 | `CollapseLiquidGlass` | — | `accordion` 手风琴 |
| 展示 | `TypographyLiquidGlass` | — | 非玻璃排版 |
| 录入 | `InputLiquidGlass` | ✓ | 透明原生 input |
| 录入 | `TextareaLiquidGlass` | ✓ | 透明原生 textarea |
| 录入 | `SelectLiquidGlass` | ✓ | `dropdownGlassParams` |
| 录入 | `CheckboxLiquidGlass` | ✓ | — |
| 录入 | `RadioLiquidGlass` | ✓ | 配合 Group 使用 |
| 录入 | `SwitchLiquidGlass` | ✓ | 拖拽吸附 |
| 录入 | `SliderLiquidGlass` | — | track-only 玻璃 |
| 录入 | `RateLiquidGlass` | — | `allowHalf` |
| 反馈 | `AlertLiquidGlass` | — | 5 种 variant |
| 反馈 | `ToastLiquidGlass` | — | Portal 通知 |
| 反馈 | `SpinLiquidGlass` | ✓ | 可包裹 children |
| 反馈 | `SkeletonLiquidGlass` | — | 骨架屏 |
| 反馈 | `ProgressLiquidGlass` | — | `fillGlassParams` |
| 反馈 | `ResultLiquidGlass` | — | 4 种 status |
| 反馈 | `PopconfirmLiquidGlass` | — | 确认气泡 |
| 导航 | `BreadcrumbLiquidGlass` | — | — |
| 导航 | `MenuLiquidGlass` | — | 垂直菜单 |
| 导航 | `DropdownLiquidGlass` | — | — |
| 导航 | `PaginationLiquidGlass` | — | — |
| 导航 | `StepsLiquidGlass` | — | horizontal / vertical |
| 导航 | `AnchorLiquidGlass` | — | 页内锚点 |
| 导航 | `NavbarLiquidGlass` | — | 顶栏 |
| 导航 | `DockLiquidGlass` | — | dock 圆角 preset |
| 导航 | `TabsLiquidGlass` | ✓ | `panelGlassParams` |
| 布局 | `SpaceLiquidGlass` | — | 非玻璃间距 |
| 布局 | `DividerLiquidGlass` | — | horizontal / vertical |
| 布局 | `AffixLiquidGlass` | — | 滚动吸顶 |
| 浮层 | `ModalLiquidGlass` | — | Esc 关闭 |
| 浮层 | `DrawerLiquidGlass` | — | left / right |
| 浮层 | `PopoverLiquidGlass` | — | — |
| 浮层 | `TooltipLiquidGlass` | — | — |
| 背景 | `CyberspaceBackground` | — | Three.js，非玻璃 |

---

## 命名约定

| 层级 | 规则 | 示例 |
|------|------|------|
| 组件 | 语义名 + `LiquidGlass` | `CardLiquidGlass` |
| Props | `<Name>LiquidGlassProps` | `CardLiquidGlassProps` |
| 尺寸 | `'sm' \| 'md' \| 'lg'`（适用时） | `ButtonLiquidGlass` |
| CSS 类 | `<kebab>-liquid-glass` | `card-liquid-glass--sm` |

新增玻璃宿主 **必须** 使用 `useLiquidGlassEffect`，禁止在组件内复制 `generateDisplacementMap` 或 `LiquidGlassFilter`。

---

## 性能说明

- **一个宿主 = 一个 SVG 滤镜** — 每个 `useLiquidGlassEffect` 实例独立持有滤镜
- **列表单容器** — `ListLiquidGlass` 整表一个 filter，禁止每行独立滤镜
- **嵌套玻璃可配置** — `filterMode`（`auto` | `filter` | `surface`）与 `nestedPolicy`（`overlay` | `surface` | `filter`）；双层折射推荐 `LiquidGlassStack` 兄弟层叠加
- 位移贴图在钩子内防抖，通过 `requestIdleCallback` 调度生成
- `glass-surface` mixin 设置 `contain: layout style paint` + `isolation: isolate`

---

## 浏览器支持

折射效果建议在 **Chrome** 及 Chromium 内核浏览器中查看。Firefox、Safari 中 `backdrop-filter` 与 SVG 滤镜组合的表现可能不一致。

---

## 项目结构

```
src/
├── lib/liquid-glass/       # 共享算法与钩子
│   ├── constants.ts        # DEFAULT_GLASS_PARAMS、GLASS_SHAPE…
│   ├── useLiquidGlassEffect.ts
│   ├── LiquidGlassFilter.tsx
│   └── LiquidGlassProvider.tsx
├── styles/                 # SCSS 变量与 glass mixins
├── components/             # *LiquidGlass 组件
├── engine/                 # Three.js 背景引擎
├── preview/                # 交互 Preview（PreviewShowcase、PreviewSections）
└── App.tsx
```

---

## 新增组件

1. 查阅 [组件用法](#组件用法) — 优先扩展现有组件。
2. 创建 `src/components/XxxLiquidGlass/`（`.tsx`、`.scss`、`index.ts`）。
3. 接入 `useLiquidGlassEffect` 及正确的 `GLASS_SHAPE` preset。
4. 在 `components/index.ts` 导出。
5. 在 `preview/PreviewSections.tsx` 添加 Preview 区块，并在 `preview/previewNav.ts` 注册导航。
6. 执行 `npm run build` 验证。

完整规范见 `.cursor/rules/liquid-glass-components.mdc`。

---

<div align="center">

[English Documentation](./README.md)

</div>
