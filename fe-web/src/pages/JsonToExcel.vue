<script setup>
import { useJsonToExcel } from '../composables/useJsonToExcel'
import { EXAMPLE_JSON } from '../utils/json'
import AppButton from '../components/AppButton.vue'

const {
  rawJson,
  filename,
  parsed,
  headers,
  rows,
  hasData,
  steps,
  loading,
  apiError,
  download,
  reset } = useJsonToExcel()

</script>

<template>
  <div class="min-h-[calc(100vh-3.5rem)] bg-slate-50">

    <!-- Mobile stepper bar -->
    <div class="lg:hidden bg-white border-b border-slate-100 px-4 py-3">
      <div class="flex items-center">
        <template v-for="(step, i) in steps" :key="step.n">
          <div class="flex items-center gap-1.5 shrink-0">
            <div :class="[
              'w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all',
              step.done   ? 'bg-emerald-500 text-white' :
              step.active ? 'bg-indigo-600 text-white' :
                            'bg-slate-100 text-slate-400',
            ]">
              <svg v-if="step.done" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
              <span v-else>{{ step.n }}</span>
            </div>
            <span :class="['text-xs font-medium hidden sm:block', step.active || step.done ? 'text-slate-700' : 'text-slate-400']">
              {{ step.label }}
            </span>
          </div>
          <div v-if="i < steps.length - 1" class="flex-1 h-px mx-2"
            :class="step.done ? 'bg-emerald-200' : 'bg-slate-200'" />
        </template>
        <button v-if="hasData" @click="reset"
          class="ml-3 shrink-0 text-xs text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h5M20 20v-5h-5M4 9a9 9 0 0114.83-3.83M20 15a9 9 0 01-14.83 3.83"/>
          </svg>
          Reset
        </button>
      </div>
    </div>

    <!-- Desktop: sidebar + content -->
    <div class="max-w-6xl mx-auto flex min-h-[calc(100vh-3.5rem)]">

      <!-- Sidebar -->
      <aside class="hidden lg:flex w-56 shrink-0 bg-white border-r border-slate-100 sticky top-14 h-[calc(100vh-3.5rem)] flex-col px-5 py-8">
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">JSON → Excel</p>

        <div class="flex flex-col flex-1">
          <div v-for="(step, i) in steps" :key="step.n" class="flex gap-3">
            <div class="flex flex-col items-center">
              <div :class="[
                'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-300',
                step.done   ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200' :
                step.active ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' :
                              'bg-slate-100 text-slate-400',
              ]">
                <svg v-if="step.done" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
                <span v-else>{{ step.n }}</span>
              </div>
              <div v-if="i < steps.length - 1" class="w-px flex-1 mt-2 mb-2 min-h-10 transition-colors duration-300"
                :class="step.done ? 'bg-emerald-200' : 'bg-slate-100'" />
            </div>
            <div :class="['pb-8', i === steps.length - 1 ? 'pb-0' : '']">
              <p :class="[
                'text-sm font-semibold leading-tight transition-colors duration-300',
                step.active || step.done ? 'text-slate-800' : 'text-slate-400',
              ]">{{ step.label }}</p>
              <p class="text-xs mt-0.5 transition-colors duration-300"
                :class="step.active || step.done ? 'text-slate-400' : 'text-slate-300'">
                {{ step.hint }}
              </p>
            </div>
          </div>
        </div>

        <button v-if="hasData" @click="reset"
          class="flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-500 transition-colors group">
          <svg class="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h5M20 20v-5h-5M4 9a9 9 0 0114.83-3.83M20 15a9 9 0 01-14.83 3.83"/>
          </svg>
          Reset all
        </button>
      </aside>

      <!-- Main content -->
      <main class="flex-1 px-4 lg:px-8 py-5 lg:py-7 space-y-4 min-w-0">

        <!-- Step 01: JSON Input -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="px-5 py-4 border-b border-slate-100 bg-linear-to-r from-slate-50/80 to-white">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p class="text-[10px] font-bold text-indigo-500 tracking-widest uppercase mb-0.5">Step 01</p>
                <h2 class="text-sm font-bold text-slate-900">JSON Input</h2>
              </div>
              <div class="flex items-center gap-2">
                <AppButton variant="soft" size="sm" @click="rawJson = EXAMPLE_JSON">Example</AppButton>
                <AppButton variant="outline" size="sm" @click="rawJson = ''">Clear</AppButton>
              </div>
            </div>
          </div>

          <div class="relative">
            <textarea
              v-model="rawJson"
              placeholder='Paste a JSON array here, e.g. [{"id": 1, "name": "foo"}, ...]'
              class="w-full h-48 bg-slate-950 text-slate-200 font-mono text-xs leading-relaxed p-5 resize-none outline-none placeholder-slate-600"
              spellcheck="false"
            />
          </div>

          <div class="px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <p v-if="parsed?.error" class="text-xs text-red-500 flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
              </svg>
              {{ parsed.error }}
            </p>
            <p v-else-if="parsed?.data" class="text-xs text-emerald-600 flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
              {{ parsed.data.length }} records · {{ headers.length }} columns
            </p>
            <p v-else class="text-xs text-slate-400">Supports array of objects or array of arrays</p>
            <span class="text-xs text-slate-400 flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Auto-validates on change
            </span>
          </div>
        </div>

        <!-- Step 02: Preview -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="px-5 py-4 border-b border-slate-100 bg-linear-to-r from-slate-50/80 to-white">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p class="text-[10px] font-bold text-indigo-500 tracking-widest uppercase mb-0.5">Step 02</p>
                <h2 class="text-sm font-bold text-slate-900">Preview</h2>
              </div>
              <span v-if="parsed?.data" class="text-xs text-slate-400">
                {{ parsed.data.length }} rows · {{ headers.length }} cols
              </span>
            </div>
          </div>

          <div v-if="!parsed?.data" class="flex flex-col items-center justify-center h-40 gap-3">
            <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 7h18M3 12h18M3 17h18M9 3v18"/>
              </svg>
            </div>
            <p class="text-sm text-slate-400">Paste valid JSON above to see the preview</p>
          </div>

          <div v-else class="overflow-auto max-h-80">
            <table class="text-xs border-collapse w-full">
              <thead class="sticky top-0 z-10">
                <tr>
                  <th class="bg-slate-100 border-b border-r border-slate-200 px-3 py-2.5 text-slate-400 font-medium w-10 text-center">#</th>
                  <th v-for="h in headers" :key="h"
                    class="bg-slate-100 border-b border-r border-slate-200 px-4 py-2.5 text-indigo-700 font-semibold text-left min-w-28 last:border-r-0">
                    {{ h }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, i) in rows" :key="i" class="hover:bg-slate-50 border-l-2 border-l-transparent">
                  <td class="border-b border-r border-slate-100 px-3 py-2 text-slate-400 text-center font-mono bg-slate-50/60">{{ i + 1 }}</td>
                  <td v-for="(cell, j) in row" :key="j"
                    class="border-b border-r border-slate-100 px-4 py-2 text-slate-700 whitespace-nowrap last:border-r-0">
                    {{ cell ?? '' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Step 03: Download -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="px-5 py-4 border-b border-slate-100 bg-linear-to-r from-slate-50/80 to-white">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p class="text-[10px] font-bold text-indigo-500 tracking-widest uppercase mb-0.5">Step 03</p>
                <h2 class="text-sm font-bold text-slate-900">Download Excel</h2>
              </div>
              <AppButton
                variant="primary"
                size="sm"
                :disabled="!parsed?.data || loading"
                @click="download()">
                <svg v-if="loading" class="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                <svg v-else class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 3v12"/>
                </svg>
                {{ loading ? 'Generating...' : 'Download .xlsx' }}
              </AppButton>
            </div>
          </div>

          <div class="px-5 py-5">
            <div v-if="!parsed?.data" class="flex flex-col items-center justify-center h-20 gap-2">
              <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 3v12"/>
                </svg>
              </div>
              <p class="text-sm text-slate-400">Paste valid JSON above to enable download</p>
            </div>

            <div v-else class="flex flex-wrap items-center gap-3">
              <label class="text-xs text-slate-500 shrink-0">Filename</label>
              <div class="flex items-center gap-1.5">
                <input
                  v-model="filename"
                  type="text"
                  class="border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-indigo-300 w-44"
                  placeholder="export"
                />
                <span class="text-xs text-slate-400 font-mono">.xlsx</span>
              </div>
              <p v-if="apiError" class="text-xs text-red-500 flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                </svg>
                {{ apiError?.message ?? 'Failed to generate Excel.' }}
              </p>
            </div>
          </div>
        </div>

      </main>
    </div>
  </div>
</template>
