<script setup>
import { ref } from 'vue'
import { useColorConverter } from '../composables/useColorConverter'
import { EXAMPLE_COLORS } from '../utils/color'
import AppButton from '../components/AppButton.vue'

const { input, parsed, format, conversions, hasData, steps, reset } = useColorConverter()

const pickerRef = ref(null)
const copiedKey = ref(null)

async function copyFormat(key, value) {
  await navigator.clipboard.writeText(value)
  copiedKey.value = key
  setTimeout(() => { copiedKey.value = null }, 1500)
}

function onPickerChange(e) {
  input.value = e.target.value
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
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">Color Converter</p>

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
                <h2 class="text-sm font-bold text-slate-900">Color Input</h2>
              </div>
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="text-xs text-slate-400 mr-1">Examples:</span>
                <button
                  v-for="ex in EXAMPLE_COLORS"
                  :key="ex.value"
                  @click="input = ex.value"
                  class="text-xs px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors font-medium"
                >
                  {{ ex.label }}
                </button>
              </div>
            </div>
          </div>

          <div class="px-5 py-4">
            <div class="flex items-center gap-3">
              <!-- Hidden native color picker -->
              <input
                ref="pickerRef"
                type="color"
                class="sr-only"
                :value="conversions?.hex ?? '#6366f1'"
                @input="onPickerChange"
              />
              <!-- Color swatch trigger -->
              <button
                @click="pickerRef.click()"
                :style="{ background: conversions?.hex ?? '#e2e8f0' }"
                class="w-11 h-11 rounded-xl border-2 border-slate-200 shrink-0 transition-all hover:scale-105 hover:shadow-md"
                title="Open color picker"
              />
              <!-- Text input -->
              <input
                v-model="input"
                type="text"
                placeholder="#6366f1  or  rgb(99,102,241)  or  oklch(59% 0.2 277)"
                class="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 font-mono outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 placeholder-slate-300 transition-all"
                spellcheck="false"
              />
            </div>
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
              <span class="font-semibold">{{ format }}</span> detected
            </p>
            <p v-else class="text-xs text-slate-400">Supports HEX, RGB, HSL, OKLCH, and CSS color names</p>
            <span class="text-xs text-slate-400 flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Auto-converts on change
            </span>
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
          <div v-if="!hasData" class="flex flex-col items-center justify-center h-48 gap-3">
            <div class="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
              <svg class="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
              </svg>
            </div>
            <p class="text-sm text-slate-400">Enter a color above to see all conversions</p>
          </div>

          <!-- Results -->
          <div v-else class="p-5 space-y-4">

            <!-- Color swatch -->
            <div class="relative rounded-2xl overflow-hidden h-28 shadow-inner"
              :style="{ background: conversions.hex }">
              <div class="absolute inset-0 bg-linear-to-b from-black/5 to-black/10 rounded-2xl"></div>
              <div class="absolute bottom-3 left-4">
                <span class="text-xs font-bold text-white/80 drop-shadow">{{ conversions.hex?.toUpperCase() }}</span>
              </div>
              <div v-if="conversions.outOfGamut" class="absolute top-3 right-3">
                <span class="text-[10px] font-bold px-2 py-1 rounded-full bg-amber-400/90 text-amber-900">Out of sRGB gamut — clamped</span>
              </div>
            </div>

            <!-- Format cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">

              <!-- HEX -->
              <div class="rounded-xl border border-slate-200 p-4 flex items-center justify-between gap-3 group hover:border-violet-200 hover:bg-violet-50/30 transition-all">
                <div class="min-w-0">
                  <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">HEX</p>
                  <p class="text-sm font-mono font-medium text-slate-800 truncate">{{ conversions.hex }}</p>
                </div>
                <button @click="copyFormat('hex', conversions.hex)"
                  class="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-violet-600 hover:bg-violet-100 transition-all">
                  <svg v-if="copiedKey !== 'hex'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                  <svg v-else class="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </button>
              </div>

              <!-- RGB -->
              <div class="rounded-xl border border-slate-200 p-4 flex items-center justify-between gap-3 group hover:border-violet-200 hover:bg-violet-50/30 transition-all">
                <div class="min-w-0">
                  <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">RGB</p>
                  <p class="text-sm font-mono font-medium text-slate-800 truncate">{{ conversions.rgb }}</p>
                </div>
                <button @click="copyFormat('rgb', conversions.rgb)"
                  class="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-violet-600 hover:bg-violet-100 transition-all">
                  <svg v-if="copiedKey !== 'rgb'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                  <svg v-else class="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </button>
              </div>

              <!-- HSL -->
              <div class="rounded-xl border border-slate-200 p-4 flex items-center justify-between gap-3 group hover:border-violet-200 hover:bg-violet-50/30 transition-all">
                <div class="min-w-0">
                  <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">HSL</p>
                  <p class="text-sm font-mono font-medium text-slate-800 truncate">{{ conversions.hsl }}</p>
                </div>
                <button @click="copyFormat('hsl', conversions.hsl)"
                  class="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-violet-600 hover:bg-violet-100 transition-all">
                  <svg v-if="copiedKey !== 'hsl'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                  <svg v-else class="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </button>
              </div>

              <!-- OKLCH -->
              <div class="rounded-xl border border-slate-200 p-4 flex items-center justify-between gap-3 group hover:border-violet-200 hover:bg-violet-50/30 transition-all">
                <div class="min-w-0">
                  <div class="flex items-center gap-1.5 mb-1">
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">OKLCH</p>
                    <span v-if="conversions.outOfGamut" class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-600">Wide gamut</span>
                  </div>
                  <p class="text-sm font-mono font-medium text-slate-800 truncate">{{ conversions.oklch }}</p>
                </div>
                <button @click="copyFormat('oklch', conversions.oklch)"
                  class="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-violet-600 hover:bg-violet-100 transition-all">
                  <svg v-if="copiedKey !== 'oklch'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                  <svg v-else class="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </button>
              </div>

            </div>
          </div>
        </div>

      </main>
    </div>
  </div>
</template>
