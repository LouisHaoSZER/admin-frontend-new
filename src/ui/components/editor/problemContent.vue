<script setup lang='ts'>
import { MessagePlugin } from 'tdesign-vue-next'

interface porblemdetail {
  problemId: number
  title: string
  contestid?: number
  require: string
  description: string
  // 可能有多个样例
  samples: {
    id: number
    input: string
    output: string
  }[]
  hint?: string
  source: string
}

const props = withDefaults(defineProps<porblemdetail>(), {
  problemId: 0,
  title: 'A + B Problem',
  require: '输入两个整数 a 和 b，输出 a + b 的和。',
  description: '注意不要有不必要的输出，比如 请输入 a 和 b 的值: 示例代码见隐藏部分。',
  samples: () => [
    {
      id: 1,
      input: '1 1',
      output: '2',
    },
    {
      id: 2,
      input: '2 2',
      output: '4',
    },
  ],
  source: '经典题目',
})
</script>

<template>
  <t-space
    direction="vertical"
    size="large"
    class="w-full"
  >
    <t-card
      :title="props.title"
      header-bordered
      class="w-full"
    >
      {{ props.require }}
    </t-card>
    <t-card
      title="description"
      class="w-full"
    >
      {{ props.description }}
    </t-card>
    <t-card
      v-for="sample in props.samples"
      :key="sample.id"
      :title="`Sample ${sample.id}`"
      class="w-full"
    >
      Input: {{ sample.input }}
      <br>
      Output: {{ sample.output }}
    </t-card>
    <t-card
      v-if="props.hint"
      title="hint"
      class="w-full"
    >
      {{ props.hint }}
    </t-card>
    <t-card
      title="source"
      class="w-full"
    >
      {{ props.source }}
    </t-card>
  </t-space>
</template>

<style>

</style>
