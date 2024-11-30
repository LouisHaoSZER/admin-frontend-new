<script setup lang='ts'>
import { useResettableRef } from '@/hooks/useResettableRef'

// const value = ref({
//   a: 1,
//   b: 2,
//   c: [1, 2, 3],
// })
const { state, reset } = useResettableRef({
  a: 1,
  b: 2,
  c: [1, 2, 3],
})

const handlePlusA = () => {
  state.value.a++
}
const handlePlusB = () => {
  state.value.b++
}
const handlePlusC = () => {
  state.value.c.push(4)
}
</script>

<template>
  <div
    class="m-5 h-full"
  >
    this is page 3
    <div>
      {{ state.a }}
    </div>
    <div>
      {{ state.b }}
    </div>
    <div>
      {{ state.c }}
    </div>
    <t-button
      @click="handlePlusA"
    >
      a++
    </t-button>
    <t-button
      @click="handlePlusB"
    >
      b++
    </t-button>
    <t-button
      @click="handlePlusC"
    >
      c++
    </t-button>
    <t-button
      @click="reset()"
    >
      重置
    </t-button>
  </div>
</template>

<style>

</style>
