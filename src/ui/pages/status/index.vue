<script setup lang='ts'>
// @ts-expect-error waitting to add ts supprot
// TODO: 完善UI组件TS类型支持
// TODO: 用DDD架构重构admin-web项目结构
import { YButton } from '@repo/ui'

async function handleLoading() {
  console.log('开始加载')
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('加载完毕')
      resolve(1)
    }, 2000)
  })
}
</script>

<template>
  <div
    class="m-5 h-full"
  >
    <YButton @click="handleLoading">
      <template #label>
        click me
      </template>
    </YButton>
  </div>
</template>

<style>

</style>
