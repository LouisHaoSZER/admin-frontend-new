<script setup lang="ts">
import type { TableProps } from 'tdesign-vue-next'

// 提交状态列表
interface Status {
  id: number
  title: string
  status: string
  passrate: number
  time: string
  memory: string
  language: string
  codeLength: string
  SubmitTime: string
}

interface props {
  statusList: () => Status[]
}

const prop = withDefaults(defineProps<props>(), {
  statusList: () => [
    {
      id: 1,
      title: 'admin',
      status: 'Accepted',
      passrate: 100,
      time: '0ms',
      memory: '0KB',
      language: 'C++',
      codeLength: '1KB',
      SubmitTime: '2021-10-10 10:10:10',
    },
    {
      id: 2,
      title: 'admin',
      status: 'Accepted',
      passrate: 100,
      time: '0ms',
      memory: '0KB',
      language: 'C++',
      codeLength: '1KB',
      SubmitTime: '2021-10-10 10:10:10',
    },
    {
      id: 3,
      title: 'admin',
      status: 'Accepted',
      passrate: 100,
      time: '0ms',
      memory: '0KB',
      language: 'C++',
      codeLength: '1KB',
      SubmitTime: '2021-10-10 10:10:10',
    },
    {
      id: 4,
      title: 'admin',
      status: 'Accepted',
      passrate: 100,
      time: '0ms',
      memory: '0KB',
      language: 'C++',
      codeLength: '1KB',
      SubmitTime: '2021-10-10 10:10:10',
    },
    {
      id: 5,
      title: 'admin',
      status: 'Accepted',
      passrate: 100,
      time: '0ms',
      memory: '0KB',
      language: 'C++',
      codeLength: '1KB',
      SubmitTime: '2021-10-10 10:10:10',
    },
    {
      id: 6,
      title: 'admin',
      status: 'Accepted',
      passrate: 100,
      time: '0ms',
      memory: '0KB',
      language: 'C++',
      codeLength: '1KB',
      SubmitTime: '2021-10-10 10:10:10',
    },
    {
      id: 7,
      title: 'admin',
      status: 'Accepted',
      passrate: 100,
      time: '0ms',
      memory: '0KB',
      language: 'C++',
      codeLength: '1KB',
      SubmitTime: '2021-10-10 10:10:10',
    },
    {
      id: 8,
      title: 'admin',
      status: 'Accepted',
      passrate: 100,
      time: '0ms',
      memory: '0KB',
      language: 'C++',
      codeLength: '1KB',
      SubmitTime: '2021-10-10 10:10:10',
    },
    {
      id: 9,
      title: 'admin',
      status: 'Accepted',
      passrate: 100,
      time: '0ms',
      memory: '0KB',
      language: 'C++',
      codeLength: '1KB',
      SubmitTime: '2021-10-10 10:10:10',
    },
    {
      id: 10,
      title: 'admin',
      status: 'Accepted',
      passrate: 100,
      time: '0ms',
      memory: '0KB',
      language: 'C++',
      codeLength: '1KB',
      SubmitTime: '2021-10-10 10:10:10',
    },
  ],
})

const router = useRouter()

const activeRowType = ref<TableProps['activeRowType']>('single')
const hover = ref(false)
const tableData: TableProps['data'] = prop.statusList()
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
    colKey: 'status',
    title: 'status',
  },
  {
    colKey: 'passrate',
    title: 'passrate',
  },
  {
    colKey: 'time',
    title: 'time',
  },
  {
    colKey: 'memory',
    title: 'memory',
  },
  {
    colKey: 'language',
    title: 'language',
  },
  {
    colKey: 'codeLength',
    title: 'codeLength',
  },
  {
    colKey: 'SubmitTime',
    title: 'SubmitTime',
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

<style scoped>
.table-example-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 60px;
  padding: 0 16px;
}

.popup-example-block {
  padding: 24px;
  width: 380px;
}
</style>
