<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    // primary | soft | outline | dark
  },
  size: {
    type: String,
    default: 'sm',
    // sm | md
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button
    v-bind="$attrs"
    :disabled="disabled"
    :class="[
      'inline-flex items-center gap-1.5 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
      size === 'md' ? 'px-5 py-2.5 text-sm rounded-xl' : 'px-3 py-1.5 text-xs rounded-lg',
      variant === 'primary' && 'bg-indigo-600 text-white hover:bg-indigo-700',
      variant === 'soft'    && 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100',
      variant === 'outline' && 'border border-slate-200 text-slate-600 hover:bg-slate-50',
      variant === 'dark'    && 'bg-slate-900 text-white hover:bg-slate-700',
    ]"
  >
    <slot />
  </button>
</template>
