<script setup lang="ts">
const modelValue = defineModel<string>()
</script>

<template>
  <div class="flex items-center gap-2">
    <div class="w-40%">
      <slot name="label">
        发布时间
      </slot>:
    </div>
    <t-date-picker
      v-model="modelValue"
    />
  </div>
</template>
