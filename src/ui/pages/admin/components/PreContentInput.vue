<script setup lang="ts">
const { size = 'medium', placeholder = '请输入' } = defineProps<{
  size?: 'small' | 'medium' | 'large'
  placeholder?: string
}>()
// 输入框的内容
const modelValue = defineModel<string>()
watch(modelValue, () => {
  console.log('modealValue', modelValue.value)
})
</script>

<template>
  <div class="flex items-center gap-2">
    <div class="w-40%">
      <slot name="label" />:
    </div>
    <t-input
      v-model="modelValue"
      :size="size"
      :placeholder="placeholder"
    />
  </div>
</template>
