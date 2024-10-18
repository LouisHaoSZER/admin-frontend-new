<script setup lang="ts">

</script>

<template>
  <t-space>
    <div
      v-for="item in 4"
      :key="item"
      class="w80"
    >
      <t-button
        block
        variant="text"
      >
        <template #icon>
          <t-icon name="arrow-right" />
        </template>
        文字按钮
      </t-button>
    </div>
  </t-space>
</template>
