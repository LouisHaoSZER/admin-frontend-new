import type { BaseResp, PageInfo } from '../BaseResp'

namespace Problem {
  namespace Submit {
    export interface Request {
      code: string
      lang: string
      contestid: number
    }

    export type Response = BaseResp<null>
  }

  namespace Info {
    export namespace GetProblemList {
      export interface Request {
        start: number
        size: number
      }

      export interface Serach {
        problemId: number | undefined
        level: string | undefined
        keyword: string | undefined
      }

      export type Response = BaseResp<PageInfo<{
        id: number
        title: string
        level: string
        total: number
        rate: number
      }>>
    }
    export namespace GetProblemInfo {
      export interface Request {
        id: number
      }

      export type Response = BaseResp<{
        problemId: number
        title: string
        contestid?: number
        require: string
        description: string
        // 可能有多个样例
        samples: {
          id: number
          input: string
          output: string
        }[]
        hint?: string
        source: string
      }>
    }
  }

  namespace Status {
    export interface Request {
      problemId: number | undefined
      level: string | undefined
      keyword: string | undefined
    }

    export type Response = BaseResp<PageInfo<{
      id: number
      title: string
      passrate: number
      time: number
      memory: number
      lang: string
      codelength: string
      submittime: string
    }>>
  }
}
