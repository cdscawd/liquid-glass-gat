export interface PreviewNavItem {
  id: string
  label: string
}

export interface PreviewNavGroup {
  title: string
  items: PreviewNavItem[]
}

/** 每个已导出组件对应独立导航项与页面板块 */
export const PREVIEW_NAV: PreviewNavGroup[] = [
  {
    title: '全局',
    items: [{ id: 'theme', label: 'Provider 主题' }],
  },
  {
    title: '通用',
    items: [
      { id: 'button', label: 'Button' },
      { id: 'button-group', label: 'Button Group' },
      { id: 'icon-button', label: 'Icon Button' },
      { id: 'float-button', label: 'Float Button' },
    ],
  },
  {
    title: '数据展示',
    items: [
      { id: 'badge', label: 'Badge' },
      { id: 'tag', label: 'Tag' },
      { id: 'avatar', label: 'Avatar' },
      { id: 'avatar-group', label: 'Avatar Group' },
      { id: 'card', label: 'Card' },
      { id: 'media-card', label: 'Media Card' },
      { id: 'list', label: 'List' },
      { id: 'empty', label: 'Empty' },
      { id: 'statistic', label: 'Statistic' },
      { id: 'timeline', label: 'Timeline' },
      { id: 'collapse', label: 'Collapse' },
      { id: 'typography', label: 'Typography' },
    ],
  },
  {
    title: '数据录入',
    items: [
      { id: 'input', label: 'Input' },
      { id: 'textarea', label: 'Textarea' },
      { id: 'select', label: 'Select' },
      { id: 'checkbox', label: 'Checkbox' },
      { id: 'radio', label: 'Radio' },
      { id: 'switch', label: 'Switch' },
      { id: 'slider', label: 'Slider' },
      { id: 'rate', label: 'Rate' },
    ],
  },
  {
    title: '反馈',
    items: [
      { id: 'alert', label: 'Alert' },
      { id: 'toast', label: 'Toast' },
      { id: 'spin', label: 'Spin' },
      { id: 'skeleton', label: 'Skeleton' },
      { id: 'progress', label: 'Progress' },
      { id: 'result', label: 'Result' },
      { id: 'popconfirm', label: 'Popconfirm' },
    ],
  },
  {
    title: '导航',
    items: [
      { id: 'breadcrumb', label: 'Breadcrumb' },
      { id: 'menu', label: 'Menu' },
      { id: 'dropdown', label: 'Dropdown' },
      { id: 'pagination', label: 'Pagination' },
      { id: 'steps', label: 'Steps' },
      { id: 'anchor', label: 'Anchor' },
      { id: 'navbar', label: 'Navbar' },
      { id: 'dock', label: 'Dock' },
      { id: 'tabs', label: 'Tabs' },
    ],
  },
  {
    title: '布局',
    items: [
      { id: 'space', label: 'Space' },
      { id: 'divider', label: 'Divider' },
      { id: 'affix', label: 'Affix' },
    ],
  },
  {
    title: '浮层',
    items: [
      { id: 'modal', label: 'Modal' },
      { id: 'drawer', label: 'Drawer' },
      { id: 'popover', label: 'Popover' },
      { id: 'tooltip', label: 'Tooltip' },
    ],
  },
]

export const PREVIEW_NAV_ITEMS = PREVIEW_NAV.flatMap((group) => group.items)
