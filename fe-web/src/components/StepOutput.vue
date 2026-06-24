<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  result: { type: Object, default: null },
})

const indentSize = ref(2)
const minify = ref(false)
const copied = ref(false)

const jsonString = computed(() => {
  if (!props.result?.data) return ''
  return minify.value
    ? JSON.stringify(props.result.data)
    : JSON.stringify(props.result.data, null, indentSize.value)
})

const highlightedJson = computed(() => {
  if (!jsonString.value) return ''
  return jsonString.value
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match) => {
        if (/^"/.test(match))
          return /:$/.test(match)
            ? `<span style="color:#93c5fd">${match}</span>`
            : `<span style="color:#86efac">${match}</span>`
        if (/true|false/.test(match)) return `<span style="color:#c4b5fd">${match}</span>`
        if (/null/.test(match)) return `<span style="color:#fca5a5">${match}</span>`
        return `<span style="color:#fbbf24">${match}</span>`
      }
    )
})

function copyToClipboard() {
  navigator.clipboard.writeText(jsonString.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}

function downloadFile() {
  const blob = new Blob([jsonString.value], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'output.json'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

    <!-- Card header -->
    <div class="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
      <div class="flex items-center gap-3">
        <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold shrink-0">3</span>
        <span class="text-sm font-semibold text-slate-700">JSON Output</span>
        <span v-if="result?.total" class="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200">
          {{ result.total }} rows
        </span>
      </div>

      <div v-if="result" class="flex items-center gap-2">
        <button
          @click="copyToClipboard"
          class="text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
        >
          <svg v-if="!copied" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
          </svg>
          <svg v-else class="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
          </svg>
          {{ copied ? 'Copied!' : 'Copy' }}
        </button>
        <button
          @click="downloadFile"
          class="text-xs font-medium px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors flex items-center gap-1.5"
        >
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 3v12"/>
          </svg>
          Download .json
        </button>
      </div>
    </div>

    <div class="flex">
      <!-- Settings panel -->
      <div class="w-44 shrink-0 p-4 space-y-4 border-r border-slate-100">
        <div>
          <label class="block text-xs font-medium text-slate-500 mb-1.5">Indent Size</label>
          <select
            v-model.number="indentSize"
            :disabled="minify"
            class="w-full text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <option :value="2">2 spaces</option>
            <option :value="4">4 spaces</option>
          </select>
        </div>

        <label class="flex items-center gap-2 text-xs text-slate-600 cursor-pointer group">
          <div
            class="w-8 h-4 rounded-full transition-colors relative"
            :class="minify ? 'bg-indigo-600' : 'bg-slate-200'"
            @click="minify = !minify"
          >
            <div
              class="w-3 h-3 bg-white rounded-full absolute top-0.5 transition-transform shadow-sm"
              :class="minify ? 'translate-x-4' : 'translate-x-0.5'"
            ></div>
          </div>
          Minify
        </label>
      </div>

      <!-- JSON output area -->
      <div class="flex-1 overflow-auto max-h-96 bg-slate-950 relative">

        <!-- Empty state -->
        <div v-if="!jsonString" class="flex flex-col items-center justify-center h-36 gap-2 text-slate-600">
          <svg class="w-7 h-7 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4-4 4M7 8l-4 4 4 4M14 4l-4 16"/>
          </svg>
          <p class="text-xs">JSON output will appear here</p>
        </div>

        <!-- JSON with syntax highlight -->
        <pre
          v-else
          class="font-mono text-xs leading-relaxed p-5 whitespace-pre text-slate-400"
          v-html="highlightedJson"
        />
      </div>
    </div>

  </div>
</template>
