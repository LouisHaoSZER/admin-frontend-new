<script setup lang="ts">
import type { HeadMenuProps } from 'tdesign-vue-next'
import { ref } from 'vue'
import { useTheme } from '@/hooks/useTheme'

const router = useRouter()

const { theme, toggleTheme } = useTheme()

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
        class="fixed"
        @change="changeHandler"
      >
        <template #logo>
          <img
            width="136"
            class="logo"
            src="../../assets/logo.png"
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
          <a
            href="javascript:;"
            @click="toggleTheme"
          ><t-icon
            class="t-menu__operations-icon"
            :name="theme"
          /></a>
          <a href="javascript:;"><t-icon
            class="t-menu__operations-icon"
            name="notification-filled"
          /></a>
          <a href="javascript:;"><t-icon
            class="t-menu__operations-icon"
            name="setting"
          /></a>
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
            仪表盘
          </t-menu-item>
          <t-menu-item value="resource">
            <template #icon>
              <t-icon name="server" />
            </template>
            资源列表
          </t-menu-item>
          <t-menu-item value="root">
            <template #icon>
              <t-icon name="root-list" />
            </template>
            根目录
          </t-menu-item>
          <t-menu-item value="control-platform">
            <template #icon>
              <t-icon name="control-platform" />
            </template>
            调度平台
          </t-menu-item>
          <t-menu-item value="precise-monitor">
            <template #icon>
              <t-icon name="precise-monitor" />
            </template>
            调度平台
          </t-menu-item>
          <t-menu-item value="mail">
            <template #icon>
              <t-icon name="mail" />
            </template>
            消息区
          </t-menu-item>
          <t-menu-item value="user-circle">
            <template #icon>
              <t-icon name="user-circle" />
            </template>
            个人中心
          </t-menu-item>
          <t-menu-item value="play-circle">
            <template #icon>
              <t-icon name="play-circle" />
            </template>
            视频区
          </t-menu-item>
          <t-menu-item value="edit1">
            <template #icon>
              <t-icon name="edit-1" />
            </template>
            资源编辑
          </t-menu-item>
        </t-menu>
      </t-aside>
      <t-layout>
        <t-content>
          <div style="height: 100vh; overflow-y: scroll;">
            <router-view />
          </div>
        </t-content>
        <t-footer>Copyright @ 2019-{{ new Date().getFullYear() }} SZTU WebClub. All Rights Reserved</t-footer>
      </t-layout>
    </t-layout>
  </t-layout>
</template>
