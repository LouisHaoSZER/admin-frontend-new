import type { AxiosPromise } from 'axios'
import type { LoginParams, LoginResult, RefreshParams } from './type'
import { loginFactory } from './factory'
import request from '@/utils/request'

/** 鉴权部分基础 API */
const API_BASE = '/auth'

/** 鉴权部分 API 后缀 */
const API_SUFFIXES = {
  /** 登陆 */
  LOGIN: '/login/{type}',
  /** 登出 */
  LOGOUT: '/logout',
  /** 刷新Token */
  REFRESH: '/refresh',
}

/** 登陆类型 */
export enum LoginTypeEnum {
  /** 用户名密码 */
  USERNAME_PASSWORD = 'USERNAME_PASSWORD',
  /** 手机号 */
  PHONE = 'PHONE',
  /** 邮箱 */
  EMAIL = 'EMAIL',
  /** Gitee */
  GITEE = 'GITEE',
  /** Github */
  GITHUB = 'GITHUB',
}
/**
 * 定义Auth API类
 */
export class AuthApi {
  /**
   * 授权登录
   * @param {string} type 登录类型 => 可用值: USERNAME_PASSWORD, PHONE, EMAIL, GITEE, GITHUB
   * @param {object} params 统一登录表单
   * @param {string} params.username 用户名
   * @param {string} params.phoneNumber 手机号
   * @param {string} params.email 邮箱
   * @param {string} params.password 密码
   * @param {string} params.verifyCode 验证码
   * @param {string} params.verifyCodeKey 验证码标识 key
   * @param {string} params.smsCode 短信验证码
   * @param {string} params.emailCode 邮箱验证码
   * @param {object} params.oauth 第三方登录 Oauth 授权对象
   */
  static LOGIN = {
    // 当前登陆类型所对应的接口地址
    endPoint: (type: LoginTypeEnum) => {
      return `${API_BASE}${API_SUFFIXES.LOGIN.replace('{type}', type)}`
    },
    request: async (type: LoginTypeEnum, params: LoginParams): AxiosPromise<LoginResult> => {
      return request<LoginResult>({
        url: this.LOGIN.endPoint(type),
        method: 'post',
        data: loginFactory(type, params),
      })
    },
  }

  /**
   * 退出登录
   */
  static LOGOUT = {
    endPoint: `${API_BASE}${API_SUFFIXES.LOGOUT}`,
    request: async (): AxiosPromise<void> => {
      return request<void>({
        url: this.LOGOUT.endPoint,
        method: 'delete',
      })
    },
  }

  /**
   * 刷新Token
   * @param {object} params 刷新token表单
   * @param {string} refreshToken 刷新Token
   * @param {string} accessToken 访问Token
   */
  static REFRESH = {
    endPoint: `${API_BASE}${API_SUFFIXES.REFRESH}`,
    request: async (params: RefreshParams): AxiosPromise<LoginResult> => {
      return request<LoginResult>({
        url: this.REFRESH.endPoint,
        method: 'patch',
        data: params,
      })
    },
  }
}
