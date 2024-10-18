<script setup lang="ts">
const { menu } = withDefaults(defineProps<
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
>(), {
  menu: () => [
    {
      value: 'dashboard',
      icon: 'dashboard',
      label: '仪表盘',
      isShow: true,
      path: '/dashboard',
    },
    {
      value: 'resource',
      icon: 'server',
      label: '资源列表',
      isShow: true,
      path: '/resource',
    },
    {
      value: 'root',
      icon: 'root-list',
      label: '根目录',
      isShow: true,
      path: '/root',
    },
    {
      value: 'problemList',
      icon: 'code',
      label: '问题列表',
      isShow: true,
      path: '/problemList',
      children: [
        {
          value: 'problemList1',
          icon: 'code',
          label: '问题列表1',
          path: '/problemList1',
          isShow: true,
        },
        {
          value: 'problemList2',
          icon: 'code',
          label: '问题列表2',
          isShow: true,
          path: '/problemList2',
        },
        {
          value: 'problemList3',
          icon: 'code',
          label: '问题列表3',
          isShow: true,
          path: '/problemList3',
        },
      ],
    },
  ],
})
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
