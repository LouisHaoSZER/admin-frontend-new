<route lang="yaml">
  meta:
    requiresAuth: 1
    transition: 'slide-right'
</route>

<script setup lang="ts">
import type { SpaceProps } from 'tdesign-vue-next'
import { MessagePlugin } from 'tdesign-vue-next'

const size = ref<SpaceProps['size']>(20)
function greeting() {
  const hour = new Date().getHours()
  if (hour >= 23 || hour < 6) {
    return '凌晨了，早点休息哦～'
  }
  else if (hour >= 6 && hour < 12) {
    return '早上好，新的一天开始了～'
  }
  else if (hour >= 12 && hour < 18) {
    return '下午好，努力搬砖哦～'
  }
  else {
    return '晚上好，适当放松，保持好心情～'
  }
}

const author = ref(`LouisHao ${greeting()}`)
const content = ref('欢迎来到深圳市，今天是2024年5月10日（星期五），气温范围为20℃-25℃。白天东北风1-2级，夜间东北风1-2级。当前空气质量：优（AQI：20），适合出门游玩。温馨提示：现在的温度比较凉爽，可以适当开窗通风，保持室内空气流通。')
const cover = ref('/src/assets/images/selfimg.jpg')
const datetime = ref('今天16:38')

// TODO处理点赞： 1. 点赞数+1 2. 点赞后无法再次点赞
const hadThumbs = ref(false)
const thumbs = ref(6)
function handleThumbs() {
  if (hadThumbs.value) {
    MessagePlugin.warning('你已经点过赞了,请明天再来～')
    return
  }
  thumbs.value++
  hadThumbs.value = true
  MessagePlugin.success(`点赞成功，当前点赞数：${thumbs.value}`)
}
onMounted(() => {
  setInterval(() => {
    datetime.value = new Date().toLocaleTimeString()
  }, 1000)
})

// loadingButton使用模版
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
    class="m-5 h-100vh"
  >
    <t-space
      direction="vertical"
      :size="size"
    >
      <t-card>
        <t-comment
          :avatar="cover"
          :author="author"
          :datetime="datetime"
          :content="content"
        >
          <template #actions>
            <t-space
              key="thumbUp"
              :size="6"
              @click="handleThumbs"
            >
              <t-icon name="thumb-up" />
              <span>{{ thumbs }}</span>
            </t-space>
          </template>
        </t-comment>
      </t-card>
      <!-- Button使用模版 -->
      <t-card>
        <t-space
          direction="vertical"
        >
          <t-tag
            variant="light-outline"
            theme="primary"
          >
            Button 封装模版实例
          </t-tag>
          <LoadingButton
            @click="handleLoading"
          >
            加载按钮
          </LoadingButton>
        </t-space>
      </t-card>
    </t-space>
  </div>
</template>

<style scoped>

</style>
