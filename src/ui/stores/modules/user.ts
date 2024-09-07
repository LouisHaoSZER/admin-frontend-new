import { StoreTypeEnum } from '../type'
import type { LoginResult } from '@/platform/api/auth/type'

export const useUserStore = defineStore(StoreTypeEnum.USER, {
  state: (): {
    userInfo: any
    authInfo: LoginResult
    roles: []
    permissions: []
  } => {
    return {
      // 用户个人信息
      userInfo: {},
      // 用户认证信息
      authInfo: {},
      // 用户角色信息
      roles: [],
      // 权限信息
      permissions: [],
    }
  },
  persist: {
    paths: ['userInfo'],
  },
  getters: {},
  actions: {
    /**
     * 重制token
     */
    async resetToken(): Promise<void> {
      return new Promise<void>((resolve) => {
        this.userInfo = {}
        this.authInfo = {}
        this.roles = []
        this.permissions = []
        resolve()
      })
    },
    /**
     * 刷新token
     */
    async refreshToken(): Promise<LoginResult> {
      return new Promise<LoginResult>((resolve) => {
        resolve({})
      })
    },
  },
})
