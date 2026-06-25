export const EXAMPLE_JSON = JSON.stringify([
  { ID: 1, Name: 'Wireless Mouse', Category: 'Electronics', Price: 149000, Stock: 50 },
  { ID: 2, Name: 'Mechanical Keyboard', Category: 'Electronics', Price: 750000, Stock: 30 },
  { ID: 3, Name: 'USB-C Hub', Category: 'Electronics', Price: 320000, Stock: 0 },
], null, 2)

export function parseJsonInput(raw) {
  if (!raw.trim()) return null
  try {
    const result = JSON.parse(raw)
    if (!Array.isArray(result) || result.length === 0)
      return { error: 'JSON must be a non-empty array.' }
    return { data: result }
  } catch {
    return { error: 'Invalid JSON.' }
  }
}

export function getJsonHeaders(data) {
  if (!data?.length) return []
  const first = data[0]
  if (typeof first === 'object' && !Array.isArray(first)) return Object.keys(first)
  return data[0].map((_, i) => String.fromCharCode(65 + i))
}

export function getJsonRows(data) {
  if (!data?.length) return []
  const first = data[0]
  if (typeof first === 'object' && !Array.isArray(first))
    return data.map(obj => Object.values(obj))
  return data
}
