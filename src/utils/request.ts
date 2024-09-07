import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { MessagePlugin } from 'tdesign-vue-next'
import { useUserStore } from '@/ui/stores/modules/user'
import { RequestConstant } from '@/constants/request'
import { MessageConstant } from '@/constants/message'
import type { LoginResult } from '@/platform/api/auth/type'

/**
 * 使用方式
 *
 * import request from '@/utils/request'
 *
 * export function requestSomthing(data: T):AxiosPromise<D>{
 *  return request({
 *  url: '/api/somthing',
 * data: data
 * })
 * }
 */

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const userStore = useUserStore()
    if ((userStore.authInfo.accessToken !== undefined) && userStore.authInfo.accessToken !== '') {
      config.headers.Authorization = RequestConstant.Header.AuthorizationPrefix + userStore.authInfo.accessToken
    }
    return config
  },
  async (error: any) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  async (response: AxiosResponse) => {
    const { code, data } = response.data
    if (code === RequestConstant.Code.SUCCESS) {
      return response.data
    }
    // 相应数据为二进制流处理（Excel导出）
    if (response.data instanceof ArrayBuffer || response.data instanceof Blob) {
      return response
    }
    // 未登录
    if (code === RequestConstant.Code.AUTH_TOKEN_INVALID) {
      const userStore = useUserStore()
      await userStore.resetToken()
    }
    // 否则报错
    void MessagePlugin.error({
      content: data,
      duration: MessageConstant.Duration.ERROR,
    })

    return Promise.reject(new Error(data as string || 'Error'))
  },
  async (error: any) => {
    const userStore = useUserStore()
    if (error.response?.status === 401) {
      // token过期
      if (error.response?.data?.message === RequestConstant.Code.AUTH_TOKEN_EXPIRED) {
        // 1.刷新token
        const LoginResult: LoginResult = await userStore.refreshToken()
        // 1. refreshToken未过期 重新请求
        if (LoginResult !== undefined) {
          // 2.1 重构请求头
          error.config.headers.Authorization = RequestConstant.Header.AuthorizationPrefix + LoginResult.accessToken
          // 2.2 重新请求 获得新的token
          return service.request(error.config)
        }
        else {
          // refreshToken过期
          // 1. 重新登录token,跳转到登陆页
          await userStore.resetToken()
        }
      }
      else {
        // 其他token错误
        // 1. 重新登录token,跳转到登陆页
        await userStore.resetToken()
      }
    }
    else if (error.response?.status === 403) {
      // 无权限
      // 1. 消息提示
      void MessagePlugin.warning({
        content: `无权限${error.response?.data?.message}`,
        duration: MessageConstant.Duration.WARNING,
      })
      if (error.response?.data?.message === RequestConstant.Code.AUTH_USER_ELSEWHERE_LOGIN) {
        // 在别处登陆了
        // 2. 重新登录token,跳转到登陆页
        await userStore.resetToken()
      }
    }
    else {
      // 除了401,403之外的错误 默认处理
      // 1. 消息提示
      void MessagePlugin.error({
        content: `请求错误${error.response?.data?.message}`,
        duration: MessageConstant.Duration.ERROR,
      })
    }
    return Promise.reject(error)
  },
)

// 默认导出service实例
export default service
