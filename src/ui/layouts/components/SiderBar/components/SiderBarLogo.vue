<script setup lang="ts">
import { IconFont } from 'tdesign-icons-vue-next'
import { useThemeStore } from '@/ui/stores/modules/theme'

const props = defineProps<{
  icon: string
}>()

// TODO: 颜色需要根据主题来
const iconStyle = computed(() => {
  return {
    color: useThemeStore().isDarkMode ? '#fff' : '#000',
  }
})
</script>

<template>
  <IconFont
    :name="props.icon"
    :style="iconStyle"
  />
</template>
