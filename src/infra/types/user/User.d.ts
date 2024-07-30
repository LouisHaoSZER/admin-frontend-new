import type { BaseResp, PageInfo } from '../BaseResp'

namespace User {
  namespace Auth {
    namespace GetChiperKey {
      export interface Request {
      }
      export type Response = BaseResp<{
        key: string
        salt: string
      }>
    }
    namespace Login {
      export interface Request {
        username: string
        password: string | false
        uuid: string | undefined
        timestamp: number | undefined
      }

      // server set cookie so no response body
      export type Response = BaseResp<{ token: string }>
    }
    namespace Logout {
      export interface Request {
      }
      export type Response = never
    }

    namespace Register {
      export interface Request {
        username: string
        password: string
      }
      export type Response = BaseResp<{
        username: string
      }>
    }
  }
  namespace Info {
    namespace GetUserInfo {
      export interface Request {
        id: number
      }
      export type Response = BaseResp<{
        username: string
        password: string
        gender: number
        studentid: string
        email: string
        phone: string
        college: string
        role: string
      }>
    }
    namespace GetUserListInfo {
      export interface Request {
        start: number
        size: number
      }

      export type Response = BaseResp<PageInfo<{
        username: string
        password: string
        gender: number
        studentid: string
        email: string
        phone: string
        college: string
        role: string
      }>>
    }
  }
}
