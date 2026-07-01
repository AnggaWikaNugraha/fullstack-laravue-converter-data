export const UNITS = ['px', 'rem', 'em', 'vh', 'vw']

export const DEFAULT_CONTEXT = {
  baseFontSize: 16,
  viewportWidth: 1440,
  viewportHeight: 900,
}

export const EXAMPLE_VALUES = [
  { label: '16px', value: '16', unit: 'px' },
  { label: '1rem', value: '1', unit: 'rem' },
  { label: '100vh', value: '100', unit: 'vh' },
]

function toPx(value, unit, ctx) {
  const v = parseFloat(value)
  if (isNaN(v)) return null
  switch (unit) {
    case 'px':  return v
    case 'rem': return v * ctx.baseFontSize
    case 'em':  return v * ctx.baseFontSize
    case 'vh':  return v * ctx.viewportHeight / 100
    case 'vw':  return v * ctx.viewportWidth / 100
    default:    return null
  }
}

function fromPx(px, unit, ctx) {
  switch (unit) {
    case 'px':  return px
    case 'rem': return px / ctx.baseFontSize
    case 'em':  return px / ctx.baseFontSize
    case 'vh':  return px / ctx.viewportHeight * 100
    case 'vw':  return px / ctx.viewportWidth * 100
    default:    return null
  }
}

function formatValue(v) {
  if (v === null || isNaN(v) || !isFinite(v)) return null
  return parseFloat(v.toFixed(4)).toString()
}

export function convertAll(rawValue, fromUnit, ctx) {
  const px = toPx(rawValue, fromUnit, ctx)
  if (px === null) return null

  return UNITS.map(unit => ({
    unit,
    value: formatValue(fromPx(px, unit, ctx)),
    isSource: unit === fromUnit,
  }))
}
