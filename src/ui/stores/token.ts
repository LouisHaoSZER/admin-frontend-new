import { defineStore } from 'pinia'

export const useTokenStore = defineStore(
  'token',
  () => {
    const token = ref<string>('1111')
    const role = ref<number>(3)

    const setToken = (value: string) => {
      token.value = value
    }

    const removeToken = () => {
      token.value = ''
    }

    const setRole = (value: number) => {
      role.value = value
    }

    const removeRole = () => {
      role.value = 0
    }

    const isLogged = computed(() => token.value !== '')

    return {
      token,
      setToken,
      isLogged,
      removeToken,
      role,
      setRole,
      removeRole,
    }
  },
  {
    persist: true,
  },
)
