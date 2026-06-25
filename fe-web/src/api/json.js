import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
})

export async function apiJsonToExcel({ json, filename = 'export' }) {
  const response = await http.post(
    '/api/json/to-excel',
    { json, filename },
    { responseType: 'blob' },
  )
  return response.data
}
