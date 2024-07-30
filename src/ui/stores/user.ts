import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const userid = ref<number | undefined>(undefined)
    const nickname = ref<string | undefined>(undefined)
    const avatar = ref<string | undefined>(undefined)

    const setUserId = (value: number) => {
      userid.value = value
    }

    const setNickname = (value: string) => {
      nickname.value = value
    }

    const setAvatar = (value: string) => {
      avatar.value = value
    }

    const removeUserId = () => {
      userid.value = undefined
    }

    const removeNickname = () => {
      nickname.value = ''
    }

    const removeAvatar = () => {
      avatar.value = ''
    }

    return {
      userid,
      setUserId,
      removeUserId,
      nickname,
      setNickname,
      removeNickname,
      avatar,
      setAvatar,
      removeAvatar,
    }
  },
  {
    persist: true,
  },
)
