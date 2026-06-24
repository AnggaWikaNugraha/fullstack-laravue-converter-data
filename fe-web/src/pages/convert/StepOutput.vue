<script setup>
import { toRef } from 'vue'
import { useJsonOutput } from '../../composables/useJsonOutput'
import AppButton from '../../components/AppButton.vue'
import AppSelect from '../../components/AppSelect.vue'

const props = defineProps({
  result: { type: Object, default: null },
})

const {
  indentSize,
  minify,
  copied,
  jsonString,
  highlightedJson,
  copyToClipboard,
  downloadFile } = useJsonOutput(toRef(props, 'result'))

</script>

<template>
  <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

    <!-- Header -->
    <div class="px-5 py-4 border-b border-slate-100 bg-linear-to-r from-slate-50/80 to-white">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p class="text-[10px] font-bold text-indigo-500 tracking-widest uppercase mb-0.5">Step 03</p>
          <div class="flex items-center gap-2.5">
            <h2 class="text-sm font-bold text-slate-900">JSON Output</h2>
            <span v-if="result?.total" class="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200">
              {{ result.total }} records
            </span>
          </div>
        </div>
        <div v-if="result" class="flex items-center gap-2">
          <AppButton variant="outline" size="sm" @click="copyToClipboard">
            <svg v-if="!copied" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
            </svg>
            <svg v-else class="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
            {{ copied ? 'Copied!' : 'Copy' }}
          </AppButton>
          <AppButton variant="primary" size="sm" @click="downloadFile">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 3v12"/>
            </svg>
            Download .json
          </AppButton>
        </div>
      </div>
    </div>

    <!-- Body -->
    <div class="flex flex-col sm:flex-row">

      <!-- Options panel -->
      <div class="sm:w-44 shrink-0 px-5 py-4 sm:py-5 space-y-4 sm:space-y-5 border-b sm:border-b-0 sm:border-r border-slate-100 bg-slate-50/40 flex flex-row sm:flex-col gap-5 sm:gap-0">
        <div>
          <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Indent Size</label>
          <AppSelect v-model="indentSize" :disabled="minify" class="w-full">
            <option :value="2">2 spaces</option>
            <option :value="4">4 spaces</option>
          </AppSelect>
        </div>

        <div>
          <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Format</label>
          <button
            class="flex items-center gap-2 text-xs text-slate-600 cursor-pointer group"
            @click="minify = !minify">
            <div class="w-8 h-4 rounded-full transition-colors relative shrink-0"
              :class="minify ? 'bg-indigo-600' : 'bg-slate-200'">
              <div class="w-3 h-3 bg-white rounded-full absolute top-0.5 transition-transform shadow-sm"
                :class="minify ? 'translate-x-4' : 'translate-x-0.5'"></div>
            </div>
            <span :class="minify ? 'text-indigo-600 font-medium' : 'text-slate-500'">Minify</span>
          </button>
        </div>
      </div>

      <!-- JSON area -->
      <div class="flex-1 overflow-auto max-h-96 bg-slate-950">
        <div v-if="!jsonString" class="flex flex-col items-center justify-center h-40 gap-3">
          <div class="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
            <svg class="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4-4 4M7 8l-4 4 4 4M14 4l-4 16"/>
            </svg>
          </div>
          <p class="text-xs text-slate-600">JSON output will appear here</p>
        </div>
        <pre v-else class="font-mono text-xs leading-relaxed p-5 whitespace-pre text-slate-400" v-html="highlightedJson" />
      </div>

    </div>
  </div>
</template>
