<script setup lang="ts">
await asyncFun()
async function asyncFun() {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(1)
      console.log('asyncCom中的异步函数执行完毕')
      // reject('error')
      // console.log('asyncCom中的异步函数执行完毕')
    }, 3000)
  })
}
</script>

<template>
  <div>
    加载成功
  </div>
</template>
