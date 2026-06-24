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
}

</script>

<template>
  <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

    <!-- Header -->
    <div class="px-5 py-4 border-b border-slate-100 bg-linear-to-r from-slate-50/80 to-white">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p class="text-[10px] font-bold text-indigo-500 tracking-widest uppercase mb-0.5">Step 01</p>
          <h2 class="text-sm font-bold text-slate-900">Source Data</h2>
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          <div v-if="sheets.length" class="flex items-center gap-1.5">
            <span class="text-xs text-slate-400">Sheet</span>
            <AppSelect :model-value="selectedSheet || activeSheet" @change="onSheetChange">
              <option v-for="s in sheets" :key="s" :value="s">{{ s }}</option>
            </AppSelect>
          </div>
          <AppButton variant="soft" size="sm" @click="loadExample">Example</AppButton>
          <label class="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-700 transition-colors cursor-pointer">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 3v13M7 8l5-5 5 5"/>
            </svg>
            Upload File
            <input type="file" accept=".xlsx,.xls,.xlsm" class="hidden" @change="onFileChange" />
          </label>
        </div>
      </div>
    </div>

    <!-- Textarea -->
    <div class="relative">
      <textarea
        v-model="rawText"
        placeholder='Paste your data here in ="value" format, or click Upload File / Example above...'
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
    <div class="px-6 py-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
      <p v-if="error" class="text-xs text-red-500 flex items-center gap-1.5">
        <svg class="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
        </svg>
        {{ error?.message ?? 'Failed to read file.' }}
      </p>
      <p v-else class="text-xs text-slate-400">
        Supports <code class="font-mono text-slate-500">.xlsx</code> · <code class="font-mono text-slate-500">.xls</code> · <code class="font-mono text-slate-500">.xlsm</code>
      </p>
      <span class="text-xs text-slate-400 flex items-center gap-1">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        Auto-updates on change
      </span>
    </div>
  </div>
</template>
