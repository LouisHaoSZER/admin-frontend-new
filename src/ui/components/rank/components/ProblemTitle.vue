<script setup lang="ts">
interface Props {
  title: string
}
const { title } = withDefaults(defineProps<Props>(), {
  title: 'A',
})
</script>

<template>
  <div class="w-full cursor-pointer text-center text-4 text-blue font-600">
    {{ title }}
  </div>
</template>

<style scoped></style>
