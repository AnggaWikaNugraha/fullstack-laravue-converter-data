import { parse, formatHex, formatRgb, formatHsl, converter } from 'culori'

const toOklch = converter('oklch')
const toRgb = converter('rgb')

export const EXAMPLE_COLORS = [
  { label: 'Indigo', value: '#6366f1' },
  { label: 'Emerald', value: '#10b981' },
  { label: 'Rose', value: '#f43f5e' },
  { label: 'OKLCH', value: 'oklch(70% 0.15 200)' },
]

export function parseColor(raw) {
  if (!raw?.trim()) return null
  const color = parse(raw.trim())
  if (!color) return { error: 'Invalid color value.' }
  return { data: color }
}

export function detectFormat(raw) {
  const t = raw?.trim().toLowerCase() ?? ''
  if (t.startsWith('#')) return 'HEX'
  if (t.startsWith('rgb')) return 'RGB'
  if (t.startsWith('hsl')) return 'HSL'
  if (t.startsWith('oklch')) return 'OKLCH'
  if (t.startsWith('oklab')) return 'OKLAB'
  return 'CSS'
}

function clampRgb(rgb) {
  return {
    mode: 'rgb',
    r: Math.max(0, Math.min(1, rgb.r ?? 0)),
    g: Math.max(0, Math.min(1, rgb.g ?? 0)),
    b: Math.max(0, Math.min(1, rgb.b ?? 0)),
  }
}

function formatOklch(c) {
  if (!c) return null
  const l = (c.l * 100).toFixed(2)
  const chroma = (c.c ?? 0).toFixed(4)
  const hue = c.h != null && !isNaN(c.h) ? c.h.toFixed(2) : '0'
  return `oklch(${l}% ${chroma} ${hue})`
}

export function convertColor(color) {
  if (!color) return null

  const rgb = toRgb(color)
  const isOutOfGamut =
    rgb.r < -0.001 || rgb.r > 1.001 ||
    rgb.g < -0.001 || rgb.g > 1.001 ||
    rgb.b < -0.001 || rgb.b > 1.001

  const safeRgb = isOutOfGamut ? clampRgb(rgb) : rgb
  const oklchColor = toOklch(color)

  return {
    hex: formatHex(safeRgb),
    rgb: formatRgb(safeRgb),
    hsl: formatHsl(safeRgb),
    oklch: formatOklch(oklchColor),
    outOfGamut: isOutOfGamut,
  }
}
