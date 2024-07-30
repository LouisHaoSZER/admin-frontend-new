<script setup lang='ts'>
import type { TableProps } from 'tdesign-vue-next'

const props = withDefaults(defineProps<prop>(), {
  problemList: () => ({
    total: 100,
    start: 0,
    size: 10,
    hasPrev: false,
    hasNext: true,
    list: [
      {
        id: 1,
        title: 'Problem 1',
        level: 'easy',
        time: '2024-4-8',
        total: 100,
        rate: 100,
        operation: true,
      },
      {
        id: 2,
        title: 'Problem 2',
        level: 'middle',
        time: '2024-4-8',
        total: 100,
        rate: 100,
        operation: true,
      },
      {
        id: 3,
        title: 'Problem 3',
        level: 'hard',
        time: '2024-4-8',
        total: 100,
        rate: 100,
        operation: true,
      },
      {
        id: 4,
        title: 'Problem 4',
        level: 'easy',
        time: '2024-4-8',
        total: 100,
        rate: 100,
        operation: true,
      },
      {
        id: 5,
        title: 'Problem 5',
        level: 'middle',
        time: '2024-4-8',
        total: 100,
        rate: 100,
        operation: true,
      },
    ],
  }),
})
interface List<T> {
  total: number
  start: number
  size: number
  hasPrev: boolean
  hasNext: boolean
  list: T[]
}
// 题目数据
interface Problem {
  id: number
  title: string
  level: string
  time: string
  total: number
  rate: number
  operation: boolean
}

interface prop {
  problemList: () => List<Problem>
}

const router = useRouter()

const activeRowType = ref<TableProps['activeRowType']>('single')
const hover = ref(false)
const tableData: TableProps['data'] = props.problemList().list
const columns: TableProps['columns'] = [
  {
    colKey: 'id',
    title: 'id',
    width: '100',
  },
  {
    colKey: 'title',
    title: 'title',
  },
  {
    colKey: 'level',
    title: 'level',
    ellipsis: true,
  },
  {
    colKey: 'time',
    title: 'time',
  },
  {
    colKey: 'rate',
    title: 'rate',
  },
  {
    colKey: 'operation',
    title: 'operation',
  },
]
const onActiveChange: TableProps['onActiveChange'] = (highlightRowKeys, ctx) => {
  console.log(highlightRowKeys, ctx)
}
watch([activeRowType], ([activeRowType]) => {
  if (!activeRowType)
    hover.value = true
})
</script>

<template>
  <div class="m-5 w-100%">
    <t-space direction="vertical">
      <slot name="header" />
      <!-- v-model:activeRowKeys 父组件控制高亮行 -->
      <!-- defaultActiveRowKeys 组件内部控制高亮行，父组件无法使用这个属性控制 -->
      <t-table
        row-key="id"
        :data="tableData"
        :columns="columns"
        :active-row-type="activeRowType"
        :hover="hover"
        lazy-load
        @active-change="onActiveChange"
      >
        <template #operation="{ row }">
          <t-link
            theme="primary"
            hover="color"
            @click="router.push(`/problem/${row.id}`)"
          >
            查看
          </t-link>
        </template>
      </t-table>
      <slot name="pagenation" />
    </t-space>
  </div>
</template>

<style scoped></style>
