<script setup>
import { computed } from 'vue'
import { useConverter } from '../composables/useConverter'
import StepSource from './convert/StepSource.vue'
import StepPreview from './convert/StepPreview.vue'
import StepOutput from './convert/StepOutput.vue'

const { sheets, activeSheet, rows, jsonResult, hasData, onParsed, onConverted, reset } = useConverter()

const steps = computed(() => [
  {
    n: 1,
    label: 'Source Data',
    hint: rows.value.length ? `${rows.value.length} rows loaded` : 'Upload or paste',
    done: rows.value.length > 0,
    active: true,
  },
  {
    n: 2,
    label: 'Preview',
    hint: jsonResult.value ? 'Converted' : rows.value.length ? `${rows.value.length} rows` : 'Waiting for data',
    done: jsonResult.value !== null,
    active: rows.value.length > 0,
  },
  {
    n: 3,
    label: 'JSON Output',
    hint: jsonResult.value ? `${jsonResult.value.total} records` : 'Waiting for preview',
    done: false,
    active: jsonResult.value !== null,
  },
])
</script>

<template>
  <div class="min-h-[calc(100vh-3.5rem)] bg-slate-50">

    <!-- Mobile stepper bar (hidden on lg+) -->
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
            :class="step.done ? 'bg-emerald-200' : 'bg-slate-200'">
          </div>
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

      <!-- Sidebar (hidden on mobile) -->
      <aside class="hidden lg:flex w-56 shrink-0 bg-white border-r border-slate-100 sticky top-14 h-[calc(100vh-3.5rem)] flex-col px-5 py-8">
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">Excel → JSON</p>

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
                :class="step.done ? 'bg-emerald-200' : 'bg-slate-100'">
              </div>
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
        <StepSource :sheets="sheets" :active-sheet="activeSheet" @parsed="onParsed" />
        <StepPreview :rows="rows" @convert="onConverted" />
        <StepOutput :result="jsonResult" />
      </main>

    </div>
  </div>
</template>
