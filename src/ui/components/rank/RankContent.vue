<script setup lang="ts">
import { CreateColumns, CreateProBlemColumns } from './columns.ts'

const initialData = []
const total = 20
const problemCount = 5
for (let i = 0; i < total; i++) {
  const index = 0
  initialData.push({
    index: i + 1,
    name: `name${i}`,
    solved: Math.floor(Math.random() * problemCount),
    penalty: Math.floor(Math.random() * 1000),
    [String.fromCharCode(65 + index)]: {
      status: 'ac',
      error: Math.floor(Math.random() * 10),
      problemId: index + 1,
    },
    [String.fromCharCode(65 + index + 1)]: {
      status: 'error',
      error: Math.floor(Math.random() * 10),
      problemId: index + 2,
    },
    [String.fromCharCode(65 + index + 2)]: {
      status: 'first',
      error: Math.floor(Math.random() * 10),
      problemId: index + 3,
    },
    [String.fromCharCode(65 + index + 3)]: {
      status: 'ac',
      error: Math.floor(Math.random() * 10),
      problemId: index + 4,
    },
    [String.fromCharCode(65 + index + 4)]: {
      status: 'error',
      error: Math.floor(Math.random() * 10),
      problemId: index + 5,
    },
    school: '22级计算机0班',
  })
}
const columns = CreateColumns(CreateProBlemColumns(problemCount))
const data = ref(initialData)
</script>

<template>
  <t-table
    row-key="index"
    :data="data"
    :columns="columns"
    :stripe="true"
    :bordered="true"
    :hover="true"
    table-layout="auto"
    :show-header="true"
    cell-empty-content="-"
  />
</template>

<style>
.t-table__body .t-tag span {
  display: inline-flex;
  align-items: center;
}
td {
  padding: 0 !important;
}
</style>
