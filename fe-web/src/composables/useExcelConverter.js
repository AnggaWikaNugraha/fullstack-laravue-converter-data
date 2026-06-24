import { ref, watch } from 'vue'
import { useMutation } from '@tanstack/vue-query'
import { apiConvertExcel } from '../api/excel'

export function useExcelConverter(props, emit) {
  const headerRow = ref(1)

  const { isPending: loading, error, mutate: doConvert } = useMutation({
    mutationFn: () => apiConvertExcel({ rows: props.rows, headerRow: headerRow.value }),
    onSuccess: (data) => emit('convert', data),
  })

  watch([() => props.rows, headerRow], () => {
    if (props.rows.length >= 2) doConvert()
  }, { deep: true })

  return { headerRow, loading, error }
}
