export const EXAMPLE_ROWS = [
  ['ID', 'Product Name', 'Category', 'Price', 'Stock', 'Status'],
  ['1', 'Wireless Mouse', 'Electronics', '149000', '50', 'Active'],
  ['2', 'Mechanical Keyboard', 'Electronics', '750000', '30', 'Active'],
  ['3', 'USB-C Hub', 'Electronics', '320000', '0', 'Out of Stock'],
  ['4', 'Notebook A5', 'Stationery', '25000', '200', 'Active'],
  ['5', 'Mouse Pad XL', 'Accessories', '85000', '60', 'Active'],
]

export function rowsToText(rows) {
  return rows.map(row => row.map(cell => `="${cell}"`).join('\t')).join('\n')
}

export function getColLabels(rows) {
  const maxCols = Math.max(...rows.map(r => r.length), 0)
  return Array.from({ length: maxCols }, (_, i) => {
    let label = '', n = i
    do {
      label = String.fromCharCode(65 + (n % 26)) + label
      n = Math.floor(n / 26) - 1
    } while (n >= 0)
    return label
  })
}

export function parseLine(line) {
  const quoted = [...line.matchAll(/="([^"]*)"/g)]
  if (quoted.length > 0) return quoted.map(m => m[1])
  return line.split('\t')
}

export function highlightJson(str) {
  return str
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match) => {
        if (/^"/.test(match))
          return /:$/.test(match)
            ? `<span style="color:#93c5fd">${match}</span>`
            : `<span style="color:#86efac">${match}</span>`
        if (/true|false/.test(match)) return `<span style="color:#c4b5fd">${match}</span>`
        if (/null/.test(match)) return `<span style="color:#fca5a5">${match}</span>`
        return `<span style="color:#fbbf24">${match}</span>`
      }
    )
}
