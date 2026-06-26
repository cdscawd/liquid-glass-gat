import {
  DEFAULT_BORDER_RADIUS,
  DEFAULT_EDGE_FALLOFF_RATIO,
  DISPLACEMENT_SCALE,
} from './constants'
import type { LiquidGlassMapInput } from './types'

export { DISPLACEMENT_SCALE }

function clampByte(v: number): number {
  return Math.max(0, Math.min(255, Math.round(v)))
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

/** Inigo Quilez 圆角矩形 SDF（像素坐标，中心为原点） */
function sdRoundedBox(
  x: number,
  y: number,
  halfW: number,
  halfH: number,
  radius: number,
): number {
  const qx = Math.abs(x) - halfW + radius
  const qy = Math.abs(y) - halfH + radius
  return Math.min(Math.max(qx, qy), 0) + Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) - radius
}

function sdfGradient(
  x: number,
  y: number,
  halfW: number,
  halfH: number,
  radius: number,
): { x: number; y: number } {
  const eps = 1
  const dx =
    (sdRoundedBox(x + eps, y, halfW, halfH, radius) -
      sdRoundedBox(x - eps, y, halfW, halfH, radius)) /
    (2 * eps)
  const dy =
    (sdRoundedBox(x, y + eps, halfW, halfH, radius) -
      sdRoundedBox(x, y - eps, halfW, halfH, radius)) /
    (2 * eps)
  const len = Math.hypot(dx, dy) || 1
  return { x: dx / len, y: dy / len }
}

/**
 * 按按钮真实尺寸生成位移贴图：
 * 中心平坦、四周边缘沿法线方向扭曲，模拟玻璃折射
 */
export function generateDisplacementMap(input: LiquidGlassMapInput): string {
  const width = Math.max(Math.round(input.width), 2)
  const height = Math.max(Math.round(input.height), 2)
  const borderRadius = input.borderRadius ?? DEFAULT_BORDER_RADIUS
  const edgeFalloff =
    input.edgeFalloff ??
    Math.min(width, height) * DEFAULT_EDGE_FALLOFF_RATIO
  const strength = input.strength ?? 1

  const halfW = width / 2 - 0.5
  const halfH = height / 2 - 0.5
  const cornerR = Math.min(borderRadius, halfW, halfH)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''

  const imageData = ctx.createImageData(width, height)
  const data = imageData.data
  const cx = width / 2
  const cy = height / 2

  for (let py = 0; py < height; py++) {
    for (let px = 0; px < width; px++) {
      const pX = px - cx + 0.5
      const pY = py - cy + 0.5

      const signedDist = sdRoundedBox(pX, pY, halfW, halfH, cornerR)
      const insideDist = -signedDist
      const grad = sdfGradient(pX, pY, halfW, halfH, cornerR)

      // 边缘强、中心弱：只在靠近边框的区域产生折射扭曲
      const rim = 1 - smoothstep(0, edgeFalloff, insideDist)

      const dispX = grad.x * rim * strength
      const dispY = grad.y * rim * strength

      const i = (py * width + px) * 4
      data[i] = clampByte(128 + dispX * 127)
      data[i + 1] = clampByte(128 + dispY * 127)
      data[i + 2] = 128
      data[i + 3] = 255
    }
  }

  ctx.putImageData(imageData, 0, 0)
  return canvas.toDataURL('image/png')
}
