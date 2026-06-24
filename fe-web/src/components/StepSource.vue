<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'

const props = defineProps({
  sheets: { type: Array, default: () => [] },
  activeSheet: { type: String, default: '' },
})
const emit = defineEmits(['parsed'])

const loading = ref(false)
const error = ref('')
const rawText = ref('')
const fileRef = ref(null)
const selectedSheet = ref('')

let debounceTimer = null

const EXAMPLE_ROWS = [
  ['ID', 'Product Name', 'Category', 'Price', 'Stock', 'Status'],
  ['1', 'Wireless Mouse', 'Electronics', '149000', '50', 'Active'],
  ['2', 'Mechanical Keyboard', 'Electronics', '750000', '30', 'Active'],
  ['3', 'USB-C Hub', 'Electronics', '320000', '0', 'Out of Stock'],
  ['4', 'Notebook A5', 'Stationery', '25000', '200', 'Active'],
  ['5', 'Mouse Pad XL', 'Accessories', '85000', '60', 'Active'],
]

function rowsToText(rows) {
  return rows.map(row => row.map(cell => `="${cell}"`).join('\t')).join('\n')
}

function parseLine(line) {
  const quoted = [...line.matchAll(/="([^"]*)"/g)]
  if (quoted.length > 0) return quoted.map(m => m[1])
  return line.split('\t')
}

function loadExample() {
  rawText.value = rowsToText(EXAMPLE_ROWS)
  error.value = ''
}

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

async function onFileChange(e) {
  const file = e.target.files[0]
  if (!file) return
  fileRef.value = file
  await parseFile(file, selectedSheet.value || '')
}

async function onSheetChange(e) {
  selectedSheet.value = e.target.value
  if (fileRef.value) await parseFile(fileRef.value, e.target.value)
}

async function parseFile(file, sheet) {
  loading.value = true
  error.value = ''
  const form = new FormData()
  form.append('file', file)
  if (sheet) form.append('sheet', sheet)
  try {
    const { data } = await axios.post('/api/excel/parse', form)
    clearTimeout(debounceTimer)
    rawText.value = rowsToText(data.rows)
    selectedSheet.value = data.active_sheet
    emit('parsed', data)
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to read file.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

    <!-- Card header -->
    <div class="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
      <div class="flex items-center gap-3">
        <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold shrink-0">1</span>
        <span class="text-sm font-semibold text-slate-700">Source Data</span>

        <!-- Source type -->
        <div class="flex items-center gap-1.5 ml-2">
          <span class="text-xs text-slate-400">Source</span>
          <select class="text-xs border border-slate-200 rounded-md px-2 py-1 bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>Excel</option>
          </select>
        </div>

        <!-- Sheet selector -->
        <div v-if="sheets.length" class="flex items-center gap-1.5">
          <span class="text-xs text-slate-400">Sheet</span>
          <select
            :value="selectedSheet || activeSheet"
            @change="onSheetChange"
            class="text-xs border border-slate-200 rounded-md px-2 py-1 bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option v-for="s in sheets" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-2">
        <button
          @click="loadExample"
          class="text-xs font-medium px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
        >
          Example
        </button>
        <label class="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-700 transition-colors cursor-pointer">
          ↑ Upload File
          <input type="file" accept=".xlsx,.xls,.xlsm" class="hidden" @change="onFileChange" />
        </label>
      </div>
    </div>

    <!-- Textarea -->
    <div class="relative">
      <textarea
        v-model="rawText"
        placeholder='Paste data here or click Upload File / Example...'
        class="w-full h-48 bg-slate-950 text-slate-200 font-mono text-xs leading-relaxed p-5 resize-none outline-none placeholder-slate-600"
        spellcheck="false"
      />
      <!-- Loading overlay -->
      <div v-if="loading" class="absolute inset-0 bg-slate-950/80 flex items-center justify-center gap-2">
        <svg class="animate-spin w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
        <span class="text-sm text-slate-300">Reading file...</span>
      </div>
    </div>

    <!-- Footer -->
    <div class="px-5 py-2.5 border-t border-slate-100 flex items-center justify-between">
      <p v-if="error" class="text-xs text-red-500 flex items-center gap-1">
        <span>⚠</span> {{ error }}
      </p>
      <p v-else class="text-xs text-slate-400">
        Supports <code class="text-slate-500">.xlsx</code> · <code class="text-slate-500">.xls</code> · <code class="text-slate-500">.xlsm</code>
      </p>
      <span class="text-xs text-slate-300">Auto-updates on change</span>
    </div>

  </div>
</template>
