/* @jsxImportSource vue */
<script setup lang='ts'>
import type { TableProps } from 'tdesign-vue-next'
// 动态输入框

const inputList = ref([
  {
    label: '关键词',
    placeholder: '请输入关键词',
    value: '',
    key: 'title',
  },
  {
    label: '文章状态',
    placeholder: '请输入文章状态',
    value: '',
    key: 'status',
  },
])

// 动态时间选择器
const datePickerList = ref([
  {
    label: '搜索时间',
    value: '',
    key: 'date',
  },
])

// 动态操作按钮
const operationList = ref([
  {
    label: '新增',
    key: 'add',
    icon: 'plus',
    theme: 'primary' as const,
  },
  {
    label: '修改',
    key: 'update',
    icon: 'edit',
    theme: 'warning' as const,
  },
  {
    label: '删除',
    key: 'delete',
    icon: 'delete',
    theme: 'danger' as const,
  },

])

// 搜索请求体
const requestBody = computed(() => {
  const body: Record<string, string> = {}
  inputList.value.forEach((item) => {
    if (item.value)
      body[item.key] = item.value
  })
  datePickerList.value.forEach((item) => {
    if (item.value)
      body[item.key] = item.value
  })
  return body
})
const postList = ref()
// 搜索按钮
const handleSearch = async () => {
  // 模拟数据返回
  return new Promise((resolve) => {
    console.log('发起搜索请求', requestBody.value)
    setTimeout(() => {
      resolve([
        {
          title: '文章1',
          status: '已发布',
        },
      ])
    }, 2000)
  }).then((res) => {
    postList.value = res
    console.log('搜索请求成功', postList.value)
  }).catch((err) => {
    console.log('搜索请求失败', err)
  })
}

// 表哥部分
const statusNameListMap = {
  0: {
    label: '审批通过',
    theme: 'success' as const,
    icon: 'check-circle' as const,
  },
  1: {
    label: '审批失败',
    theme: 'danger' as const,
    icon: 'close-circle' as const,
  },
  2: {
    label: '审批过期',
    theme: 'warning' as const,
    icon: 'error-circle' as const,
  },
}
const data: TableProps['data'] = []
const total = 28
for (let i = 0; i < total; i++) {
  data.push({
    index: i + 1,
    postTitle: ['文章1', '文章2', '文章3'][i % 3],
    status: i % 3,
    postCategory: ['分类1', '分类2', '分类3'][i % 3],
    author: ['作者1', '作者2', '作者3'][i % 3],
    createTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
    ellipsisProps: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][i % 3],
    link: '点击查看详情',
  })
}
const stripe = ref(true)
const bordered = ref(true)
const hover = ref(true)
const tableLayout = ref(false)
const size = ref<TableProps['size']>('medium')
const showHeader = ref(true)
const selectOnRowClick = ref(true)
const columns = ref<TableProps['columns']>([
  {
    colKey: 'row-select',
    type: 'multiple',
    // 禁用行选中方式一：使用 disabled 禁用行（示例代码有效，勿删）。disabled 参数：{row: RowData; rowIndex: number })
    // 这种方式禁用行选中，当前行会添加行类名 t-table__row--disabled，禁用行文字变灰
    // disabled: ({ rowIndex }) => rowIndex === 1 || rowIndex === 3,

    // 禁用行选中方式二：使用 checkProps 禁用行（示例代码有效，勿删）
    // 这种方式禁用行选中，行文本不会变灰
    // checkProps: ({ rowIndex }) => ({
    //   disabled: rowIndex % 2 !== 0,
    // }),
    width: 50,
  },
  {
    colKey: 'postTitle',
    title: '文章标题',
    width: '100',
  },
  {
    colKey: 'status',
    title: '文章状态',

  },
  {
    colKey: 'postCategory',
    title: '文章分类',
  },
  {
    colKey: 'author',
    title: '文章作者',
    ellipsis: true,
  },
  {
    colKey: 'createTime',
    title: '创建时间',
  },
  {
    title: '操作',
    colKey: 'link',
    // 超出省略的内容显示纯文本，不带任何样式和元素
    ellipsis: (_h, { row }) => row.link,
    // 注意这种 JSX 写法需设置 <script lang='tsx' setup>
    // cell: (h, { row }) => (
    //   <a href="/vue-next/components/table" target="_blank">
    //     {row.link}
    //   </a>
    // ),
  },
])
const activeRow = ref(false)
const selectedRowKeys = ref<TableProps['selectedRowKeys']>([])
const rehandleSelectChange: TableProps['onSelectChange'] = (value, ctx) => {
  selectedRowKeys.value = value
  console.log(value, ctx)
}
const handleRowClick: TableProps['onRowClick'] = (e) => {
  console.log(e)
}
const pagination: TableProps['pagination'] = {
  defaultCurrent: 1,
  defaultPageSize: 10,
  total,
}
</script>

<template>
  <div
    class="m-5 h-full"
  >
    <t-space
      direction="vertical"
      size="large"
    >
      <!-- 搜索区域 -->
      <t-card>
        <t-space
          direction="vertical"
          size="large"
        >
          <div class="mx-5">
            <t-space
              direction="horizontal"
              size="large"
            >
              <PreContentInput
                v-for="(value, index) in inputList"
                :key="index"
                v-model="value.value"
                :placeholder="value.placeholder"
              >
                <template #label>
                  {{ value.label }}
                </template>
              </PreContentInput>
              <PreContentDatePicker
                v-for="(value, index) in datePickerList"
                :key="index"
                v-model="value.value"
              >
                <template #label>
                  {{ value.label }}
                </template>
              </PreContentDatePicker>
            </t-space>
          </div>

          <t-space
            direction="horizontal"
            size="large"
          >
            <!-- TODO Bug 类型错误 -->
            <LoadingButton
              icon="search"
              @click.once="handleSearch"
            >
              <template #label>
                搜索
              </template>
            </LoadingButton>
            <LoadingButton
              icon="refresh"
            >
              <template #label>
                重置
              </template>
            </LoadingButton>
          </t-space>
        </t-space>
      </t-card>

      <!-- 列表区域 -->
      <t-card
        header-bordered
      >
        <template #header>
          <t-space
            direction="horizontal"
            size="large"
          >
            <LoadingButton
              v-for="(value, index) in operationList"
              :key="index"
              :icon="value.icon"
              :theme="value.theme"
              variant="dashed"
            >
              <template #label>
                {{ value.label }}
              </template>
            </LoadingButton>
          </t-space>
        </template>
        <t-table
          row-key="index"
          :data="data"
          :columns="columns"
          :stripe="stripe"
          :bordered="bordered"
          :hover="hover"
          :table-layout="tableLayout ? 'auto' : 'fixed'"
          :size="size"
          :select-on-row-click="selectOnRowClick"
          :pagination="pagination"
          :show-header="showHeader"
          cell-empty-content="-"
          :active-row-type="activeRow ? 'single' : undefined"
          resizable
          lazy-load
          @select-change="rehandleSelectChange"
          @row-click="handleRowClick"
        >
          <template #status="{ row }">
            <t-tag
              shape="round"
              :theme="statusNameListMap[row.status as keyof typeof statusNameListMap].theme"
              variant="light-outline"
            >
              <t-icon :name="statusNameListMap[row.status as keyof typeof statusNameListMap].icon" />
              {{ statusNameListMap[row.status as keyof typeof statusNameListMap].label }}
            </t-tag>
          </template>
          <template #link="{ row }">
            <t-link
              href="/vue-next/components/table"
              target="_blank"
              theme="primary"
            >
              {{ row.link }}
            </t-link>
          </template>
        </t-table>
      </t-card>
    </t-space>
  </div>
</template>

<style>

</style>
