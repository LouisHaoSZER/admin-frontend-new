import { AbstractRepo } from '../AbstractRepo'
import type { Problem } from '../types/problem/problem'
import type { IProblemInfoRepo } from '@/domain/problem/IProblemInfoRepo'

export class ProblemInfoRepo extends AbstractRepo implements IProblemInfoRepo {
  constructor() {
    super('problem')
  }

  //  获取题目列表
  async getProblemList(page: number, pageSize: number, conditions?: Problem.Info.GetProblemList.Serach): Promise<Problem.Info.GetProblemList.Response> {
    const queryParams = [`page=${page}`, `pageSize=${pageSize}`]
    if (conditions !== undefined) {
      if (conditions.problemId !== undefined)
        queryParams.push(`problemId=${conditions.problemId}`)
      if (conditions.level !== undefined)
        queryParams.push(`level=${conditions.level}`)
      if (conditions.keyword !== undefined)
        queryParams.push(`keyword=${conditions.keyword}`)
    }
    const queryString = queryParams.join('&')
    return await this.get<Problem.Info.GetProblemList.Response>(`list?${queryString}`)
  }

  // 获取单个题目的提交状态列表
  async getSubmitStatus(page: number, pageSize: number, conditions?: Problem.Status.Request): Promise<Problem.Status.Response> {
    const queryParams = [`page=${page}`, `pageSize=${pageSize}`]

    if (conditions !== undefined) {
      if (conditions.problemId !== undefined)
        queryParams.push(`problemId=${conditions.problemId}`)
      if (conditions.level !== undefined)
        queryParams.push(`level=${conditions.level}`)

      if (conditions.keyword !== undefined)
        queryParams.push(`keyword=${conditions.keyword}`)
    }
    const queryString = queryParams.join('&')

    return await this.get<Problem.Status.Response>(`problem/list?${queryString}`)
  }
}
