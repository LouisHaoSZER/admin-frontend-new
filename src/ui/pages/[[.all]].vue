<route lang="yaml">
  meta:
    layout: none
  </route>

<script setup lang="ts">
const router = useRouter()

const data = ref({
  intervalId: Number.NaN,
  countdown: 10,
})

onBeforeRouteLeave(() => {
  if (!Number.isNaN(data.value.intervalId))
    clearInterval(data.value.intervalId)
})

onMounted(() => {
  data.value.intervalId = setInterval(() => {
    data.value.countdown--
    if (data.value.countdown === 0) {
      if (!Number.isNaN(data.value.intervalId))
        clearInterval(data.value.intervalId)
      goBack()
    }
  }, 1000)
})

function goBack() {
  router.push('/home')
}
</script>

<template>
  <t-card
    class="notfound"
    title="404 资源不存在"
    description="生活总归带点荒谬"
  >
    <template #footer>
      <t-button
        theme="default"
        @click.prevent="goBack"
      >
        {{ data.countdown }} 秒后，返回首页
      </t-button>
    </template>
  </t-card>
</template>

  <style scoped>
  .notfound{
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-radius: 0;
    background-color: aqua
  }
  </style>
