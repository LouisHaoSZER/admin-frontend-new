<script setup lang="ts">

</script>

<template>
  <arctile class="my-4 flex items-center justify-center gap-4">
    <var-image
      width="6rem"
      height="6rem"
      fit="cover"
      :radius="10"
      ripple
      src="https://varlet.gitee.io/varlet-ui/cat.jpg"
    />
    <div class="flex flex-col">
      <h2 class="link">
        <span class="max-w-80 truncate text-5">
          第一届深圳技术大学程序设计竞赛
        </span>
      </h2>
      <p class="text-3.5 text-gray-600">
        <var-icon
          name="calendar-month"
          color="blue"
        />
        <span>
          2021年12月12日
        </span>
      </p>
    </div>
    <var-button
      type="primary"
      class="ml-auto mr-25"
    >
      <var-icon name="radio-marked" />
      <span class="ml-1">已截止</span>
    </var-button>
  </arctile>
</template>

<style>
.link {
  cursor: pointer;
}

.link:hover {
  text-decoration: underline;
  text-decoration-color: var(--color-primary);
  color: var(--color-primary);
}
</style>
