import { AuditableEntity } from '../AuditableEntity'
import { ProblemInfoRepo } from '@/infra/problem/porblemInfoRepo'

const problemInfoRepo = new ProblemInfoRepo()

export class ProblemInfo extends AuditableEntity {
  constructor() {
    super()
  }

  // 获取题目列表
  async getProblemList(page: number = 1, pageSize: number = 10, level: string | undefined = '', keyword: string = '', problemId: number = 0) {
    const conditions = {
      problemId,
      level,
      keyword,
    }
    const res = await problemInfoRepo.getProblemList(page, pageSize, conditions)
    return res.data
  }

  // 获取题解状态列表
  async getSubmitStatus(page: number = 1, pageSize: number = 10, level: string | undefined = '', keyword: string = '', problemId: number = 0) {
    const conditions = {
      problemId,
      level,
      keyword,
    }
    const res = await problemInfoRepo.getSubmitStatus(page, pageSize, conditions)
    return res.data
  }
}
