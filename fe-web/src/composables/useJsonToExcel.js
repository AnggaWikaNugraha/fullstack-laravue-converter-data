import { ref, computed } from 'vue'
import { useMutation } from '@tanstack/vue-query'
import { parseJsonInput, getJsonHeaders, getJsonRows } from '../utils/json'
import { apiJsonToExcel } from '../api/json'

export function useJsonToExcel() {
  const rawJson = ref('')
  const filename = ref('export')

  const parsed = computed(() => parseJsonInput(rawJson.value))
  const headers = computed(() => getJsonHeaders(parsed.value?.data))
  const rows = computed(() => getJsonRows(parsed.value?.data))
  const hasData = computed(() => !!parsed.value?.data)

  const steps = computed(() => [
    {
      n: 1,
      label: 'JSON Input',
      hint: parsed.value?.data
        ? `${parsed.value.data.length} records`
        : parsed.value?.error ? 'Invalid JSON' : 'Paste your JSON',
      done: !!parsed.value?.data,
      active: true,
    },
    {
      n: 2,
      label: 'Preview',
      hint: parsed.value?.data ? `${headers.value.length} columns` : 'Waiting for input',
      done: false,
      active: !!parsed.value?.data,
    },
    {
      n: 3,
      label: 'Download Excel',
      hint: parsed.value?.data ? 'Ready to download' : 'Waiting for preview',
      done: false,
      active: !!parsed.value?.data,
    },
  ])

  const { isPending: loading, error: apiError, mutate: download } = useMutation({
    mutationFn: () => apiJsonToExcel({ json: rawJson.value, filename: filename.value }),
    onSuccess: (blob) => {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename.value + '.xlsx'
      a.click()
      URL.revokeObjectURL(url)
    },
  })

  function reset() {
    rawJson.value = ''
    filename.value = 'export'
  }

  return { rawJson, filename, parsed, headers, rows, hasData, steps, loading, apiError, download, reset }
}
