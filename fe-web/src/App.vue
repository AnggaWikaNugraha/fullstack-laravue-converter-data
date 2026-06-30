<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const isMenuOpen = ref(false)
const route = useRoute()

watch(() => route.path, () => {
  isMenuOpen.value = false
})
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Navbar -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-20">
      <div class="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">

        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2.5">
          <div class="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
            <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 7h18M3 12h18M3 17h18M9 3v18" />
            </svg>
          </div>
          <span class="font-semibold text-slate-900 tracking-tight">Converter Hub</span>
        </RouterLink>

        <!-- Desktop nav -->
        <nav class="hidden lg:flex items-center gap-1">
          <RouterLink
            to="/"
            class="text-sm px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            active-class="text-slate-900 bg-slate-100"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/convert"
            class="text-sm px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            active-class="text-slate-900 bg-slate-100"
          >
            Excel → JSON
          </RouterLink>
          <RouterLink
            to="/json-to-excel"
            class="text-sm px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            active-class="text-slate-900 bg-slate-100"
          >
            JSON → Excel
          </RouterLink>
          <RouterLink
            to="/color"
            class="text-sm px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            active-class="text-slate-900 bg-slate-100"
          >
            Color
          </RouterLink>
        </nav>

        <!-- Hamburger button (mobile only) -->
        <button
          class="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          @click="isMenuOpen = !isMenuOpen"
          aria-label="Toggle menu"
        >
          <svg v-if="!isMenuOpen" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Mobile drawer -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <nav v-if="isMenuOpen" class="lg:hidden border-t border-slate-100 px-4 py-3 space-y-1">
          <RouterLink
            to="/"
            class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            active-class="text-slate-900 bg-slate-100 font-medium"
          >
            <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            Home
          </RouterLink>
          <RouterLink
            to="/convert"
            class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            active-class="text-slate-900 bg-slate-100 font-medium"
          >
            <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 7h18M3 12h18M3 17h18M9 3v18"/>
            </svg>
            Excel → JSON
          </RouterLink>
          <RouterLink
            to="/json-to-excel"
            class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            active-class="text-slate-900 bg-slate-100 font-medium"
          >
            <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            JSON → Excel
          </RouterLink>
          <RouterLink
            to="/color"
            class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            active-class="text-slate-900 bg-slate-100 font-medium"
          >
            <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
            </svg>
            Color
          </RouterLink>
        </nav>
      </Transition>
    </header>

    <!-- Backdrop -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMenuOpen"
        class="lg:hidden fixed inset-0 top-14 bg-black/20 z-10"
        @click="isMenuOpen = false"
      />
    </Transition>

    <!-- Page content -->
    <RouterView />
  </div>
</template>
