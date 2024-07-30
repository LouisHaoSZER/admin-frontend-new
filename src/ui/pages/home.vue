<route lang="yaml">
  meta:
    requiresAuth: 1
    transition: 'slide-right'
</route>

<script setup lang="ts">
const loading = ref(false)

onMounted(() => {
  loading.value = true

  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script>

<template>
  <div
    class="m-5 h-full"
  >
    this is page 1
  </div>
</template>

<style scoped>

</style>
