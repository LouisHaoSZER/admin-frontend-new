<script setup lang="ts">
const visible = ref(false)
const handleClick = () => {
  visible.value = true
}
defineExpose({
  handleClick,
})
</script>

<template>
  <div>
    <t-drawer
      v-model:visible="visible"
      header="header"
    >
      <p>This is a Drawer</p>
    </t-drawer>
  </div>
</template>
