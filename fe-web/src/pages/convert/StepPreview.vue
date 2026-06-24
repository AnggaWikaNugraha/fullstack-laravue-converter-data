<script setup>
import { computed } from 'vue'
import { useExcelConverter } from '../../composables/useExcelConverter'
import { getColLabels } from '../../utils/excel'
import AppInput from '../../components/AppInput.vue'

const props = defineProps({
  rows: { type: Array, required: true },
})
const emit = defineEmits(['convert'])

const {
  headerRow,
  loading,
  error } = useExcelConverter(props, emit)

const colLabels = computed(() => getColLabels(props.rows))

</script>

<template>
  <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

    <!-- Header -->
    <div class="px-5 py-4 border-b border-slate-100 bg-linear-to-r from-slate-50/80 to-white">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p class="text-[10px] font-bold text-indigo-500 tracking-widest uppercase mb-0.5">Step 02</p>
          <div class="flex items-center gap-2.5">
            <h2 class="text-sm font-bold text-slate-900">Source Preview</h2>
            <span v-if="loading" class="inline-flex items-center gap-1 text-xs text-indigo-500">
              <svg class="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              converting...
            </span>
          </div>
        </div>
        <label class="flex items-center gap-2 text-xs text-slate-500 shrink-0">
          Header row
          <AppInput v-model="headerRow" type="number" :min="1" :max="rows.length || 1" class="w-12" center />
        </label>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="!rows.length" class="flex flex-col items-center justify-center h-40 gap-3 text-slate-400">
      <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
        <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M3 6h18M3 14h18M3 18h18M9 3v18"/>
        </svg>
      </div>
      <p class="text-sm text-slate-400">Upload a file or paste data above to see the preview</p>
    </div>

    <!-- Table -->
    <div v-else class="overflow-auto max-h-80">
      <table class="text-xs border-collapse w-full">
        <thead class="sticky top-0 z-10">
          <tr>
            <th class="bg-slate-100 border-b border-r border-slate-200 px-3 py-2.5 text-slate-400 font-medium w-10 text-center">#</th>
            <th v-for="col in colLabels" :key="col"
              class="bg-slate-100 border-b border-r border-slate-200 px-4 py-2.5 text-slate-500 font-semibold text-center min-w-28 last:border-r-0">
              {{ col }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIdx) in rows" :key="rowIdx"
            :class="rowIdx + 1 === headerRow
              ? 'bg-indigo-50/60 border-l-2 border-l-indigo-500'
              : 'hover:bg-slate-50 border-l-2 border-l-transparent'">
            <td class="border-b border-r border-slate-100 px-3 py-2 text-slate-400 text-center font-mono bg-slate-50/60">
              {{ rowIdx + 1 }}
            </td>
            <td v-for="(cell, colIdx) in row" :key="colIdx"
              class="border-b border-r border-slate-100 px-4 py-2 whitespace-nowrap last:border-r-0"
              :class="rowIdx + 1 === headerRow ? 'font-semibold text-indigo-700' : 'text-slate-700'">
              {{ cell }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Error -->
    <p v-if="error" class="text-xs text-red-500 px-6 py-3 border-t border-slate-100 bg-red-50/50 flex items-center gap-1.5">
      <svg class="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
      </svg>
      {{ error?.message ?? 'Conversion failed.' }}
    </p>
  </div>
</template>
