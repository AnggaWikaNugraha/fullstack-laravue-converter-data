import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
})

export async function apiParseExcel({ file, sheet }) {
  const form = new FormData()
  form.append('file', file)
  if (sheet) form.append('sheet', sheet)
  const { data } = await http.post('/api/excel/parse', form)
  return data
}

export async function apiConvertExcel({ rows, headerRow, dataFormat = 'array_of_objects' }) {
  const { data } = await http.post('/api/excel/convert', {
    rows,
    header_row: headerRow,
    data_format: dataFormat,
  })
  return data
}
