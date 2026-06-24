<script setup>
import { ref, computed } from 'vue'
import StepSource from './components/StepSource.vue'
import StepPreview from './components/StepPreview.vue'
import StepOutput from './components/StepOutput.vue'

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
</script>

<template>
  <div class="min-h-screen bg-slate-50">

    <!-- Header -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-20">
      <div class="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div class="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
            <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 7h18M3 12h18M3 17h18M9 3v18" />
            </svg>
          </div>
          <span class="font-semibold text-slate-900 tracking-tight">Converter Hub</span>
          <span class="text-slate-300 select-none">·</span>
          <span class="text-sm text-slate-400">Excel → JSON</span>
        </div>
        <button
          v-if="hasData"
          @click="reset"
          class="text-xs font-medium text-slate-400 hover:text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          ↺ Reset
        </button>
      </div>
    </header>

    <!-- Main -->
    <main class="max-w-4xl mx-auto px-5 py-8 space-y-2">
      <StepSource :sheets="sheets" :active-sheet="activeSheet" @parsed="onParsed" />

      <!-- Arrow -->
      <div class="flex justify-center py-1">
        <div class="flex flex-col items-center gap-0.5">
          <div class="w-px h-3 bg-slate-300"></div>
          <svg class="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 16l-6-6h12z"/>
          </svg>
        </div>
      </div>

      <StepPreview :rows="rows" @convert="onConverted" />

      <!-- Arrow -->
      <div class="flex justify-center py-1">
        <div class="flex flex-col items-center gap-0.5">
          <div class="w-px h-3 bg-slate-300"></div>
          <svg class="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 16l-6-6h12z"/>
          </svg>
        </div>
      </div>

      <StepOutput :result="jsonResult" />
    </main>
  </div>
</template>
