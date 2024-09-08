import { StoreTypeEnum } from '../type'
import type { LoginResult } from '@/platform/api/auth/type'

/**
 * 用户基本信息
 */
export interface UserBaseInfo {
  /** 用户id */
  userId?: string
  /** 用户名 */
  username?: string
  /** 用户昵称 */
  nickname?: string
  /** 手机号 */
  phoneNumber?: string
  /** 邮箱 */
  email?: string
  /** 头像地址 */
  avatar?: string
}

export const useUserStore = defineStore(StoreTypeEnum.USER, {
  state: (): {
    userInfo: UserBaseInfo
    authInfo: LoginResult
    roles: string[]
    permissions: []
  } => {
    return {
      // 用户个人信息
      userInfo: {
        userId: '1',
        username: 'admin',
        nickname: '管理员',
        phoneNumber: '18888888888',
        email: '1477285752@qq.com',
      },
      // 用户认证信息
      authInfo: {
        accessToken: 'asdsadasddcewcafgfceafdsafacewafdsfcaefdascaefafhggfhjyjyutdgb',
        refreshToken: 'asdsadasddcewcafgfceafdsafacewafdsfcaefdascaefafhggfhjyjyutdgb',
      },
      // 用户角色信息
      roles: ['admin'],
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
