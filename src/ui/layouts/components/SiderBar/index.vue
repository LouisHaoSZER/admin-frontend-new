<script setup lang="ts">
const menu = ref([
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
])
</script>

<template>
  <t-aside style="border-top: 1px solid var(--component-border)">
    <SiderBarMenu :menu="menu" />
  </t-aside>
</template>
