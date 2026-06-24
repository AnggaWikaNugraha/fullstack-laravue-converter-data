import { ref, computed } from 'vue'
import { highlightJson } from '../utils/excel'

export function useJsonOutput(result) {
  const indentSize = ref(2)
  const minify = ref(false)
  const copied = ref(false)

  const jsonString = computed(() => {
    if (!result.value?.data) return ''
    return minify.value
      ? JSON.stringify(result.value.data)
      : JSON.stringify(result.value.data, null, indentSize.value)
  })

  const highlightedJson = computed(() => highlightJson(jsonString.value))

  function copyToClipboard() {
    navigator.clipboard.writeText(jsonString.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  }

  function downloadFile() {
    const blob = new Blob([jsonString.value], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'output.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return { indentSize, minify, copied, jsonString, highlightedJson, copyToClipboard, downloadFile }
}
