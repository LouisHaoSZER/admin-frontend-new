import type { BaseResp } from '../BaseResp'
import type { List } from '../List'

namespace AnnounceMent {
  namespace GetAnnouncement {
    export interface Request {
      page: number
      pageSize: number
    }
    export type Response = BaseResp<
      List<detail>
    >
  }
  export interface detail {
    id: number
    title: string
    date: string
    creater: string
  }
}
