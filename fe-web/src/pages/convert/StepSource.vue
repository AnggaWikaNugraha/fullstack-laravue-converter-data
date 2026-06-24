<script setup>
import { useExcelParser } from '../../composables/useExcelParser'
import { rowsToText, EXAMPLE_ROWS } from '../../utils/excel'
import AppButton from '../../components/AppButton.vue'
import AppSelect from '../../components/AppSelect.vue'

const props = defineProps({
  sheets: { type: Array, default: () => [] },
  activeSheet: { type: String, default: '' },
})
const emit = defineEmits(['parsed'])

const {
  loading,
  error,
  rawText,
  selectedSheet,
  onFileChange,
  onSheetChange } = useExcelParser(props, emit)

function loadExample() {
  rawText.value = rowsToText(EXAMPLE_ROWS)
  error.value = ''
}
</script>

<template>
  <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
    <!-- Card header -->
    <div class="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
      <div class="flex items-center gap-3">
        <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold shrink-0">1</span>
        <span class="text-sm font-semibold text-slate-700">Source Data</span>

        <div class="flex items-center gap-1.5 ml-2">
          <span class="text-xs text-slate-400">Source</span>
          <AppSelect>
            <option>Excel</option>
          </AppSelect>
        </div>

        <div v-if="sheets.length" class="flex items-center gap-1.5">
          <span class="text-xs text-slate-400">Sheet</span>
          <AppSelect :model-value="selectedSheet || activeSheet" @change="onSheetChange">
            <option v-for="s in sheets" :key="s" :value="s">{{ s }}</option>
          </AppSelect>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <AppButton variant="soft" @click="loadExample">Example</AppButton>
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
        placeholder="Paste data here or click Upload File / Example..."
        class="w-full h-48 bg-slate-950 text-slate-200 font-mono text-xs leading-relaxed p-5 resize-none outline-none placeholder-slate-600"
        spellcheck="false"
      />
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
        <span>⚠</span> {{ error?.message ?? 'Failed to read file.' }}
      </p>
      <p v-else class="text-xs text-slate-400">
        Supports <code class="text-slate-500">.xlsx</code> · <code class="text-slate-500">.xls</code> · <code class="text-slate-500">.xlsm</code>
      </p>
      <span class="text-xs text-slate-300">Auto-updates on change</span>
    </div>
  </div>
</template>
