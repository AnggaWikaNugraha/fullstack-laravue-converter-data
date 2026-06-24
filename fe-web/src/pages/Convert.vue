<script setup>
import { useConverter } from '../composables/useConverter'
import StepSource from './convert/StepSource.vue'
import StepPreview from './convert/StepPreview.vue'
import StepOutput from './convert/StepOutput.vue'

const {
  sheets,
  activeSheet,
  rows,
  jsonResult,
  hasData,
  onParsed,
  onConverted,
  reset } = useConverter()

</script>

<template>
  <main class="max-w-4xl mx-auto px-5 py-8 space-y-2">
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-xl font-bold text-slate-900">Excel → JSON</h1>
        <p class="text-sm text-slate-400 mt-0.5">Upload or paste your data — preview and output update automatically</p>
      </div>
      <button v-if="hasData" @click="reset"
        class="text-xs font-medium text-slate-400 hover:text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">
        ↺ Reset
      </button>
    </div>

    <StepSource :sheets="sheets" :active-sheet="activeSheet" @parsed="onParsed" />

    <div class="flex justify-center py-1">
      <div class="flex flex-col items-center gap-0.5">
        <div class="w-px h-3 bg-slate-300"></div>
        <svg class="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 16l-6-6h12z"/></svg>
      </div>
    </div>

    <StepPreview :rows="rows" @convert="onConverted" />

    <div class="flex justify-center py-1">
      <div class="flex flex-col items-center gap-0.5">
        <div class="w-px h-3 bg-slate-300"></div>
        <svg class="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 16l-6-6h12z"/></svg>
      </div>
    </div>

    <StepOutput :result="jsonResult" />
  </main>
</template>
