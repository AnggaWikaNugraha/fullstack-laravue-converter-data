<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Navbar -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-20">
      <div class="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
        <RouterLink to="/" class="flex items-center gap-2.5">
          <div class="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
            <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 7h18M3 12h18M3 17h18M9 3v18" />
            </svg>
          </div>
          <span class="font-semibold text-slate-900 tracking-tight">Converter Hub</span>
        </RouterLink>

        <nav class="flex items-center gap-1">
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
        </nav>
      </div>
    </header>

    <!-- Page content -->
    <RouterView />
  </div>
</template>
