<script setup lang='ts'>
const router = useRouter()
</script>

<template>
  <t-card
    :elevation="2"
    class="flex-1/5 pt-2"
  >
    <t-button
      block
      theme="primary"
      @click="router.push('/status')"
    >
      Submissions
    </t-button>
    <div
      class="p-3"
    >
      <t-space
        class="w-full text-center"
      >
        <t-tag
          class="h-full w-full"
        >
          <template #icon>
            <t-icon name="discount" />
          </template>
          Introduction
        </t-tag>
      </t-space>
      <t-list :split="true">
        <t-list-item>
          <t-list-item-meta
            title="题目ID"
            description="1"
          />
        </t-list-item>
        <t-list-item>
          <t-list-item-meta
            title="Time Limit"
            description="1200MS"
          />
        </t-list-item>
        <t-list-item>
          <t-list-item-meta
            title="Memory Limit"
            description="32MB"
          />
          ``
        </t-list-item>
        <t-list-item>
          <t-list-item-meta
            title="IO Mode"
            description="Standard IO"
          />
        </t-list-item>
        <t-list-item>
          <t-list-item-meta
            title="Create By"
            description="Root"
          />
        </t-list-item>
        <t-list-item>
          <t-list-item-meta
            title="Level"
            description="Mid"
          />
        </t-list-item>
        <t-list-item>
          <t-list-item-meta
            title="Source"
            description="100"
          />
        </t-list-item>
        <t-list-item>
          <t-list-item-meta
            title="Tag"
            description="basic"
          />
        </t-list-item>
      </t-list>
    </div>
  </t-card>
</template>

<style>

</style>
