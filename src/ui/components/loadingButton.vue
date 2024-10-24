<script setup lang="ts">
import type { TdButtonProps } from 'tdesign-vue-next'
import { ref, useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false,
})

// 如果已经被props拿走的属性，就不会被attrs拿到
const props = defineProps<Partial<Omit<TdButtonProps, 'loading' | 'onClick' | 'icon'>> & { icon?: string }>()
const loading = ref(false)
const attrs = useAttrs()
async function handleClick() {
  loading.value = true
  // console.log('loading:', loading.value)
  // console.log('attrs:', attrs?.onClick)
  try {
    // @ts-expect-error attrs.onClick是函数
    await attrs.onClick?.()
  }
  finally {
    loading.value = false
    // console.log('loading:', loading.value)
  }
}
</script>

<template>
  <div>
    <TButton
      :loading="loading"
      v-bind="{ ...props, ...attrs }"
      :icon="props.icon as any"
      @click="handleClick"
    >
      <template #icon>
        <t-icon
          v-if="props.icon"
          :name="props.icon as unknown as string"
        />
      </template>
      <slot name="label" />
    </TButton>
  </div>
</template>
