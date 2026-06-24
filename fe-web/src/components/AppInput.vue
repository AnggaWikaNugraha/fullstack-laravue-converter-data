<script setup>
defineProps({
  modelValue: { default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  min: { default: undefined },
  max: { default: undefined },
  disabled: { type: Boolean, default: false },
  center: { type: Boolean, default: false },
})
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :min="min"
    :max="max"
    :disabled="disabled"
    @input="$emit('update:modelValue', type === 'number' ? Number($event.target.value) : $event.target.value)"
    :class="[
      'text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 bg-white',
      'focus:outline-none focus:ring-2 focus:ring-indigo-500',
      'disabled:opacity-40 disabled:cursor-not-allowed',
      center && 'text-center',
    ]"
  />
</template>
