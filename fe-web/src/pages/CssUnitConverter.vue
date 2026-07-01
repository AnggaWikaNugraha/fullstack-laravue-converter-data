<script setup>
import { ref } from 'vue'
import { useCssUnitConverter } from '../composables/useCssUnitConverter'
import { UNITS, EXAMPLE_VALUES } from '../utils/cssUnit'

const { inputValue, inputUnit, showSettings, context, hasData, conversions, steps, reset } = useCssUnitConverter()

const copiedKey = ref(null)

async function copyUnit(unit, value) {
  await navigator.clipboard.writeText(`${value}${unit}`)
  copiedKey.value = unit
  setTimeout(() => { copiedKey.value = null }, 1500)
}

function applyExample(ex) {
  inputValue.value = ex.value
  inputUnit.value = ex.unit
}
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
              step.active ? 'bg-violet-600 text-white' :
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
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">CSS Unit</p>

        <div class="flex flex-col flex-1">
          <div v-for="(step, i) in steps" :key="step.n" class="flex gap-3">
            <div class="flex flex-col items-center">
              <div :class="[
                'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-300',
                step.done   ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200' :
                step.active ? 'bg-violet-600 text-white shadow-md shadow-violet-200' :
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

        <!-- Step 01: Input -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="px-5 py-4 border-b border-slate-100 bg-linear-to-r from-slate-50/80 to-white">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p class="text-[10px] font-bold text-violet-500 tracking-widest uppercase mb-0.5">Step 01</p>
                <h2 class="text-sm font-bold text-slate-900">Input</h2>
              </div>
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="text-xs text-slate-400 mr-1">Examples:</span>
                <button
                  v-for="ex in EXAMPLE_VALUES"
                  :key="ex.label"
                  @click="applyExample(ex)"
                  class="text-xs px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors font-medium"
                >
                  {{ ex.label }}
                </button>
              </div>
            </div>
          </div>

          <div class="px-5 py-5 space-y-4">
            <!-- Value + unit selector -->
            <div class="flex gap-3 items-stretch">
              <input
                v-model="inputValue"
                type="number"
                step="any"
                placeholder="16"
                class="w-36 border border-slate-200 rounded-xl px-4 py-2.5 text-lg font-mono text-slate-800 outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 placeholder-slate-300 transition-all"
              />
              <!-- Unit segmented control -->
              <div class="flex flex-1 rounded-xl border border-slate-200 overflow-hidden">
                <button
                  v-for="u in UNITS"
                  :key="u"
                  @click="inputUnit = u"
                  :class="[
                    'flex-1 py-2.5 text-xs font-bold transition-colors border-r border-slate-200 last:border-r-0',
                    inputUnit === u
                      ? 'bg-violet-600 text-white'
                      : 'bg-white text-slate-500 hover:bg-violet-50 hover:text-violet-600',
                  ]"
                >
                  {{ u }}
                </button>
              </div>
            </div>

            <!-- Settings toggle -->
            <button
              @click="showSettings = !showSettings"
              class="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg :class="['w-3.5 h-3.5 transition-transform duration-200', showSettings ? 'rotate-90' : '']"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
              Context settings
            </button>

            <!-- Settings panel -->
            <div v-if="showSettings" class="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Base font size</label>
                <div class="flex items-center gap-1.5">
                  <input
                    v-model.number="context.baseFontSize"
                    type="number"
                    min="1"
                    class="w-20 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-mono text-slate-700 outline-none focus:ring-2 focus:ring-violet-300 bg-white"
                  />
                  <span class="text-xs text-slate-400">px (rem & em)</span>
                </div>
              </div>
              <div>
                <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Viewport width</label>
                <div class="flex items-center gap-1.5">
                  <input
                    v-model.number="context.viewportWidth"
                    type="number"
                    min="1"
                    class="w-20 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-mono text-slate-700 outline-none focus:ring-2 focus:ring-violet-300 bg-white"
                  />
                  <span class="text-xs text-slate-400">px (vw)</span>
                </div>
              </div>
              <div>
                <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Viewport height</label>
                <div class="flex items-center gap-1.5">
                  <input
                    v-model.number="context.viewportHeight"
                    type="number"
                    min="1"
                    class="w-20 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-mono text-slate-700 outline-none focus:ring-2 focus:ring-violet-300 bg-white"
                  />
                  <span class="text-xs text-slate-400">px (vh)</span>
                </div>
              </div>
            </div>
          </div>

          <div class="px-5 py-3 border-t border-slate-100 bg-slate-50/50">
            <p class="text-xs text-slate-400">
              Defaults: base font 16px · viewport 1440 × 900px ·
              <span class="font-medium">em</span> uses same base as rem
            </p>
          </div>
        </div>

        <!-- Step 02: Conversions -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="px-5 py-4 border-b border-slate-100 bg-linear-to-r from-slate-50/80 to-white">
            <div>
              <p class="text-[10px] font-bold text-violet-500 tracking-widest uppercase mb-0.5">Step 02</p>
              <h2 class="text-sm font-bold text-slate-900">Conversions</h2>
            </div>
          </div>

          <!-- Empty state -->
          <div v-if="!hasData" class="flex flex-col items-center justify-center h-40 gap-3">
            <div class="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
              <svg class="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
              </svg>
            </div>
            <p class="text-sm text-slate-400">Enter a value above to see all conversions</p>
          </div>

          <!-- Results -->
          <div v-else class="divide-y divide-slate-100">
            <div
              v-for="item in conversions"
              :key="item.unit"
              :class="[
                'flex items-center px-5 py-3.5 gap-4 transition-colors',
                item.isSource ? 'bg-violet-50/60' : 'hover:bg-slate-50',
              ]"
            >
              <!-- Unit badge -->
              <span :class="[
                'w-10 text-xs font-bold shrink-0',
                item.isSource ? 'text-violet-600' : 'text-slate-400',
              ]">{{ item.unit }}</span>

              <!-- Value -->
              <span :class="[
                'flex-1 font-mono text-base font-semibold',
                item.isSource ? 'text-violet-700' : 'text-slate-800',
              ]">
                {{ item.value }}<span :class="['text-sm font-normal ml-0.5', item.isSource ? 'text-violet-400' : 'text-slate-400']">{{ item.unit }}</span>
              </span>

              <!-- Source badge or copy button -->
              <span v-if="item.isSource"
                class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-100 text-violet-500 uppercase tracking-wide">
                source
              </span>
              <button v-else
                @click="copyUnit(item.unit, item.value)"
                class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-violet-600 hover:bg-violet-100 transition-all shrink-0">
                <svg v-if="copiedKey !== item.unit" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
                <svg v-else class="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

      </main>
    </div>
  </div>
</template>
