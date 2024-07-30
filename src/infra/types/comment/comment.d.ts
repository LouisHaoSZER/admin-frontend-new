import type { BaseResp, PageInfo } from '../BaseResp'

namespace Comment {
  namespace Auth {

  }
  namespace Info {
    namespace GetCommentList {
      export interface Request {
        start: number
        size: number
      }

      export type Response = BaseResp<PageInfo<{
        id: number
        content: string
        time: string
        username: string
        problemId: number
        replyId: number
      }>>
    }
    namespace GetCommentInfo {
      export interface Request {
        id: number
      }

      export type Response = BaseResp<{
        id: number
        content: string
        time: string
        username: string
        problemId: number
        replyId: number
      }>
    }
  }
}
