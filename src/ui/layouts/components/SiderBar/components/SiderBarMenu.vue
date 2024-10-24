<script setup lang="ts">
const { menu } = defineProps<
  {
    menu: {
      value: string
      icon: string
      label: string
      isShow?: boolean
      path: string
      children?: {
        value: string
        icon: string
        label: string
        path: string
      }[]
    }[]
  }
>()
// 选中的siderbar菜单

const selectedMenu = ref('dashboard')
</script>

<template>
  <t-menu
    v-model="selectedMenu"
    theme="light"
    value="dashboard"
    style="margin-right: 50px"
    height="550px"
  >
    <SidebarMenuItem
      v-for="item in menu"
      :key="item.value"
      :menu="item"
    />
  </t-menu>
</template>
