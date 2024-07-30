export interface BaseResp<T> {
  code: number
  msg: string
  data: T
}

export interface PageInfo<T> {
  total: number
  start: number
  size: number
  hasPrev: boolean
  hasNext: boolean
  list: T[]
}
