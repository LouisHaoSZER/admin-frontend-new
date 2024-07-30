<script setup lang="ts">
interface Props {
  title: string
}
const { title } = withDefaults(defineProps<Props>(), {
  title: 'Name',
})
</script>

<template>
  <div class="text-center text-4 text-black font-600">
    {{ title }}
  </div>
</template>

<style scoped></style>
