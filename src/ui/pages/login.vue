<route lang="yaml">
  meta:
    layout: none
  </route>

<script setup lang="ts">
import { UserAuth } from '@/domain/user/UserAuth'

const router = useRouter()

const form = ref(null)
const disabled = ref(false)
const readonly = ref(false)

const formData = reactive({
  username: '',
  password: '',
},
)

const login = () => {
  // 测试用 上线前删除
  router.push('/home')
  const { username, password } = formData
  const user = new UserAuth(username, password)
  user.login(username, password).then(() => {
    router.push('/home')
  })
}

// 注册层级
const center = ref(false)

const formRegisterData = reactive({
  username: '',
  password: '',
})
const registerForm = ref(null)
const registerDisabled = ref(false)
const registerReadonly = ref(false)
const show = ref(false)

const register = () => {
  const { username, password } = formRegisterData
  const user = new UserAuth(username, password)
  setTimeout(() => {
    show.value = true
    center.value = false
    formRegisterData.username = ''
    formRegisterData.password = ''
  }, 1000)

  user.register(username, password).then(() => {
    show.value = true
    center.value = false
  })
}
</script>

<template>
  <var-snackbar
    v-model:show="show"
    :forbid-click="false"
  >
    Resigter Success!!!
  </var-snackbar>
  <var-paper
    :elevation="2"
    ripple
    class="h-100vh w-100% flex items-center justify-center"
  >
    <div
      class="login w-100 rounded-5 p-15"
    >
      <div class="text-center">
        <h2>
          Welcome to
          <span class="text-cyan-300">W</span>
          <span class="text-purple-500">e</span>
          <span class="text-orange-600">b</span>
          Club
        </h2>
      </div>
      <div class="flex flex-col justify-around">
        <var-form
          ref="form"
          :disabled="disabled"
          :readonly="readonly"
          scroll-to-error="start"
        >
          <var-space
            direction="column"
            :size="[14, 0]"
          >
            <var-input
              v-model="formData.username"
              placeholder="请输入用户名"
              :rules="[v => !!v || '用户名不能为空']"
            />
            <var-input
              v-model="formData.password"
              type="password"
              placeholder="请输入密码"
              :rules="[v => !!v || '密码不能为空']"
            />
          </var-space>
        </var-form>
        <var-space
          direction="column"
          :size="[14, 0]"
        >
          <var-button
            block
            type="primary"
            class="m-t-10"
            @click="login"
          >
            Login
          </var-button>
          <var-space
            direction="row"
            :size="[0, 10]"
            justify="space-between"
          >
            <var-link
              type="warning"
              @click="router.push('/404')"
            >
              Forget Password
            </var-link>

            <var-link
              type="success"
              @click="center = true"
            >
              No Account
            </var-link>
          </var-space>
        </var-space>
      </div>
    </div>
  </var-paper>
  <var-popup v-model:show="center">
    <div class="register h-35vh w-40vh rounded p-5">
      <var-space
        direction="column"
        size="large"
      >
        <div class="text-center text-orange-400">
          <h2>
            Resigter
          </h2>
        </div>
        <var-form
          ref="registerForm"
          :disabled="registerDisabled"
          :readonly="registerReadonly"
          scroll-to-error="start"
        >
          <var-space
            direction="column"
            :size="[14, 0]"
          >
            <var-input
              v-model="formRegisterData.username"
              placeholder="请输入用户名"
              :rules="[v => !!v || '用户名不能为空']"
            />
            <var-input
              v-model="formRegisterData.password"
              type="password"
              placeholder="请输入密码"
              :rules="[v => !!v || '密码不能为空']"
            />
          </var-space>
        </var-form>
        <var-button
          block
          type="primary"
          class="mt-5"
          @click="register"
        >
          Submit
        </var-button>
      </var-space>
    </div>
  </var-popup>
</template>

<style scoped>
.login {
  border: 0.5px solid #e8e8e8;
  background-color: #4c4157;
}
.register {
  border: 0.25px solid #e8e8e8;
  background-color: #6f2577;
  opacity: 0.7;
  }
</style>
