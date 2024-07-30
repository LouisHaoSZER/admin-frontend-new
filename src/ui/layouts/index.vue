<script setup lang="ts">
import type { HeadMenuProps } from 'tdesign-vue-next'

// import { useThemeStore } from '../stores/theme'

const router = useRouter()

// const title = import.meta.env.VITE_APP_TITLE
// const theme = useThemeStore()

// 滑动框
const menuValue = ref('home')
const changeHandler: HeadMenuProps['onChange'] = (active) => {
  menuValue.value = active as string
}
</script>

<template>
  <t-layout>
    <t-header>
      <t-head-menu
        v-model="menuValue"
        height="120px"
        @change="changeHandler"
      >
        <template #logo>
          <img
            width="136"
            class="logo"
            src="https://bdi.sztu.edu.cn/images/index-logo2.png"
            alt="logo"
          >
        </template>
        <t-menu-item
          value="home"
          @click="router.push('/home')"
        >
          Home
        </t-menu-item>
        <t-menu-item
          value="problem"
          @click="router.push('/problem') "
        >
          Problem
        </t-menu-item>
        <t-menu-item
          value="contest"
          @click="router.push('/contest')"
        >
          Contest
        </t-menu-item>
        <t-menu-item
          value="admin"
          @click="router.push('/admin')"
        >
          Admin
        </t-menu-item>
        <t-menu-item
          value="status"
          @click="router.push('/status')"
        >
          Status
        </t-menu-item>
        <template #operations>
          <!-- <a href="javascript:;"><t-icon
            class="t-menu__operations-icon"
            name="search"
          /></a>
          <a href="javascript:;"><t-icon
            class="t-menu__operations-icon"
            name="notification-filled"
          /></a>
          <a href="javascript:;"><t-icon
            class="t-menu__operations-icon"
            name="home"
          /></a> -->
        </template>
      </t-head-menu>
    </t-header>
    <t-layout>
      <t-aside style="border-top: 1px solid var(--component-border)">
        <t-menu
          theme="light"
          value="dashboard"
          style="margin-right: 50px"
          height="550px"
        >
          <t-menu-item value="dashboard">
            <template #icon>
              <t-icon name="dashboard" />
            </template>
            功能分区
          </t-menu-item>
        </t-menu>
      </t-aside>
      <t-layout>
        <t-content>
          <div>
            <router-view />
          </div>
        </t-content>
        <t-footer>Copyright @ 2019-{{ new Date().getFullYear() }} SZTU WebClub. All Rights Reserved</t-footer>
      </t-layout>
    </t-layout>
  </t-layout>
</template>
