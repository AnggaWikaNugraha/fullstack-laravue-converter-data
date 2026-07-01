import { ref, reactive, computed } from 'vue'
import { convertAll, DEFAULT_CONTEXT } from '../utils/cssUnit'

export function useCssUnitConverter() {
  const inputValue = ref('')
  const inputUnit = ref('px')
  const showSettings = ref(false)
  const context = reactive({ ...DEFAULT_CONTEXT })

  const hasData = computed(() => {
    const v = parseFloat(inputValue.value)
    return inputValue.value !== '' && !isNaN(v)
  })

  const conversions = computed(() => {
    if (!hasData.value) return null
    return convertAll(inputValue.value, inputUnit.value, context)
  })

  const steps = computed(() => [
    {
      n: 1,
      label: 'Input',
      hint: hasData.value
        ? `${inputValue.value}${inputUnit.value}`
        : 'Enter a value',
      done: hasData.value,
      active: true,
    },
    {
      n: 2,
      label: 'Conversions',
      hint: hasData.value ? 'px · rem · em · vh · vw' : 'Waiting for input',
      done: false,
      active: hasData.value,
    },
  ])

  function reset() {
    inputValue.value = ''
    inputUnit.value = 'px'
    Object.assign(context, DEFAULT_CONTEXT)
    showSettings.value = false
  }

  return { inputValue, inputUnit, showSettings, context, hasData, conversions, steps, reset }
}
