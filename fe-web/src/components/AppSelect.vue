<script setup>
defineProps({
  modelValue: { default: '' },
  disabled: { type: Boolean, default: false },
})
defineEmits(['update:modelValue'])
</script>

<template>
  <select
    :value="modelValue"
    :disabled="disabled"
    @change="$emit('update:modelValue', $event.target.value)"
    class="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed"
  >
    <slot />
  </select>
</template>
