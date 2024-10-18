<script setup lang="ts">
import { useRouter } from 'vue-router'

const { menu } = defineProps<{
  menu: {
    value: string
    icon: string
    label: string
    isShow?: boolean
    children?: {
      value: string
      icon: string
      label: string
    }[]
  }
}>()

onMounted(() => {
  console.log(menu)
})

const router = useRouter()

// 点击菜单项 触发的事件
const handleClick = (item: any) => {
  console.log('click', item)
  router.push(item.path)
}
</script>

<template>
  <template v-if="menu.isShow">
    <t-menu-item
      v-if="!menu.children"
      :value="menu.value"
      @click="handleClick(menu)"
    >
      <template #icon>
        <SiderBarLogo :icon="menu.icon" />
      </template>
      {{ menu.label }}
    </t-menu-item>

    <t-submenu
      v-else
      :value="menu.value"
      :title="menu.label"
    >
      <SidebarMenuItem
        v-for="child in menu.children"
        :key="child.value"
        :menu="child"
      />
    </t-submenu>
  </template>
</template>
