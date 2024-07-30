<script setup lang="ts">
interface Props {
  penalty: string
}
const { penalty } = withDefaults(defineProps<Props>(), {
  penalty: '0',
})
const isHover = ref(false)
const time = new Date()
const penaltyTime = ref(time)
requestAnimationFrame(() => {
  setInterval(() => {
    penaltyTime.value = new Date()
  }, 0)
})
function getPenaltyTime() {
  return penaltyTime.value.toLocaleTimeString()
}
</script>

<template>
  <div class="h-25 flex items-center justify-center">
    <span
      @mouseleave="isHover = false"
      @mouseenter="isHover = true"
    >
      {{ isHover ? getPenaltyTime() : penalty }}
    </span>
  </div>
</template>

<style scoped></style>
