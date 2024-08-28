/* eslint-disable prefer-promise-reject-errors */
import type { Hooks, Input, Options } from 'ky'
import { useTokenStore } from '@/ui/stores/token'
import { ky } from '@/platform/network/ky'
import { router } from '@/ui/router'

export abstract class AbstractRepo {
  private tokenStore = useTokenStore()
  protected baseUrl: string
  protected request: ReturnType<typeof ky.extend>

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
    const hooks: Hooks = {
      beforeRequest: [
        (request) => {
          if (this.tokenStore.isLogged)
            request.headers.append('Authorization', `Bearer ${this.tokenStore.token}`)
          request.headers.append('Content-Type', 'application/json')
          request.headers.append('Accept', 'application/json')
        },
      ],
      afterResponse: [
        /** 每次响应之后 根据响应的code进行错误处理 */
        async (_request, _options, response: Record<any, any>) => {
          // 忽略HTTP状态码不为 200 的响应
          if (response.status !== 200)
            return

          // 判断 如果响应头的 Content-Type 不是 JSON 则忽略
          // eslint-disable-next-line ts/strict-boolean-expressions
          if (!response.headers.get('Content-Type')?.toLowerCase().includes('application/json'))
            return

          // 响应头的 Content-Type 是 JSON 继续进行处理
          const { code, msg } = await response.json()
          // code 不存在 或不是 number 的情况 则忽略
          if (typeof code !== 'number')
            return

          // 根据服务端返回的 code 进行不同的处理
          switch (code) {
            case 200: {
              // 200 请求成功
              // 不执行任何操作
              void Promise.resolve()
              break
            }
            case 401: {
              // 401 未登录 或者 token 过期
              // 退出登录
              this.tokenStore.removeToken()
              // 跳转到登录页面
              void router.push('/login')
              void Promise.reject()
              break
            }
            case 403: {
              // 403 无权限
              // 提示无权限
              // 跳转到无权限页面
              void router.push('/home')
              void Promise.reject()
              break
            }
            case 404: {
              // 404 未找到
              // 提示未找到
              // 跳转到未找到页面
              void router.push('/404')
              void Promise.reject()
              break
            }
            default: {
              // 其他错误
              const errMsg = (Boolean(msg)) || '请求出错'
              // 提示错误信息
              // 抛出错误 请求发送方法调用的位置可以捕获到此错误
              void Promise.reject()
              throw new Error(String(errMsg))
            }
          }
        },
      ],
    }

    // stripped out in production
    if (import.meta.env.DEV) {
      hooks.beforeRequest?.push((request, options) => {
        // eslint-disable-next-line no-console
        console.log(request.url)
        // eslint-disable-next-line no-console
        console.log(options)
        // eslint-disable-next-line no-console
        console.log(request)
      })
      hooks.afterResponse?.push(async (request, options, response) => {
        // eslint-disable-next-line no-console
        console.log(request.url)
        // eslint-disable-next-line no-console
        console.log(options)
        // eslint-disable-next-line no-console
        console.log(await response.json())
      })
    }

    this.request = ky.extend({
      prefixUrl: this.baseUrl,
      hooks,
    })
  }

  async post<T, D>(url: Input, data: D, options?: Options & { json: never }) {
    return this.request.post(url, Object.assign(options ?? {}, { json: data })).json<T>()
  }

  async get<T>(url: Input, options?: Options) {
    return this.request.get(url, options).json<T>()
  }

  async SSE(url: Input, options?: Options) {
    const controller = new AbortController()
    const { signal } = controller
    return this.request.get(url, Object.assign(options ?? {}, { signal }))
  }
}
