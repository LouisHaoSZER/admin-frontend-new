<script setup lang="ts">
interface Props {
  status: string
  error: number
  problemId: number
}
const { status, error, problemId } = withDefaults(defineProps<Props>(), {
  status: 'ac',
  error: Math.floor(Math.random() * 10),
  problemId: 1,
})

const router = useRouter()
const penaltyTime = ref(new Date())
requestAnimationFrame(() => {
  setInterval(() => {
    penaltyTime.value = new Date()
  }, 0)
})
function getPenaltyTime() {
  return penaltyTime.value.toLocaleTimeString()
}
const statusColor: {
  [key: string]: string
} = {
  ac: 'bg-green-400',
  error: 'bg-red-400',
  first: 'bg-blue-400',
}
</script>

<template>
  <div
    class="h-25 flex flex-col items-center justify-center py-2 text-4 font-500"
    :class="statusColor[status.toLowerCase()]"
  >
    <t-link
      size="large"
      @click="router.push(`/problem/${problemId}`)"
    >
      {{ getPenaltyTime() }}
      <span v-if="error">
        {{ `(-${error})` }}
      </span>
    </t-link>
  </div>
</template>

<style scoped></style>
