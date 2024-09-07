// 工厂模式实现

import type { LoginParams } from './type'

// TODO:更多登录类型
export type LoginTypeEnum = 'USERNAME_PASSWORD' | 'PHONE' | 'EMAIL' | 'GITEE' | 'GITHUB'

/**
 * 登录表单类
 */
export class UserNamePasswordLogin {
// @ts-expect-error 未使用
  private username: string | undefined
  // @ts-expect-error 未使用
  private password: string | undefined
  // @ts-expect-error 未使用
  private verifyCode: string | undefined
  // @ts-expect-error 未使用
  private verifyCodeKey: string | undefined

  constructor(params: LoginParams) {
    this.username = params.username
    this.password = params.password
    this.verifyCode = params.verifyCode
    this.verifyCodeKey = params.verifyCodeKey
  }
}

/**
 * 登录工厂
 * @param type 登录类型
 * @param params 登录参数
 */
// TODO:更多登录类型
// @ts-expect-error 未使用
export function loginFactory(type: LoginTypeEnum, params: LoginParams) {
  switch (type) {
    case 'USERNAME_PASSWORD':
      return new UserNamePasswordLogin(params)
    case 'PHONE':
    case 'EMAIL':
    case 'GITEE':
    case 'GITHUB':
  }
}
