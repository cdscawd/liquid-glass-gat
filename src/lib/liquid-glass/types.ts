export interface LiquidGlassMapInput {
  /** 按钮实际宽度（px） */
  width: number
  /** 按钮实际高度（px） */
  height: number
  /** 圆角半径（px），默认 8 */
  borderRadius?: number
  /** 边缘扭曲带宽（px），默认按短边 18% 计算 */
  edgeFalloff?: number
  /** 扭曲强度 0–1，默认 1 */
  strength?: number
}

export interface LiquidGlassParams {
  borderRadius?: number
  edgeFalloff?: number
  strength?: number
}
