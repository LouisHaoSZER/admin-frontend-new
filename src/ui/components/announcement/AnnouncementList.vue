<script setup lang='ts'>
import type { ListItemMetaProps, PaginationProps } from 'tdesign-vue-next'
import { ref } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'

const prop = withDefaults(defineProps<props>(), {
  announcementList: () => [
    {
      id: 1,
      title: '关于举办深圳技术大学第一届程序设计竞赛的通知',
      date: '2024-09-06',
      creater: 'Admin',
    },
    {
      id: 2,
      title: '欢迎使用Web-Voyager平台',
      date: '2024-09-04',
      creater: 'Admin',
    },
    {
      id: 3,
      title: '测试',
      date: '2024-09-02',
      creater: 'Admin',
    },
  ],
})
const current = ref(1)
const pageSize = ref(5)
const onPageSizeChange: PaginationProps['onPageSizeChange'] = (size) => {
  console.log('page-size:', size)
  MessagePlugin.success(`pageSize变化为${size}`)
}
const onCurrentChange: PaginationProps['onCurrentChange'] = (index, pageInfo) => {
  MessagePlugin.success(`转到第${index}页`)
  console.log(pageInfo)
}
const onChange: PaginationProps['onChange'] = (pageInfo) => {
  console.log(pageInfo)
}
const imageUrl: ListItemMetaProps['image'] = 'https://tdesign.gtimg.com/site/avatar.jpg'
// 通知props
interface List {
  id: number
  title: string
  date: string
  creater: string
}
interface props {
  announcementList?: () => List[]
}
// 表格分页
const get = (current: number, size: number) => {

}
const go = () => {
  console.log('go')
}
</script>

<template>
  <t-list :split="true">
    <template #header>
      <div class="text-3xl font-bold">
        Announcements
      </div>
    </template>
    <t-list-item
      v-for="(item) in prop.announcementList()"
      :key="item.id"
    >
      <t-list-item-meta
        :title="item.title"
        :description="item.date"
      />
      <template #action>
        <t-link
          theme="primary"
          hover="color"
          style="margin-left: 16px"
        >
          查看详情
        </t-link>
      </template>
    </t-list-item>
    <template #footer>
      <t-pagination
        v-model="current"
        v-model:pageSize="pageSize"
        :total="100"
        @change="onChange"
        @page-size-change="onPageSizeChange"
        @current-change="onCurrentChange"
      />
    </template>
  </t-list>
</template>

<style scoped>
.table-example-footer  {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 60px;
  padding: 0 16px;
}
</style>
