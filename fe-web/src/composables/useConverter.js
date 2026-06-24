import { ref, computed } from 'vue'

export function useConverter() {
  const sheets = ref([])
  const activeSheet = ref('')
  const rows = ref([])
  const jsonResult = ref(null)

  const hasData = computed(() => rows.value.length > 0 || jsonResult.value !== null)

  function onParsed(data) {
    sheets.value = data.sheets
    activeSheet.value = data.active_sheet
    rows.value = data.rows
    jsonResult.value = null
  }

  function onConverted(data) {
    jsonResult.value = data
  }

  function reset() {
    sheets.value = []
    activeSheet.value = ''
    rows.value = []
    jsonResult.value = null
  }

  return { sheets, activeSheet, rows, jsonResult, hasData, onParsed, onConverted, reset }
}
