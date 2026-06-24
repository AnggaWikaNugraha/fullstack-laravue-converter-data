<script setup>
import { useJsonOutput } from '../../composables/useJsonOutput'
import { toRef } from 'vue'
import AppButton from '../../components/AppButton.vue'
import AppSelect from '../../components/AppSelect.vue'

const props = defineProps({
  result: { type: Object, default: null },
})

const { indentSize, minify, copied, jsonString, highlightedJson, copyToClipboard, downloadFile } = useJsonOutput(toRef(props, 'result'))
</script>

<template>
  <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
    <div class="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
      <div class="flex items-center gap-3">
        <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold shrink-0">3</span>
        <span class="text-sm font-semibold text-slate-700">JSON Output</span>
        <span v-if="result?.total" class="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200">
          {{ result.total }} rows
        </span>
      </div>
      <div v-if="result" class="flex items-center gap-2">
        <AppButton variant="outline" @click="copyToClipboard">
          <svg v-if="!copied" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
          </svg>
          <svg v-else class="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
          </svg>
          {{ copied ? 'Copied!' : 'Copy' }}
        </AppButton>
        <AppButton variant="primary" @click="downloadFile">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 3v12"/>
          </svg>
          Download .json
        </AppButton>
      </div>
    </div>

    <div class="flex">
      <div class="w-44 shrink-0 p-4 space-y-4 border-r border-slate-100">
        <div>
          <label class="block text-xs font-medium text-slate-500 mb-1.5">Indent Size</label>
          <AppSelect v-model="indentSize" :disabled="minify" class="w-full">
            <option :value="2">2 spaces</option>
            <option :value="4">4 spaces</option>
          </AppSelect>
        </div>
        <label class="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
          <div class="w-8 h-4 rounded-full transition-colors relative" :class="minify ? 'bg-indigo-600' : 'bg-slate-200'" @click="minify = !minify">
            <div class="w-3 h-3 bg-white rounded-full absolute top-0.5 transition-transform shadow-sm" :class="minify ? 'translate-x-4' : 'translate-x-0.5'"></div>
          </div>
          Minify
        </label>
      </div>

      <div class="flex-1 overflow-auto max-h-96 bg-slate-950">
        <div v-if="!jsonString" class="flex flex-col items-center justify-center h-36 gap-2 text-slate-600">
          <svg class="w-7 h-7 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4-4 4M7 8l-4 4 4 4M14 4l-4 16"/>
          </svg>
          <p class="text-xs">JSON output will appear here</p>
        </div>
        <pre v-else class="font-mono text-xs leading-relaxed p-5 whitespace-pre text-slate-400" v-html="highlightedJson" />
      </div>
    </div>
  </div>
</template>
