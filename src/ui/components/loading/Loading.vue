<route lang="yaml">
  meta:
    layout: none
  </route>

<script setup lang="ts">

</script>

<template>
  <div class="loading">
    <var-space
      direction="column"
      :size="[12, 12]"
    >
      <var-loading
        type="rect"
        size="large"
      />
    </var-space>
  </div>
</template>

  <style scoped>
  .loading{
    z-index:99999;
    width: 100%;
    height: 100vh;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 0;
    top:0;
    opacity: 0.7;
  }
  </style>
