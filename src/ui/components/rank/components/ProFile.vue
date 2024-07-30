<script setup lang="ts">
interface Props {
  name: string
  studentId: string
  className: string
}
const { name, studentId, className } = withDefaults(defineProps<Props>(), {
  name: '小黑',
  studentId: '202200202000',
  className: '22计算机0班',
})
</script>

<template>
  <div class="m-2 h-25 flex flex-col justify-center gap-2 text-4 font-500">
    <span>
      <t-link
        theme="primary"
        size="large"
      > {{ studentId }} </t-link>
    </span>
    <span class="text-orange"> {{ className }} </span>
    <span> {{ name }} </span>
  </div>
</template>

<style scoped></style>
