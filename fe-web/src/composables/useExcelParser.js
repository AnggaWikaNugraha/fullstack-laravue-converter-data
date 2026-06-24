import { ref, watch } from 'vue'
import { useMutation } from '@tanstack/vue-query'
import { rowsToText, parseLine } from '../utils/excel'
import { apiParseExcel } from '../api/excel'

export function useExcelParser(props, emit) {
  const rawText = ref('')
  const fileRef = ref(null)
  const selectedSheet = ref('')

  let debounceTimer = null

  const { isPending: loading, error, mutate: parseFile } = useMutation({
    mutationFn: () => apiParseExcel({ file: fileRef.value, sheet: selectedSheet.value }),
    onSuccess: (data) => {
      clearTimeout(debounceTimer)
      rawText.value = rowsToText(data.rows)
      selectedSheet.value = data.active_sheet
      emit('parsed', data)
    },
  })

  watch(rawText, (val) => {
    clearTimeout(debounceTimer)
    if (!val.trim()) return
    debounceTimer = setTimeout(() => parseManual(val), 600)
  })

  function parseManual(text) {
    const rows = text.trim().split('\n').map(parseLine)
    emit('parsed', {
      sheets: props.sheets.length ? props.sheets : ['Sheet1'],
      active_sheet: selectedSheet.value || props.activeSheet || 'Sheet1',
      rows,
    })
  }

  function onFileChange(e) {
    const file = e.target.files[0]
    if (!file) return
    fileRef.value = file
    parseFile()
  }

  function onSheetChange(e) {
    selectedSheet.value = e.target.value
    if (fileRef.value) parseFile()
  }

  return { loading, error, rawText, selectedSheet, onFileChange, onSheetChange }
}
