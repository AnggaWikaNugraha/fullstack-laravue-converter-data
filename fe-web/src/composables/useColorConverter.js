import { ref, computed } from 'vue'
import { parseColor, convertColor, detectFormat } from '../utils/color'

export function useColorConverter() {
  const input = ref('')

  const parsed = computed(() => parseColor(input.value))
  const format = computed(() => parsed.value?.data ? detectFormat(input.value) : null)
  const conversions = computed(() => convertColor(parsed.value?.data))
  const hasData = computed(() => !!parsed.value?.data)

  const steps = computed(() => [
    {
      n: 1,
      label: 'Input',
      hint: parsed.value?.data
        ? `${format.value} detected`
        : parsed.value?.error ? 'Invalid color' : 'Enter a color value',
      done: hasData.value,
      active: true,
    },
    {
      n: 2,
      label: 'Conversions',
      hint: hasData.value ? 'HEX · RGB · HSL · OKLCH' : 'Waiting for input',
      done: false,
      active: hasData.value,
    },
  ])

  function reset() {
    input.value = ''
  }

  return { input, parsed, format, conversions, hasData, steps, reset }
}
