<script setup lang="ts">
interface Props {
  rank: string
  rankSum: number
}
const { rank, rankSum } = withDefaults(defineProps<Props>(), {
  rank: '1',
  rankSum: 20,
})
const rankRatio = computed(() => {
  return (Number.parseInt(rank) / rankSum) * 100
})

const bgStrategy = {
  a: { threshold: 10, color: 'bg-green-400' },
  b: { threshold: 25, color: 'bg-blue-400' },
  c: { threshold: 50, color: 'bg-yellow-400' },
  d: { threshold: 100, color: '' },
}

const getBg = (rankRatio: number) => {
  for (const strategy of Object.values(bgStrategy)) {
    if (rankRatio <= strategy.threshold)
      return strategy.color
  }
}
</script>

<template>
  <div
    class="h-25 w-full flex items-center justify-center py-2 text-center text-4 text-black font-500"
    :class="getBg(rankRatio)"
  >
    {{ rank }}
  </div>
</template>

<style scoped></style>
