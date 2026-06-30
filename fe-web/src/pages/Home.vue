<template>
  <!-- Hero -->
  <section class="relative overflow-hidden bg-white border-b border-slate-200">
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#eef2ff,transparent_60%)]"></div>
    <div class="relative max-w-5xl mx-auto px-5 py-24 flex flex-col items-center text-center gap-6">

      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-medium border border-indigo-200">
        <span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
        Free · No login · No file stored
      </span>

      <h1 class="text-5xl font-bold text-slate-900 tracking-tight leading-tight max-w-2xl">
        Convert anything,
        <span class="text-indigo-600">instantly.</span>
      </h1>

      <p class="text-lg text-slate-500 max-w-xl leading-relaxed">
        Data formats, developer tools, UI design, and AI-powered generators —
        all in one place. No setup, no account, just convert.
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

  <!-- Categories -->
  <section class="max-w-5xl mx-auto px-5 py-16">
    <h2 class="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-10">What's Inside</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">

      <!-- Data Format -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
            <svg class="w-4.5 h-4.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 7h18M3 12h18M3 17h18M9 3v18"/>
            </svg>
          </div>
          <div>
            <p class="text-sm font-bold text-slate-800">Data Format</p>
            <p class="text-xs text-slate-400">Excel, CSV, JSON, XML, YAML</p>
          </div>
        </div>
        <ul class="space-y-2.5">
          <li class="flex items-center justify-between">
            <RouterLink to="/convert" class="text-sm text-slate-700 hover:text-indigo-600 transition-colors">Excel → JSON</RouterLink>
            <span class="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 font-medium">Available</span>
          </li>
          <li class="flex items-center justify-between">
            <RouterLink to="/json-to-excel" class="text-sm text-slate-700 hover:text-indigo-600 transition-colors">JSON → Excel</RouterLink>
            <span class="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 font-medium">Available</span>
          </li>
          <li class="flex items-center justify-between">
            <span class="text-sm text-slate-400">CSV → JSON</span>
            <span class="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-400 font-medium">Soon</span>
          </li>
          <li class="flex items-center justify-between">
            <span class="text-sm text-slate-400">XML → JSON · YAML ↔ JSON</span>
            <span class="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-400 font-medium">Soon</span>
          </li>
        </ul>
      </div>

      <!-- Developer Tools -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
            <svg class="w-4.5 h-4.5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
            </svg>
          </div>
          <div>
            <p class="text-sm font-bold text-slate-800">Developer Tools</p>
            <p class="text-xs text-slate-400">Encode, decode, generate, transform</p>
          </div>
        </div>
        <ul class="space-y-2.5">
          <li class="flex items-center justify-between">
            <span class="text-sm text-slate-400">Base64 ↔ Text</span>
            <span class="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-400 font-medium">Soon</span>
          </li>
          <li class="flex items-center justify-between">
            <span class="text-sm text-slate-400">JWT Decoder</span>
            <span class="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-400 font-medium">Soon</span>
          </li>
          <li class="flex items-center justify-between">
            <span class="text-sm text-slate-400">Hash Generator — MD5, SHA256</span>
            <span class="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-400 font-medium">Soon</span>
          </li>
          <li class="flex items-center justify-between">
            <span class="text-sm text-slate-400">Cron → Human Readable</span>
            <span class="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-400 font-medium">Soon</span>
          </li>
        </ul>
      </div>

      <!-- UI / Design -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-9 h-9 rounded-xl bg-violet-50 border border-violet-200 flex items-center justify-center shrink-0">
            <svg class="w-4.5 h-4.5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4-4a3 3 0 014.24 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <div>
            <p class="text-sm font-bold text-slate-800">UI / Design</p>
            <p class="text-xs text-slate-400">Color, units, SVG</p>
          </div>
        </div>
        <ul class="space-y-2.5">
          <li class="flex items-center justify-between">
            <RouterLink to="/color" class="text-sm text-slate-700 hover:text-indigo-600 transition-colors">Color — HEX ↔ RGB ↔ HSL ↔ OKLCH</RouterLink>
            <span class="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 font-medium">Available</span>
          </li>
          <li class="flex items-center justify-between">
            <span class="text-sm text-slate-400">CSS Unit — px ↔ rem ↔ em</span>
            <span class="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-400 font-medium">Soon</span>
          </li>
          <li class="flex items-center justify-between">
            <span class="text-sm text-slate-400">SVG Optimizer</span>
            <span class="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-400 font-medium">Soon</span>
          </li>
        </ul>
      </div>

      <!-- AI Generator -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 relative overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,#eef2ff,transparent_70%)] pointer-events-none"></div>
        <div class="relative">
          <div class="flex items-center gap-3 mb-5">
            <div class="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center shrink-0">
              <svg class="w-4.5 h-4.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <p class="text-sm font-bold text-slate-800">AI Generator</p>
                <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-600 uppercase tracking-wide">Claude API</span>
              </div>
              <p class="text-xs text-slate-400">Describe or upload → get UI output</p>
            </div>
          </div>
          <ul class="space-y-2.5">
            <li class="flex items-center justify-between">
              <span class="text-sm text-slate-400">Text → HTML Wireframe</span>
              <span class="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-400 font-medium">Soon</span>
            </li>
            <li class="flex items-center justify-between">
              <span class="text-sm text-slate-400">Text → ASCII Mockup</span>
              <span class="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-400 font-medium">Soon</span>
            </li>
            <li class="flex items-center justify-between">
              <span class="text-sm text-slate-400">Image + Text → UI Revamp</span>
              <span class="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-400 font-medium">Soon</span>
            </li>
          </ul>
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
            <p class="text-sm text-slate-400 mt-1">Upload a file or paste your data directly into the input area.</p>
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
            <p class="text-sm text-slate-400 mt-1">See your data in a structured preview — auto-updated on every change.</p>
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
            <p class="text-sm text-slate-400 mt-1">Copy to clipboard or download the result file instantly.</p>
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
