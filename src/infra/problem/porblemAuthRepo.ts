import { AbstractRepo } from '../AbstractRepo'
import type { Problem } from '../types/problem/problem'
import type { IProblemAuthRepo } from '@/domain/problem/IProblemAuthRepo'

export class ProblemAuthRepo extends AbstractRepo implements IProblemAuthRepo {
  constructor() {
    super('problem')
  }

  // 获取单个题目信息
  async getProblemInfo(problemId: number): Promise<Problem.Info.GetProblemInfo.Response> {
    const res = await this.get<Problem.Info.GetProblemInfo.Response>(`info/${problemId}`)
    return res
  }

  // 提交代码
  async submitCode(problemId: number, code: string, lang: string, contestid: number): Promise<Problem.Submit.Response> {
    const res = await this.post<Problem.Submit.Response, Problem.Submit.Request>(`submit/${problemId}`, {
      code,
      lang,
      contestid,
    })
    return res
  }
}
