import { AuditableEntity } from '../AuditableEntity'
import { ProblemAuthRepo } from '@/infra/problem/porblemAuthRepo'

const problemAuthRepo = new ProblemAuthRepo()

export class ProblemAuth extends AuditableEntity {
  private readonly problemId: number
  private readonly code: string
  private readonly lang: string
  private readonly contestId: number

  constructor(problemId: number, code: string, lang: string = 'cpp', contestId: number = 0) {
    super()
    this.problemId = problemId
    this.code = code
    this.lang = lang
    this.contestId = contestId
  }

  // 获取题目信息
  static async getProblemInfo(problemId: number) {
    const res = await problemAuthRepo.getProblemInfo(problemId)
    return res.data
  }

  // 提交代码
  async submitCode() {
    const res = await problemAuthRepo.submitCode(this.problemId, this.code, this.lang, this.contestId)
    return res
    // this.judgeStatus = this.getJudgeStatus(status)
  }

  // 获取评测状态
  // getJudgeStatus(status: string): JudgeStatus {
  //   return JudgeStatus[status as keyof typeof JudgeStatus]
  // }
}
