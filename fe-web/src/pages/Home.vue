<template>
  <!-- Hero -->
  <section class="relative overflow-hidden bg-white border-b border-slate-200">
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#eef2ff,_transparent_60%)]"></div>
    <div class="relative max-w-5xl mx-auto px-5 py-24 flex flex-col items-center text-center gap-6">

      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-medium border border-indigo-200">
        <span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
        Free · No login · No file stored
      </span>

      <h1 class="text-5xl font-bold text-slate-900 tracking-tight leading-tight max-w-2xl">
        Convert your data,
        <span class="text-indigo-600">instantly.</span>
      </h1>

      <p class="text-lg text-slate-500 max-w-xl leading-relaxed">
        Upload an Excel file or paste your data — get a clean JSON output in seconds.
        No setup, no account, just convert.
      </p>

      <RouterLink
        to="/convert"
        class="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
      >
        Start Converting
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5-5 5M6 12h12"/>
        </svg>
      </RouterLink>
    </div>
  </section>

  <!-- Supported formats -->
  <section class="max-w-5xl mx-auto px-5 py-16">
    <h2 class="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-10">Supported Converters</h2>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">

      <div class="bg-white rounded-2xl border border-slate-200 p-6 flex items-start gap-4 shadow-sm">
        <div class="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
          <svg class="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 7h18M3 12h18M3 17h18M9 3v18"/>
          </svg>
        </div>
        <div>
          <p class="font-semibold text-slate-800 text-sm">Excel → JSON</p>
          <p class="text-xs text-slate-400 mt-1">.xlsx · .xls · .xlsm</p>
          <span class="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 font-medium">Available</span>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-slate-200 p-6 flex items-start gap-4 shadow-sm opacity-60">
        <div class="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
          <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 17v-2m3 2v-4m3 4v-6M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"/>
          </svg>
        </div>
        <div>
          <p class="font-semibold text-slate-800 text-sm">CSV → JSON</p>
          <p class="text-xs text-slate-400 mt-1">.csv</p>
          <span class="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-400 border border-slate-200 font-medium">Coming soon</span>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-slate-200 p-6 flex items-start gap-4 shadow-sm opacity-60">
        <div class="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
          <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 2v6h6"/>
          </svg>
        </div>
        <div>
          <p class="font-semibold text-slate-800 text-sm">JSON → YAML</p>
          <p class="text-xs text-slate-400 mt-1">.json · .yaml</p>
          <span class="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-400 border border-slate-200 font-medium">Coming soon</span>
        </div>
      </div>

    </div>
  </section>

  <!-- How it works -->
  <section class="bg-white border-y border-slate-200">
    <div class="max-w-5xl mx-auto px-5 py-16">
      <h2 class="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-12">How It Works</h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">

        <div class="flex flex-col items-center text-center gap-3">
          <div class="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
            <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5 5 5M12 5v12"/>
            </svg>
          </div>
          <div>
            <p class="font-semibold text-slate-800">1. Upload or Paste</p>
            <p class="text-sm text-slate-400 mt-1">Upload an Excel file or paste data manually into the input area.</p>
          </div>
        </div>

        <div class="flex flex-col items-center text-center gap-3">
          <div class="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
            <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 7h18M3 12h18M3 17h18M9 3v18"/>
            </svg>
          </div>
          <div>
            <p class="font-semibold text-slate-800">2. Preview</p>
            <p class="text-sm text-slate-400 mt-1">Your data is shown as a spreadsheet table. Set which row is the header.</p>
          </div>
        </div>

        <div class="flex flex-col items-center text-center gap-3">
          <div class="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
            <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 5v12"/>
            </svg>
          </div>
          <div>
            <p class="font-semibold text-slate-800">3. Download</p>
            <p class="text-sm text-slate-400 mt-1">Copy to clipboard or download the JSON file — done.</p>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="max-w-5xl mx-auto px-5 py-20 flex flex-col items-center text-center gap-5">
    <h2 class="text-3xl font-bold text-slate-900 tracking-tight">Ready to convert?</h2>
    <p class="text-slate-400 text-sm">No account needed. Your files never leave your browser session.</p>
    <RouterLink
      to="/convert"
      class="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
    >
      Open Converter
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5-5 5M6 12h12"/>
      </svg>
    </RouterLink>
  </section>

  <!-- Footer -->
  <footer class="border-t border-slate-200 py-6">
    <p class="text-center text-xs text-slate-400">Converter Hub — built with Laravel + Vue 3</p>
  </footer>
</template>
